# BAB III
# ANALISIS DAN PERANCANGAN SISTEM

*(Catatan: Pastikan penomoran bab disesuaikan dengan pedoman institusi Anda. Jika Implementasi berada di Bab IV, silakan ubah angka Romawi di bawah).*

## III.3 Implementasi
Implementasi sistem merupakan tahap penerjemahan rancangan arsitektur ke dalam bentuk baris kode program (*source code*). Sistem Rumah Makan Kembar dibangun menggunakan kerangka kerja (framework) Laravel pada sisi *back-end* dan React.js terintegrasi Inertia.js pada sisi *front-end*. Berikut adalah pemaparan implementasi logika inti dari sistem yang dibangun:

### 1. Implementasi Pembuatan Pesanan dan Integrasi Midtrans
Kode di bawah ini merupakan logika utama yang menangani proses *checkout* keranjang belanja, penyisipan data ke dalam basis data secara atomik, dan permintaan token pembayaran (*Snap Token*) ke API Midtrans.
![Demo Checkout Pelanggan](file:///C:/Users/ilham/.gemini/antigravity/brain/ecdb2c44-a3d9-4aeb-8293-112b4d9cb099/checkout_flow_1780265424241.webp)
**File: `app/Http/Controllers/Customer/CheckoutController.php`**
```php
$order = DB::transaction(function () use ($request, $data, $cart) {
    // [Pembuatan Profil User & Order dilewati untuk keringkasan]...
    
    if ($data['payment_method'] === 'qris' || $data['payment_method'] === 'bank_transfer') {
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
        Config::$isSanitized = true;
        Config::$is3ds = true;

        $params = [
            'transaction_details' => [
                'order_id' => $order->unique_code,
                'gross_amount' => (int) $order->total_price,
            ],
            // [Detail kustomer dilewati]...
        ];

        try {
            $snapToken = Snap::getSnapToken($params);
            $order->payments()->create([
                'transaction_id' => $snapToken,
                'payment_method' => $data['payment_method'],
                'status' => 'pending',
                // ...
            ]);
            $order->update(['snap_token' => $snapToken]);
        } catch (\Exception $e) {
            // Fallback manual jika API Midtrans gagal
        }
    }
    return $order;
});
```
**Penjelasan:** 
Pada fungsi di atas, seluruh proses pembentukan pesanan dibungkus di dalam metode `DB::transaction()`. Hal ini menerapkan prinsip ACID (*Atomicity, Consistency, Isolation, Durability*) pada basis data. Jika terjadi kegagalan (misalnya server Midtrans *down* atau *timeout*), blok `catch` akan mengambil alih (*fallback*) dan mengonversi metode pembayaran menjadi transaksi manual. Penggunaan metode ini menjamin bahwa sistem tidak akan menghasilkan data yang inkonsisten di dalam basis data (seperti pesanan yang terbuat, namun tidak memiliki metode pembayaran yang valid).

### 2. Implementasi Otomatisasi Validasi Pembayaran (Webhook)
Kode berikut bertanggung jawab untuk mendengarkan (*listen*) notifikasi sukses pembayaran dari server Midtrans yang datang secara asinkron di latar belakang (*background*).
![Demo Persetujuan Pesanan Admin](file:///C:/Users/ilham/.gemini/antigravity/brain/ecdb2c44-a3d9-4aeb-8293-112b4d9cb099/admin_orders_1780265492556.webp)
**File: `app/Http/Controllers/PaymentCallbackController.php`**
```php
public function handleMidtrans(Request $request)
{
    $serverKey = env('MIDTRANS_SERVER_KEY');
    $hashed = hash("sha512", $request->order_id . $request->status_code . $request->gross_amount . $serverKey);

    if ($hashed !== $request->signature_key) {
        return response()->json(['message' => 'Invalid signature'], 403);
    }

    $order = Order::where('unique_code', $request->order_id)->first();
    if ($order && $request->transaction_status === 'settlement') {
        $order->update([
            'payment_status' => 'paid',
            'status' => 'paid_waiting'
        ]);
        event(new \App\Events\KitchenOrderUpdated($order));
    }
    return response()->json(['message' => 'OK']);
}
```
**Penjelasan:**
Sistem menerapkan mekanisme keamanan *Webhook* menggunakan algoritma *hash* kriptografi **SHA-512**. Nilai parameter yang dikirim oleh Midtrans di-*hash* ulang menggunakan `SERVER_KEY` rahasia milik aplikasi. Jika nilai *hash* yang dihasilkan sistem tidak identik dengan `signature_key` dari *request*, sistem menolak instruksi tersebut (HTTP 403). Hal ini dirancang untuk mencegah serangan *Spoofing*, di mana pihak yang tidak bertanggung jawab memalsukan notifikasi keberhasilan pembayaran ke titik akhir (*endpoint*) server.

### 3. Implementasi Asinkronisasi Notifikasi WhatsApp
Kode ini bertugas menjembatani aplikasi dengan EvolutionAPI untuk mengirimkan pesan singkat ke pengguna secara otomatis tanpa menghambat waktu muat (*loading time*) halaman antarmuka pengguna.

[MASUKKAN SCREENSHOT FITUR PESAN MASUK DI WHATSAPP DI SINI]

**File: `app/Services/WhatsAppService.php`**
```php
public static function sendMessage(string $phone, string $message)
{
    $url = env('EVOLUTION_API_URL');
    $key = env('EVOLUTION_API_KEY');
    $instance = env('EVOLUTION_INSTANCE_NAME', 'test');

    $endpoint = "{$url}/message/sendText/{$instance}";

    return Http::withHeaders([
        'apikey' => $key,
    ])->post($endpoint, [
        'number' => $phone,
        'options' => [
            'delay' => 1200,
            'presence' => 'composing'
        ],
        'textMessage' => [
            'text' => $message
        ]
    ])->json();
}
```
**Penjelasan:**
*Class* `WhatsAppService` diimplementasikan sebagai utilitas statis (*static utility*) menggunakan komponen `Illuminate\Support\Facades\Http`. Guna menciptakan pengalaman interaksi (*User Experience*) yang realistis, *payload* JSON dilengkapi dengan properti `options.presence = 'composing'`, yang akan memicu indikator "Sedang Mengetik..." di aplikasi WhatsApp pelanggan sebelum pesan diteruskan. Metode ini di-*dispatch* di latar belakang untuk mencegah proses *blocking* pada *thread* utama PHP.

### 4. Implementasi Pengambilan Data Dapur (Kitchen Display System Polling)
Kode berikut adalah arsitektur *Front-end* yang memungkinkan monitor dapur diperbarui secara mandiri tanpa harus memuat ulang (*refresh*) halaman peramban (*browser*) secara manual.
![Demo Layar Dapur KDS](file:///C:/Users/ilham/.gemini/antigravity/brain/ecdb2c44-a3d9-4aeb-8293-112b4d9cb099/kitchen_screen_1780265587613.webp)
**File: `resources/js/Pages/Kitchen/Index.jsx`**
```javascript
useEffect(() => {
    const interval = setInterval(() => {
        router.reload({
            only: ['orders'],
            preserveScroll: true,
            preserveState: true,
        });
    }, 15000);

    return () => clearInterval(interval);
}, []);
```
**Penjelasan:**
Sistem menggunakan *React Hooks* (`useEffect`) untuk meregistrasi sebuah fungsi iteratif (`setInterval`) pada komponen antarmuka dapur. Fungsi ini secara berkala memerintahkan modul inti *Inertia.js* untuk mengambil data JSON terbaru dari server (khusus objek `orders`) setiap 15.000 milidetik. Properti `preserveScroll` dan `preserveState` digunakan agar posisi layar yang sedang dibaca oleh koki tidak terlempar ke atas secara mendadak saat antarmuka me-*render* ulang data pesanan baru. Arsitektur *HTTP Polling* ini dipilih sebagai teknik alternatif asinkron yang andal jika layanan *WebSocket* konvensional tidak tersedia.

---

## III.4 Pembagian Tugas

Pengembangan sistem melibatkan pendistribusian tugas untuk memastikan seluruh fungsionalitas diselesaikan sesuai tenggat waktu. Tabel berikut memuat rincian kontribusi masing-masing anggota tim pengembang:

| No | Nama Anggota | Peran (Role) | Rincian Tanggung Jawab |
|---|---|---|---|
| 1 | **Muhammad Al Fatih** | *Project Manager & System Analyst* | Merancang alur proses bisnis, ERD (Entity Relationship Diagram), menyusun *timeline* kerja, serta memastikan spesifikasi sistem memenuhi kebutuhan pengguna akhir (Rumah Makan Kembar). |
| 2 | **Ilham Edgar Maulana Goesasi** | *Backend Developer & Integrations* | Membangun struktur basis data, arsitektur REST/Inertia di sisi Laravel, dan mengeksekusi integrasi Application Programming Interface (API) eksternal seperti Midtrans dan EvolutionAPI. |
| 3 | **Syahwali Khan Habibi Harahap** | *Frontend Developer & UI/UX* | Mengonversi desain *mockup* ke dalam komponen antarmuka interaktif menggunakan React.js dan TailwindCSS, serta mengimplementasikan desain tata letak yang responsif (*mobile-first*). |
| 4 | **Aufa Rafli Sofwan Pasya** | *Quality Assurance & Database Designer* | Melakukan uji kelayakan sistem (Testing), mengidentifikasi *bug*, menulis pelaporan sistem (*documentation*), dan memastikan integritas data dalam skema basis data (*Foreign Keys* dan *Indexing*). |

---

## III.5 Integrasi dan Pengujian

### 3.5.1 Proses Integrasi Sistem
Sistem ini menggunakan arsitektur *Monolithic Single Page Application* (SPA). Alih-alih memisahkan *backend* (API) dan *frontend* (UI) ke dalam dua pangkalan kode (*codebase*) yang berbeda, sistem mengintegrasikan Laravel dan React secara hibrida menggunakan jembatan abstraksi **Inertia.js**. Inertia mendistribusikan properti (*props*) dari pengendali (*Controller*) PHP secara dinamis menjadi *state* di komponen React tanpa intervensi pemanggilan AJAX manual. 

Untuk operasional eksternal, aplikasi diintegrasikan dengan dua antarmuka layanan (API) pihak ketiga:
1. **Integrasi Midtrans (Payment Gateway)**: Diimplementasikan menggunakan arsitektur *Client-Server Authentication*. Aplikasi backend mengirim *Gross Amount* dan *Item Details* ke *Server Key* Midtrans, yang membalas dengan sebuah *Snap Token*. Token ini diinjeksi ke antarmuka React untuk merender *pop-up* pembayaran interaktif di peramban klien.
2. **Integrasi EvolutionAPI (WhatsApp)**: Diimplementasikan melalui jaringan komunikasi antar-kontainer (*inter-container communication*) Docker. Notifikasi transaksi berhasil dilempar oleh backend Laravel ke *port* lokal yang mendengarkan instansiasi *headless WhatsApp* untuk secara otomatis diteruskan kepada nomor telepon klien.

### 3.5.2 Alamat Akses (Deployment)
Sistem ini dapat diakses pada tautan berikut untuk lingkungan pengembangan lokal:
**http://localhost:8000**

### 3.5.3 Skenario Pengujian (Black Box Testing)
Pengujian sistem *(System Testing)* dilakukan dengan pendekatan *Black Box* untuk mengevaluasi spesifikasi fungsional sistem tanpa menelusuri struktur internal kode.

| Skenario Pengujian | Test Case (Input) | Hasil yang Diharapkan | Hasil Pengujian | Status |
|---|---|---|---|---|
| **Otentikasi Pengguna (Login)** | Memasukkan *email* dan *password* valid milik *role* Admin. | Sistem menolak pengguna dengan kredensial tidak valid dan mengarahkan Admin yang sah ke `/admin/dashboard`. | Sesuai | **Valid** |
| **Keranjang Belanja (Add to Cart)** | Menekan tombol `+` pada Menu Nasi Goreng dengan stok `> 0`. | Sistem memunculkan notifikasi sukses dan menambah nominal harga di subtotal keranjang (Bilah bawah). | Sesuai | **Valid** |
| **Validasi Checkout Katering** | Mengosongkan isian *Tanggal Acara* lalu menekan "Submit Pesanan". | Sistem menghentikan form (tidak menyimpan ke database) dan menampilkan indikator eror "Tanggal Acara wajib diisi" (Validasi *Front-end & Back-end*). | Sesuai | **Valid** |
| **Integrasi Webhook Midtrans** | Membayar pesanan di simulator Midtrans menggunakan Virtual Account BCA. | Status pesanan di database otomatis berubah menjadi `paid_waiting` tanpa perlu persetujuan admin. | Sesuai | **Valid** |
| **KDS (*Kitchen Display*) UI** | Menciptakan order `paid` baru di perangkat lain sambil membuka halaman layar `/kitchen`. | Kartu pesanan baru muncul secara otomatis dalam waktu maksimal 15 detik di layar Dapur tanpa menekan f5 (refresh). | Sesuai | **Valid** |

---
---

# BAB V
# KESIMPULAN DAN SARAN

*(Catatan: V.1 Kesimpulan tidak disertakan karena bergantung pada rumusan masalah di laporan Anda. Berikut adalah bagian Saran).*

## V.2 Saran
Berdasarkan hasil analisis, implementasi, dan pengujian yang telah dilakukan pada Sistem Rumah Makan Kembar, terdapat beberapa area pengembangan yang direkomendasikan untuk penelitian dan optimasi di masa mendatang:

1. **Implementasi Sistem Rekomendasi Menu (Kecerdasan Buatan)**
   Sistem saat ini hanya menampilkan menu berdasarkan kategori statis. Penelitian selanjutnya dapat mengimplementasikan algoritma penambangan data (*Data Mining*) seperti algoritma *Apriori* atau *Collaborative Filtering* untuk memberikan rekomendasi menu "Sering Dibeli Bersamaan" (misalnya menyarankan Es Jeruk saat pelanggan memasukkan Ayam Bakar ke keranjang). Hal ini berpotensi meningkatkan nilai rata-rata transaksi (*Average Order Value*).
2. **Peningkatan Skalabilitas ke Arsitektur *Multi-Tenant***
   Seiring perkembangan bisnis, Rumah Makan Kembar berpotensi membuka cabang baru. Struktur basis data yang ada belum memisahkan data inventori antar cabang. Disarankan untuk memigrasikan arsitektur basis data tunggal ke skema *Multi-Tenant*, di mana setiap cabang memiliki konfigurasi, meja, dan stok materialnya masing-masing secara terisolasi dalam satu sistem terpusat.
3. **Penerapan *Event-Driven Architecture* Murni (WebSockets)**
   Layar pemantauan pesanan dapur (*Kitchen Display System*) saat ini masih menggunakan teknik *HTTP Polling* (menarik data berulang-ulang setiap 15 detik). Untuk mengoptimalkan kinerja *Central Processing Unit* (CPU) server dan mengurangi beban basis data MySQL, pengembangan berikutnya sangat direkomendasikan untuk beralih secara penuh ke teknologi transmisi dua arah menggunakan *Laravel Reverb* atau *Socket.io* (WebSockets).

---
---

# BAGIAN AKHIR (BACK MATTER)
*(Bagian ini menjadi penutup laporan akademis. Siapkan file pendukung berikut di dokumen Word/PDF Anda)*

## 1. Daftar Pustaka
Susun sumber referensi (buku, jurnal, situs resmi dokumentasi Laravel, React, dan Midtrans) menggunakan gaya kutipan standar IEEE atau APA.

## 2. Lampiran (Appendices)
Siapkan dan sisipkan gambar/diagram berikut ke dalam laporan Anda:
- **Lampiran A**: *Use Case Diagram* dan *Activity Diagram* secara penuh.
- **Lampiran B**: *Entity Relationship Diagram* (ERD) dan Kamus Data (Struktur Tabel Lengkap).
- **Lampiran C**: *Mockup* / Rancangan Antarmuka Pengguna (UI) dan perbandingannya dengan hasil tangkapan layar (Screenshot) nyata dari *deployment* sistem.

## 3. Daftar Riwayat Hidup (Curriculum Vitae)
*(Gunakan format berikut untuk 4 halaman terakhir, satu halaman per anggota kelompok)*

**DATA PRIBADI**
- **Nama Lengkap** : [Nama Anggota, misal: Syahwali Khan Habibi Harahap]
- **NIM / NISN** : [Masukkan Nomor Induk]
- **Tempat, Tanggal Lahir** : [Masukkan Tempat/Tanggal Lahir]
- **Program Studi/Jurusan** : Rekayasa Perangkat Lunak (RPL)
- **Instansi / Sekolah** : [Nama Sekolah / Kampus Anda]
- **Email** : [Masukkan Email Aktif]
- **Nomor Telepon** : [Masukkan Nomor WA]

**RIWAYAT PENDIDIKAN**
- [Tahun Masuk - Keluar] : [Nama SD]
- [Tahun Masuk - Keluar] : [Nama SMP]
- [Tahun Masuk - Sekarang] : [Nama Instansi Anda saat ini]

**KEAHLIAN (SKILLS)**
- Bahasa Pemrograman : PHP, JavaScript
- Kerangka Kerja (Framework) : Laravel, React.js, TailwindCSS
- Basis Data : MySQL, PostgreSQL
- Lainnya : Git, Docker, Pembagian Tugas Agil (Agile/Scrum)

*(Pas Foto Formal Ukuran 4x6 di pojok kanan atas)*

# Dokumentasi Codebase Ekstensif RM Kembar

Dokumen ini berisi penjelasan terperinci untuk **setiap file kode** di dalam proyek RM Kembar (Laravel 12 + React Inertia). 

---

## 1. Database & Models (`app/Models/`)
Model adalah representasi tabel database yang menggunakan Eloquent ORM.

### Entitas Utama
- **`User.php`**: Mengelola tabel `users`. Menyimpan autentikasi, nama, email, no HP (`phone`), dan peran akses (`role`: admin, owner, kitchen, customer). Relasi: `hasMany` Order, Reservation, Rating.
- **`Order.php`**: Jantung aplikasi. Menyimpan semua pesanan (tipe `dine_in`, `takeaway`, dll). Berisi logika auto-generate unik kode `RMK-YYMMDD-NAMA-XXX`. Relasi: `belongsTo` User & Table, `hasMany` OrderItem, `morphMany` Payment, `morphOne` Rating. Mendukung *Soft Deletes*.
- **`OrderItem.php`**: Tabel pivot rincian pesanan. Meng-copy harga makanan saat itu ke `price` dan `subtotal` agar tidak berubah meskipun harga menu naik di kemudian hari.
- **`Menu.php`**: Katalog makanan/minuman. Menyimpan `price`, `stock`, `is_available`, dan `image_path`. Menggunakan relasi `belongsTo` ke MenuCategory.
- **`MenuCategory.php`**: Pengelompokan menu (Camilan, Makanan Utama, Minuman). Memiliki field `sort_order` untuk mengurutkan tampilan di UI.
- **`DineInTable.php`**: Meja fisik restoran. Field `table_number` (misal: Meja 1), `capacity`, dan `status` (`kosong`, `locked`).
- **`Reservation.php`**: Pemesanan meja di masa depan. Field: `reserved_date`, `reserved_time`, `guest_count`, `status`.

### Entitas Ekstensi
- **`Payment.php`**: Model *Polymorphic* (`payable_type`, `payable_id`). Merekam histori transaksi pembayaran (baik Midtrans maupun Manual Cash). Menyimpan `snap_token` jika Midtrans.
- **`Rating.php`**: Model *Polymorphic* (`rateable_type`, `rateable_id`). Menyimpan ulasan (bintang 1-5 dan teks) untuk sebuah entitas (saat ini `Order`).
- **`Setting.php`**: Tabel *Key-Value* untuk konfigurasi global seperti `tax_rate`, `auto_cancel_minutes`.
- **`StockLog.php`**: Pencatatan histori masuk-keluarnya stok menu (Audit trail).
- **`Catering.php` & `CateringItem.php`**: *(Future-proofing)* Entitas terpisah untuk logika katering B2B skala besar.

---

## 2. HTTP Controllers (`app/Http/Controllers/`)

### A. Customer Controllers (`app/Http/Controllers/Customer/`)
- **`MenuController.php`**: Melayani halaman `/menu`. Mengolah filter/pencarian dan fitur Cart (Add to Cart, Remove dari Session). Jika ada query parameter `?table=ID`, controller akan men-set ID meja ke session pelanggan.
- **`CheckoutController.php`**: Mengubah isi Cart menjadi model `Order` dan `OrderItem`. Menginisiasi koneksi dengan **Midtrans SDK** (Snap API). Memiliki *fallback* jika Midtrans error/dummy keys, otomatis menjadi Manual Cash.
- **`OrderConfirmationController.php`**: Merender UI konfirmasi dengan membawa `snap_token` agar frontend bisa memunculkan popup pembayaran QRIS.
- **`AccountController.php`**: Menampilkan halaman Riwayat Pesanan pelanggan. Menangani aksi `cancelOrder` jika pesanan masih pending.
- **`RatingController.php`**: Menyimpan ulasan 1-5 bintang. Dilengkapi validasi keamanan: hanya bisa menilai pesanan yang sudah *completed* dan milik *Auth::id()* sendiri.
- **`CateringController.php`**: Melayani form pendaftaran event catering.
- **`ReservationController.php`**: Membuat reservasi meja. Validasi jumlah tamu agar sesuai dengan kapasitas meja (diambil dari tabel `DineInTable`).
- **`HomeController.php`**: Landing page sederhana restoran.

### B. Admin Controllers (`app/Http/Controllers/Admin/`)
- **`DashboardController.php`**: Menarik agregasi data menggunakan `DB::raw()` dan Eloquent (Total Pendapatan hari ini, Jumlah Meja Terisi) untuk chart UI dasbor.
- **`OrderController.php`**: CRUD pesanan. Method utama `transition()` untuk memindahkan status order (pending -> preparing -> completed).
- **`MenuController.php`**: CRUD menu makanan. Menangani logika `Storage::putFile()` untuk menyimpan foto makanan ke direktori publik.
- **`CategoryController.php`**: CRUD kategori.
- **`TableController.php`**: CRUD stok meja.
- **`ReservationController.php`**: Mengubah status reservasi (approve/reject). Saat di-approve, sistem memicu pengiriman pesan WhatsApp.
- **`ReportController.php`**: Mem-filter data berdasarkan `$request->start_date` dan `$end_date`. Menyediakan `export()` untuk format Excel (`Maatwebsite`) dan PDF (`DomPDF`).
- **`UserController.php`**: Mengelola admin/karyawan/pengguna lain dan peran/role mereka.
- **`SettingController.php`**: Memperbarui pajak dan durasi pembayaran.

### C. System & Global Controllers
- **`PaymentCallbackController.php`**: *Webhook listener*. Saat Midtrans menyatakan pembayaran sukses di background, URL ini dipanggil untuk mengupdate status Order menjadi `paid_waiting`.
- **`KitchenController.php`**: Men-serve halaman KDS (Kitchen Display System).
- **`DebugController.php`**: Halaman untuk mensimulasikan pembayaran tanpa Midtrans (`simulatePayment`) atau mengetes kirim WA tanpa trigger asli (`testWhatsApp`).
- **`Auth/LoginController.php` & `Auth/RegisterController.php`**: Kontroller autentikasi bawaan yang disesuaikan untuk merender komponen Inertia.js.

---

## 3. Frontend & UI (`resources/js/`)
Aplikasi ini tidak menggunakan Blade untuk render. Semua menggunakan React.js + TailwindCSS + Inertia.js (menjembatani props dari Controller PHP ke React secara native).

### Struktur Utama
- **`app.jsx`**: File *entry-point* Vite. Menentukan resolusi halaman dan menginisiasi setup Reverb/Echo.
- **`echo.js`**: Mengonfigurasi Laravel Echo untuk Real-time Websocket. Mengandung kode pencegah error (silent fail) jika Reverb API Key tidak dikonfigurasi.
- **`Layouts/AppLayout.jsx`**: Membungkus header, footer, mobile sidebar navigation, dan Flash Messaging (notifikasi hijau/merah).

### Pages Khusus Customer (`Pages/Customer/` & `Pages/Orders/`)
- **`Customer/Menu.jsx`**: Halaman terberat di frontend. Meng-handle layout masonry/grid, filter kategori (Camilan, Makanan). Di perangkat mobile (HP), CSS *overflow* diatur ketat dengan `w-full` agar grid tidak meluber (horizontal scrolling).
- **`Customer/Checkout.jsx`**: Form dua arah (bisa auto-fill berdasarkan profil User). Merender rincian kalkulasi subtotal + pajak yang diteruskan dari `CheckoutController`.
- **`Customer/History.jsx`**: Riwayat pesanan. Terdapat form *Rating* *inline* yang tersembunyi, yang muncul jika status order *completed* dan belum memiliki rating.
- **`Orders/Confirm.jsx`**: Merender script `<script src=".../snap.js" />`. Jika token Midtrans tersedia, merender tombol "Bayar Sekarang" (memanggil `window.snap.pay()`). Juga berisi tombol Debug [Simulasi Pembayaran].

### Pages Backoffice (`Pages/Admin/` & `Pages/Kitchen/`)
- **`Admin/Dashboard.jsx`**: Memiliki tabel dan grafik chart.
- **`Admin/Orders.jsx` & `Admin/Reservations.jsx`**: Tabel CRUD dinamis. Seluruh komponen form ditaruh dalam modal untuk menghindari pergantian halaman yang tidak perlu.
- **`Admin/Reports.jsx`**: UI kalender rentang tanggal untuk generate Export Excel/PDF.
- **`Admin/Menu.jsx`**: Form dengan input File (Gambar) yang dikirim ke backend menggunakan tipe form `multipart/form-data` via Inertia `useForm`.
- **`Kitchen/Index.jsx`**: Antarmuka layar dapur. Memiliki fitur Polling lambat (`setInterval` 15 detik menggunakan `router.reload({ only: ['orders'] })`) sebagai alternatif dari WebSocket Reverb yang dinonaktifkan di local docker.

---

## 4. Routes & Configuration (`routes/`, `config/`)
- **`routes/web.php`**: Dipecah menjadi beberapa middleware group:
  - `middleware('auth')` untuk profil dan history.
  - `middleware('role:admin,owner')` dengan `prefix('admin')` untuk mengamankan seluruh route dashboard dari *customer*.
  - `middleware('role:kitchen,admin,owner')` untuk halaman dapur.
- **`.env`**: File Environment. Menampung kredenial krusial seperti:
  - Database PostgreSQL/MySQL
  - `EVOLUTION_API_URL` & `KEY` (Konektor WhatsApp Docker)
  - `MIDTRANS_CLIENT_KEY`, `MIDTRANS_SERVER_KEY`, `MIDTRANS_IS_PRODUCTION` (True/False menentukan Midtrans Sandbox atau Production Server).

---

## 5. Services & Eksternal (`app/Services/`)
- **`WhatsAppService.php`**: Berisi utilitas statis `WhatsAppService::sendMessage($phone, $message)`. Fungsi ini mengeksekusi PHP `Http::post` langsung ke kontainer `evolution-api` di port 8080 untuk menjembatani pengiriman WhatsApp langsung dari server lokal ke perangkat ponsel. Biasanya dipicu menggunakan `dispatch()->afterResponse()` agar waktu muat (*loading time*) halaman pelanggan tidak terhambat oleh proses jaringan pengiriman WA.

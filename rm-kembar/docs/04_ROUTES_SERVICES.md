# Bagian 4: Configuration, Routes, & Services

Infrastruktur pendukung dan perantara yang membuat sistem backend PHP, container database, webhook eksternal (Midtrans), dan pesan pihak ketiga (WhatsApp) dapat saling berinteraksi secara lancar.

---
## 1. Network & Routing (`routes/`)
File *routes* mendefinisikan seluruh jalan masuk URL (Endpoints) dan ke mana lalu lintas tersebut akan diarahkan (Controller mana yang akan menangani).

### `routes/web.php`
- **Tujuan**: *File Routing* sentral tempat 99% lalu lintas web terjadi.
- **Konsep Arsitektur**:
  1. **Public Routes**: URL yang dibiarkan terbuka, seperti `/`, `/menu`, dan `/about`.
  2. **Guest Routes Group**: Dibungkus dengan middleware `guest`. URL `/login` dan `/register`. (Mencegah user yang sudah login untuk mengakses halaman login kembali).
  3. **Auth Routes Group**: Dibungkus dengan middleware `auth`. Meliputi `/akun/riwayat`. User wajib login, tetapi tak peduli role-nya apa (customer atau admin).
  4. **Admin Routes Group**: Memiliki perlindungan tertinggi: `middleware(['auth', 'role:admin,owner'])` dan *prefix* otomatis `/admin/`. Segala sesuatu yang berbau operasi harian restoran `/admin/pesanan`, `/admin/laporan`, dan `/admin/kategori` ada di sini.
  5. **Kitchen Routes Group**: Memiliki pelindung `middleware(['auth', 'role:kitchen,admin,owner'])`. Artinya, pelayan dan pemilik bisa masuk ke layar dapur, tapi *customer* biasa tidak bisa.
  6. **Webhook Bypasses**: Rute rahasia seperti `POST /payment/midtrans-callback` dikecualikan dari proteksi token CSRF di sisi Laravel agar Midtrans bisa melakukan PING ke server kita kapan saja secara diam-diam.

### `routes/api.php` & `routes/console.php`
- **Tujuan**: Cadangan infrastruktur. 
- Saat ini `api.php` kosong karena proyek menggunakan arsitektur *Monolithic SPA* via Inertia (tidak memisahkan backend REST API dan Frontend secara utuh). `console.php` menangani registrasi perintah (commands) terminal *Artisan*, misal untuk task penjadwalan (*Scheduler*).

---
## 2. Pihak Ketiga & Integrasi (`app/Services/`)

### `app/Services/WhatsAppService.php`
- **Tujuan**: Komunikator *Chatbot* resmi.
- **Cara Kerja**: 
  1. Menangkap ID, Nomor HP, dan Isi Pesan Teks.
  2. Mengekstrak variabel *URL* dan *API Key* dari file `.env`.
  3. Membangun dan meluncurkan *cURL/HTTP POST Request* menuju sebuah wadah (container) Docker eksternal yang bernama **Evolution API** (`http://evolution-api:8080`).
  4. Evolution API (yang sudah disinkronisasikan ke nomor WhatsApp via scan QR Code dari HP restoran) akan mengambil request HTTP JSON tersebut dan mengubahnya menjadi *chat WhatsApp asli* yang meluncur ke ponsel pengguna.
- **Keamanan**: Dilengkapi dengan `try-catch` (exception handling). Jadi jika server WhatsApp restoran sedang mati/terputus dari internet, aplikasi RM Kembar tidak akan error dan tetap bisa memproses pesanan (pesan WA sekadar gagal terkirim secara diam-diam).

---
## 3. The Enabler (File Inti Aplikasi)

### `.env` (Environment Config)
- **Tujuan**: Jantung rahasia aplikasi.
- **Kunci Rahasia Utama**:
  - `DB_HOST`, `DB_PASSWORD`: Kredensial untuk mengakses data Postgres/MySQL di dalam container Docker.
  - `EVOLUTION_API_URL` & `KEY`: Token untuk Evolution API WhatsApp.
  - `MIDTRANS_SERVER_KEY`: Sangat krusial. Sistem pembayaran RM Kembar 100% bergantung pada nilai (value) baris ini. Baris `MIDTRANS_IS_PRODUCTION` menentukan apakah kunci tersebut akan memanggil sistem uang nyata atau sistem simulasi mainan (Sandbox).

### `resources/views/app.blade.php`
- **Tujuan**: Cangkang telur (*The Eggshell*).
- **Penjelasan**: Proyek ini dibangun di atas React, tetapi browser hanya mengerti HTML. File ini adalah satu-satunya file HTML (Blade) di seluruh proyek.
- **Fungsi Khusus**: Ia merender tag `<div id="app"></div>` kosong. Kemudian ia memerintahkan Laravel Vite: *"Tolong injeksikan aplikasi React yang sangat besar itu ke dalam div kosong ini!"*. File ini juga menginjeksi meta-tag standar, Tailwind (CSS), dan memuat *Inertia Head directives*.

---

## 4. Docker Architecture (`Dockerfile` & `docker-compose.yml`)
- Proyek RM Kembar beroperasi tidak di atas sistem operasi telanjang, melainkan dikurung di dalam serangkaian kontainer mesin virtual kecil bernama Docker.
- **`rmkembar-app`**: Server utama PHP/Laravel. (Port 9000).
- **`rmkembar-webserver`**: Mesin NGINX yang membukakan port `8000` ke dunia luar/browser Anda. Tanpa ini, aplikasi tidak bisa diakses dari Chrome.
- **`rmkembar-mysql`**: Server database MySQL versi 8.
- **`rmkembar-evolution`**: Server robot WhatsApp yang beroperasi dengan database (Postgres) dan sistem *cache* (Redis) miliknya sendiri. Keduanya terisolasi penuh dari Laravel.

*Selesai. Demikian rincian arsitektural komprehensif seluruh file di ekosistem Rumah Makan Kembar.*

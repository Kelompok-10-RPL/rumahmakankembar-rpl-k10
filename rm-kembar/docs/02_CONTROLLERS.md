# Bagian 2: HTTP Controllers (`app/Http/Controllers/`)

Controller bertugas menerima *request* HTTP, melakukan validasi logika bisnis, berinteraksi dengan database via Model, dan merender tampilan ke Frontend (menggunakan `Inertia::render`).

---
## A. Admin Controllers (`Admin/`)
Grup ini diamankan oleh middleware `role:admin,owner` sehingga tidak bisa diakses sembarang orang.

1.  **`CategoryController.php`**
    *   **Tujuan**: Mengelola CRUD kategori menu.
    *   **Catatan**: Berisi validasi unik nama kategori agar tidak ada duplikasi.
2.  **`DashboardController.php`**
    *   **Tujuan**: Otak dari halaman beranda admin.
    *   **Catatan**: Melakukan serangkaian *raw SQL query* (menghitung total sales hari ini, bulan ini) untuk ditampilkan dalam format *Cards* atau grafik ringkasan.
3.  **`MenuController.php`**
    *   **Tujuan**: Mengelola produk makanan/minuman.
    *   **Catatan**: Sangat krusial karena memiliki logika `Storage::putFile` untuk menangani *upload file* (Gambar Makanan) dari komputer admin ke folder penyimpanan publik server.
4.  **`OrderController.php`**
    *   **Tujuan**: Antarmuka bagi kasir/admin untuk melihat seluruh pesanan.
    *   **Catatan**: Memiliki method khusus bernama `transition(Order, Action)` yang berfungsi secara sekuensial mengubah status pesanan pelanggan (contoh: dari `pending` diubah paksa ke `completed`).
5.  **`ReportController.php`**
    *   **Tujuan**: Otak dari sistem pembukuan.
    *   **Catatan**: Mem-filter `Order` berdasarkan dua tanggal (*start_date*, *end_date*). Menyediakan method `export()` yang akan mengunduh format `.xlsx` (menggunakan ekstensi `Maatwebsite`) atau `.pdf` (menggunakan ekstensi `DomPDF`).
6.  **`ReservationController.php`**
    *   **Tujuan**: Menangani persetujuan pesanan meja.
    *   **Catatan**: Jika reservasi disetujui, controller ini memicu pengiriman notifikasi WhatsApp ke nomor pemesan secara asinkron (background).
7.  **`SettingController.php`**
    *   **Tujuan**: Endpoint sederhana untuk mengupdate `tax_rate` dsb.
8.  **`TableController.php`**
    *   **Tujuan**: Membuat stok meja fisik.
    *   **Catatan**: Digunakan untuk *generate* label meja dan QR code yang akan dicetak/ditempel di meja sungguhan.
9.  **`UserController.php`**
    *   **Tujuan**: Manajemen kepegawaian (HR).
    *   **Catatan**: Memungkinkan Owner membuat akun untuk kasir/koki baru, mengatur peran (`role`), atau memberhentikan (menghapus akun) pegawai.

---
## B. Customer Controllers (`Customer/`)
Grup ini melayani interaksi dari sisi pelanggan.

10. **`AccountController.php`**
    *   **Tujuan**: Melayani halaman "Profil/Riwayat Pesanan Saya".
    *   **Catatan**: Memiliki logika pembatalan `cancelOrder()`. Jika dibatalkan, status meja akan dikembalikan dari *locked* menjadi *kosong*.
11. **`CateringController.php`**
    *   **Tujuan**: Menerima request pemesanan partai besar/event.
    *   **Catatan**: Memvalidasi tanggal acara harus di masa depan, menyimpan detail PIC (Person in Charge) dan daftar paket yang dipilih.
12. **`CheckoutController.php`**
    *   **Tujuan**: Mesin *checkout* utama (Paling Krusial).
    *   **Catatan**: Memindahkan data keranjang (*Session*) ke *Database*. 
    *   Jika pelanggan memilih QRIS/Transfer Bank, controller ini menembak API Midtrans via SDK (`Snap::getSnapToken`) untuk mendapatkan token. Apabila gagal (karena environment dummy), ia memiliki sistem *fallback* yang langsung mengubahnya menjadi tagihan manual/kasir, mencegah *Internal Server Error* di sisi pelanggan.
13. **`HomeController.php`**
    *   **Tujuan**: Sekadar merender halaman *Landing Page* statis.
14. **`MenuController.php`**
    *   **Tujuan**: Mengatur interaksi di halaman etalase makanan.
    *   **Catatan**: Mengolah *query string* (`?category=makanan` & `?table=ID`). Menampung logika `addToCart` dan `removeFromCart` (menyimpan array data produk ke dalam sesi memori server sementara).
15. **`OrderConfirmationController.php`**
    *   **Tujuan**: Mengambil data `Order` yang baru saja dibuat.
    *   **Catatan**: Menyediakan *Payload* (termasuk token Midtrans) untuk frontend agar *popup* QRIS bisa dimunculkan.
16. **`RatingController.php`**
    *   **Tujuan**: Menampung `POST /rating`.
    *   **Catatan**: Memiliki barikade ketat (`abort_if`) untuk memastikan pelanggan tidak bisa men-*spam* ulasan atau mengulas pesanan orang lain.
17. **`ReservationController.php`**
    *   **Tujuan**: Menerima input *booking* meja.
    *   **Catatan**: Mencocokkan jumlah orang (`guest_count`) dengan kapasitas meja jika ada.

---
## C. System / Global / Auth Controllers

18. **`KitchenController.php`**
    *   **Tujuan**: Jantung operasional dapur (KDS).
    *   **Catatan**: Hanya mengambil data dengan status `paid` atau `preparing`. Dilindungi untuk *Role*: Kitchen, Admin, dan Owner.
19. **`PaymentCallbackController.php`**
    *   **Tujuan**: *Webhook Endpoint* (tidak terlihat oleh user).
    *   **Catatan**: Saat pelanggan bayar di HP, Midtrans mengirim POST rahasia ke controller ini. Controller memvalidasi `Signature Key` HMAC SHA512, lalu otomatis mencentang pesanan menjadi "Lunas" di database.
20. **`DebugController.php`**
    *   **Tujuan**: Fitur khusus masa *Development*.
    *   **Catatan**: Memiliki fungsi `simulatePayment()` untuk mengubah status bayar secara manual tanpa perlu membuka dompet asli, sangat berguna ketika Midtrans API sedang tidak terhubung.
21. **`Auth/LoginController.php` & `Auth/RegisterController.php`**
    *   **Tujuan**: *Wrapper* standar Laravel Auth yang dimodifikasi menggunakan `Inertia::render` agar kompatibel dengan React SPA (Single Page Application), bukan merender Blade konvensional.

# Bagian 3: Frontend & Views (`resources/js/`)

Aplikasi RM Kembar tidak menggunakan file HTML statis (Blade), melainkan menggunakan teknologi **React.js** dengan **TailwindCSS**, dijembatani oleh **Inertia.js** (Modern Monolith).

---
## A. File Sistem & Layout
1. **`app.jsx`**
   - **Tujuan**: Akar (Root) dari React SPA.
   - **Penjelasan**: Menghidupkan (mount) React ke elemen ID `app` di DOM, mendaftarkan *Title* web, dan menginisiasi `echo.js` (Websocket). Memanggil fungsi `resolvePageComponent` Inertia untuk mengambil komponen `.jsx` yang tepat dari folder `Pages`.
2. **`echo.js`**
   - **Tujuan**: Konfigurasi WebSocket Klien.
   - **Penjelasan**: Mengatur integrasi Pusher/Reverb. Mengandung *safety guard* khusus: jika kunci `.env` dummy (`dummy-reverb-key`), script akan menghentikan inisialisasi agar console browser tidak dipenuhi pesan *connection refused*.
3. **`Layouts/AppLayout.jsx`**
   - **Tujuan**: Pembungkus global aplikasi.
   - **Penjelasan**: File paling besar dan paling krusial. Merender `Navbar`, `Sidebar Menu` (saat mobile), dan `Footer`. Menangkap data otentikasi (`auth.user`) dan notifikasi hijau/merah dari server (Flash Messaging). 
   - **Trik Mobile**: Komponen ini memiliki logika untuk memunculkan kotak "Keranjang Mengambang" (*Sticky Bottom Mobile Cart*) jika pengguna membuka via ponsel pintar dan memiliki item di keranjang.

---
## B. Customer Pages (`Pages/Customer/` dll.)
Halaman-halaman yang langsung dilihat oleh pelanggan.

4. **`Customer/Menu.jsx`**
   - **Tujuan**: Etalase produk utama.
   - **Penjelasan**: Memecah prop `menus` menjadi *grid cards*. 
   - Di file ini, kita mengimplementasikan constraint CSS ketat (`min-w-0`, `w-full` pada form item) untuk mencegah *bug horizontal scrolling* di mana tabel mendesak layar HP.
5. **`Customer/Checkout.jsx`**
   - **Tujuan**: Form Finalisasi Pesanan.
   - **Penjelasan**: Memanfaatkan fungsi `useForm` dari Inertia untuk mengelola state input pelanggan (Nama, Alamat). Menyediakan form opsi radio untuk memilih metode bayar (QRIS vs Kasir).
6. **`Customer/History.jsx`**
   - **Tujuan**: Log history pesanan tiap akun.
   - **Penjelasan**: Me-render kartu berisi nomor invoice, harga, dan tombol "Batalkan". 
   - *Logic Tambahan*: Memiliki logika kondisional untuk memunculkan tombol **"Beri Ulasan"** berwarna kuning jika status order = `completed` dan ulasan belum pernah diberikan.
7. **`Orders/Confirm.jsx`**
   - **Tujuan**: Halaman statis bukti pesanan.
   - **Penjelasan**: File ini sangat ajaib karena mengimpor antarmuka Midtrans. Jika parameter `order.snap_token` terdeteksi dan metode pembayaran bukan tunai, komponen ini merender tombol "Bayar Sekarang". Saat diklik, tombol tersebut memanggil SDK external `window.snap.pay()`. Terdapat juga tombol debug (Simulasi Bayar).
8. **`Catering/Catering.jsx`**
   - **Tujuan**: Wizard pemesanan partai besar.
   - **Penjelasan**: Merupakan *Form Multi-Step* kompleks yang mengurus event, tanggal, jam, dan jumlah Pax sekaligus.
9. **`Reservations/Create.jsx`**
   - **Tujuan**: Form interaktif pesanan meja (Dine-in).
10. **`Home.jsx` & `Info/AboutUs.jsx`**
    - **Tujuan**: *Landing page* dan halaman informasi (profil, Google Maps Iframe). Konten murni statis.
11. **`Auth/Login.jsx` & `Auth/Register.jsx`**
    - **Tujuan**: Pintu masuk sistem. Form ini dijaga dengan perlindungan `X-CSRF-TOKEN` bawaan Inertia.

---
## C. Admin Pages (`Pages/Admin/`)
Antarmuka manajemen data untuk sang Pemilik (Owner) dan Kasir (Admin).

12. **`Admin/Dashboard.jsx`**
    - **Tujuan**: Analitik Harian.
    - **Penjelasan**: Menangkap prop variabel agregat. Komponen tabel dibungkus dalam CSS `overflow-x-auto` agar, meskipun tabel memanjang, ia bisa di-geser (scroll) ke samping saat diakses lewat layar HP owner tanpa merusak *layout* utama.
13. **`Admin/Menu.jsx` & `Admin/Categories.jsx`**
    - **Tujuan**: Mengelola Katalog.
    - **Penjelasan**: Karena mengirim *File* (Gambar Makanan), React menggunakan header `multipart/form-data`. Termasuk logika *preview* gambar lokal sebelum form di-submit menggunakan `URL.createObjectURL(file)`.
14. **`Admin/Orders.jsx` & `Admin/Reservations.jsx`**
    - **Tujuan**: Meja kerja interaktif.
    - **Penjelasan**: Merender tabel yang *Action Button*-nya dinamis bergantung pada status pesanan. Jika order `pending`, tombol berubah menjadi "Setujui/Mulai Masak". Jika `preparing`, tombol berubah menjadi "Selesai". Hal ini dikontrol murni melalui kondisi `if/else` (Ternary Operator) di React.
15. **`Admin/Reports.jsx`**
    - **Tujuan**: Halaman Rekapitulasi Keuangan.
    - **Penjelasan**: Menyediakan *Date Picker* (Pemilihan Tanggal Awal & Akhir) dan me-refresh parameter URL. Menyediakan tombol `href` biasa (tanpa Inertia link) untuk men-trigger download/ekspor PDF/Excel agar browser bisa menangani file stream dengan benar.
16. **`Admin/Tables.jsx`** & **`Admin/Users.jsx`** & **`Admin/Settings.jsx`**
    - **Tujuan**: CRUD standar untuk mengelola stok meja, staf akun, dan variabel (PPN).

---
## D. KDS (Kitchen Display System)
17. **`Kitchen/Index.jsx`**
    - **Tujuan**: Layar TV Koki.
    - **Penjelasan**: Ini bukan halaman statis. Untuk meniru fitur *Real-time WebSockets* yang sedang mati (karena keterbatasan versi PHP di docker lokal), halaman ini di-coding agar me-*refresh* dirinya sendiri secara asinkron di belakang layar (memanggil `router.reload`) setiap **15.000 milidetik (15 detik)**.
    - Dengan teknik ini, Koki bisa membiarkan tablet dapur menyala semalaman, dan setiap ada pesanan yang masuk, pesanan itu akan otomatis muncul di layar Koki (Poling UI) tanpa koki perlu menyentuh layar (tanpa refresh manual).
18. **`Debug.jsx`**
    - **Tujuan**: Hub pengujian (Toolbox).
    - **Penjelasan**: Berisi tombol-tombol yang mem-POST request ke `DebugController` (seperti men-trigger Notifikasi WhatsApp palsu, dll).

# Panduan Penggunaan Fitur RM Kembar

Dokumen ini menjelaskan cara menggunakan setiap fitur yang sudah diimplementasikan pada MVP RM Kembar. Panduan ini ditujukan untuk staf rumah makan, pemilik, pengguna dapur, dan pelanggan yang mengoperasikan aplikasi melalui browser.

## 1. Akses dan Role

Aplikasi memiliki empat role pengguna:

| Role | Akses utama |
| --- | --- |
| `customer` | Halaman publik, checkout, reservasi, riwayat pesanan sendiri, membatalkan pesanan sendiri yang masih pending dan belum dibayar |
| `admin` | Seluruh operasional admin, laporan, pengaturan, dan kitchen display |
| `owner` | Akses operasional yang sama seperti admin |
| `kitchen` | Kitchen display saja |

Akun staf bawaan dari seeder untuk pengembangan lokal:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@rmkembar.test` | `password` |
| Owner | `owner@rmkembar.test` | `password` |
| Kitchen | `kitchen@rmkembar.test` | `password` |

Staf harus mengganti kredensial ini sebelum aplikasi digunakan untuk produksi.

## 2. Halaman Beranda Publik

Route: `/`

Gunakan halaman ini untuk melihat landing page rumah makan, ringkasan ketersediaan meja, dan menu tersedia yang ditampilkan.

Cara menggunakan:

1. Buka URL utama aplikasi.
2. Pilih `Pesan Dine-In` untuk mulai membuat pesanan dari halaman menu.
3. Pilih `Reservasi Meja` untuk membuat reservasi meja.
4. Gunakan navigasi atas untuk membuka `Menu`, `Reservasi`, `Masuk`, atau `Daftar`.

Yang ditampilkan:

- Jumlah meja kosong dibandingkan total meja.
- Menu yang ditampilkan berasal dari data menu tersedia yang dikelola admin.

## 3. Registrasi Pelanggan

Route: `/register`

Gunakan fitur ini saat pelanggan ingin memiliki akun untuk login dan melihat riwayat pesanan.

Cara menggunakan:

1. Buka `Daftar` dari header.
2. Isi `Nama`, `Email`, `Nomor WhatsApp`, `Alamat` jika diperlukan, `Password`, dan `Konfirmasi Password`.
3. Pilih `Daftar`.
4. Setelah registrasi berhasil, pelanggan akan otomatis login dan diarahkan ke halaman beranda.

Aturan penting:

- Email harus valid dan unik.
- Nomor WhatsApp harus unik.
- Password minimal 8 karakter.
- Password dan konfirmasi password harus sama.

## 4. Login dan Logout

Routes:

- Login: `/login`
- Logout: `/logout`

Cara login:

1. Buka `Masuk` dari header.
2. Masukkan email dan password.
3. Centang `Ingat saya` jika diperlukan.
4. Pilih `Masuk`.

Setelah login:

- Pelanggan diarahkan ke halaman beranda.
- Admin dan owner diarahkan ke `/admin/dashboard`.
- Pengguna kitchen diarahkan ke `/kitchen`.

Cara logout:

1. Pilih `Keluar` dari header atau sidebar admin.
2. Sesi akan ditutup dan pengguna kembali ke halaman beranda.

Catatan:

- Pengguna yang tidak aktif tidak bisa login.
- Kredensial yang salah akan menampilkan pesan error.

## 5. Melihat Menu dan Memfilter Item

Route: `/menu`

Gunakan fitur ini untuk melihat menu dine-in, mencari berdasarkan nama, memfilter berdasarkan kategori, dan menambahkan item ke keranjang.

Cara melihat menu:

1. Buka `Menu` dari header atau langsung ke `/menu`.
2. Gunakan `Cari menu` untuk mencari berdasarkan nama menu.
3. Gunakan `Semua kategori` untuk memfilter berdasarkan kategori.
4. Pilih `Filter`.

Cara pemilihan meja bekerja:

- Membuka `/menu?table=1` akan memilih nomor meja atau ID meja `1`.
- Kartu meja di admin menyediakan URL pemesanan seperti `/menu?table=1`.
- Meja yang dipilih disimpan di session dan baru dikunci setelah checkout berhasil.

Yang ditampilkan:

- Item menampilkan kategori, nama, deskripsi, harga, dan stok.
- Item tanpa stok atau yang tidak tersedia tidak bisa ditambahkan.

## 6. Keranjang

Routes:

- Tambah item: `/cart/items`
- Hapus item: `/cart/items/{menu}`

Gunakan keranjang untuk mengumpulkan item menu sebelum checkout.

Cara menambahkan item:

1. Pada `/menu`, pilih jumlah pada input angka.
2. Isi `Catatan item` jika diperlukan, misalnya tingkat pedas atau catatan penyajian.
3. Pilih `Tambah`.

Cara menghapus item:

1. Cari item pada panel `Keranjang`.
2. Pilih `Hapus`.

Aturan penting:

- Jumlah minimal 1 dan maksimal 99 untuk setiap aksi tambah.
- Jumlah akhir di keranjang dibatasi oleh stok menu saat ini.
- Jika keranjang kosong, checkout tidak dapat dilakukan.

## 7. Checkout Dine-In

Routes:

- Halaman checkout: `/checkout`
- Submit checkout: `/checkout`

Gunakan checkout untuk membuat pesanan dine-in dari keranjang session.

Cara checkout:

1. Tambahkan minimal satu item menu ke keranjang.
2. Pilih `Checkout` dari panel keranjang.
3. Jika belum login, isi `Nama`, `Nomor WhatsApp`, `Email` jika diperlukan, dan `Alamat` jika diperlukan.
4. Pilih `Metode pembayaran`:
   - `Bayar di kasir`
   - `QRIS manual`
   - `Transfer bank`
5. Isi `Catatan pesanan` jika diperlukan.
6. Periksa `Ringkasan`, subtotal, PPN, dan total.
7. Pilih `Buat Pesanan`.

Yang terjadi setelah submit:

- Aplikasi membuat data pelanggan jika nomor telepon tamu belum ada.
- Aplikasi membuat pesanan, item pesanan, dan pembayaran pending.
- Jika meja dipilih, status meja berubah menjadi `locked`.
- Keranjang dan meja yang dipilih dihapus dari session.
- Pelanggan diarahkan ke halaman konfirmasi pesanan.

Aturan penting:

- Checkout membutuhkan keranjang yang tidak kosong.
- Tamu wajib mengisi nama dan nomor telepon.
- Meja yang dipilih harus tersedia.
- Pembayaran pada MVP saat ini masih manual.

## 8. Konfirmasi Pesanan

Route: `/order/confirm/{code}`

Gunakan halaman ini sebagai bukti bahwa pesanan berhasil dibuat.

Cara menggunakan:

1. Setelah checkout, tetap berada di halaman konfirmasi.
2. Catat kode pesanan yang ditampilkan di bagian atas.
3. Tunjukkan kode tersebut ke kasir untuk validasi pembayaran dan kedatangan.

Halaman ini menampilkan:

- Kode pesanan
- Status pesanan
- Status pembayaran
- Nomor meja
- Total
- Item yang dipesan

Catatan:

- Kode pesanan yang tidak dikenal akan menampilkan halaman tidak ditemukan.
- Pelanggan dapat membuka kembali URL konfirmasi jika mengetahui kode pesanan.

## 9. Reservasi Meja

Route: `/reservasi`

Gunakan fitur ini saat pelanggan ingin memesan meja untuk kunjungan berikutnya.

Cara membuat reservasi:

1. Buka `Reservasi` dari header.
2. Jika belum login, isi `Nama` dan `Nomor WhatsApp`.
3. Pilih `Tanggal`.
4. Pilih `Jam`.
5. Masukkan jumlah tamu pada `Tamu`.
6. Tambahkan `Catatan` jika diperlukan.
7. Pilih `Buat Reservasi`.

Yang terjadi setelah submit:

- Reservasi disimpan dengan status `pending`.
- Aplikasi membuat data pelanggan jika nomor telepon tamu belum ada.
- Admin mengonfirmasi meja aktual saat pelanggan datang.
- MVP saat ini belum mengunci meja ketika reservasi dibuat.

Aturan penting:

- Tanggal reservasi harus hari ini atau setelahnya.
- Waktu harus menggunakan format `HH:mm`.
- Jumlah tamu harus antara 1 sampai 100.
- Waktu auto-cancel reservasi dikontrol oleh setting `auto_cancel_minutes`.

## 10. Riwayat Pesanan Pelanggan

Route: `/akun/riwayat`

Gunakan halaman ini untuk melihat pesanan pelanggan sebelumnya dan membatalkan pesanan pending yang memenuhi syarat.

Cara menggunakan:

1. Login sebagai pelanggan.
2. Pilih `Riwayat` dari header.
3. Pilih kode pesanan untuk membuka halaman konfirmasi.
4. Jika pesanan masih pending dan belum dibayar, pilih `Batalkan` untuk membatalkan pesanan.

Yang terjadi saat pesanan dibatalkan:

- Status pesanan berubah menjadi `cancelled`.
- Data pembayaran pending berubah menjadi `failed`.
- Meja yang terkunci, jika ada, dikembalikan menjadi `kosong`.

Aturan penting:

- Pelanggan hanya bisa melihat pesanan miliknya sendiri.
- Pelanggan hanya bisa membatalkan pesanan miliknya sendiri yang belum dibayar dan berstatus `pending`.

## 11. Dashboard Admin

Route: `/admin/dashboard`

Gunakan halaman ini sebagai ringkasan operasional untuk admin atau owner.

Cara menggunakan:

1. Login sebagai admin atau owner.
2. Buka `Dashboard` dari sidebar.
3. Periksa ringkasan operasional.

Dashboard menampilkan:

- `Pesanan hari ini`
- `Revenue hari ini`
- `Pesanan aktif`
- `Meja dipakai`
- `Pesanan terbaru`
- `Stok rendah`

Gunakan halaman ini untuk menentukan apakah perlu memeriksa pesanan, menambah stok menu, atau meninjau penggunaan meja.

## 12. Manajemen Pesanan Admin

Route: `/admin/pesanan`

Gunakan fitur ini untuk memproses pesanan pelanggan dari pembayaran sampai selesai.

Cara mencari pesanan:

1. Buka `Pesanan` dari sidebar admin.
2. Gunakan kolom pencarian untuk mencari berdasarkan kode pesanan, nama pelanggan, atau nomor WhatsApp.
3. Gunakan dropdown status untuk memfilter:
   - `pending`
   - `paid_waiting`
   - `on_site`
   - `preparing`
   - `completed`
   - `cancelled`
4. Pilih `Cari`.

Tombol aksi pesanan:

| Tombol | Efek |
| --- | --- |
| `Validasi Bayar` | Menandai pembayaran sebagai paid dan status pesanan menjadi `paid_waiting` |
| `Tiba` | Menandai pelanggan sudah datang, status menjadi `on_site`, dan meja menjadi `terisi` |
| `Masak` | Menandai status pesanan menjadi `preparing`; pesanan muncul di kitchen display |
| `Selesai` | Menandai pesanan sebagai `completed`, mengurangi stok menu, membuat stock log, dan melepas meja |
| `Batal` | Menandai pesanan sebagai `cancelled` dan melepas meja |

Alur yang disarankan:

1. Pelanggan menunjukkan kode pesanan.
2. Admin memilih `Validasi Bayar` setelah pembayaran manual dikonfirmasi.
3. Admin memilih `Tiba` saat pelanggan sudah berada di rumah makan.
4. Admin memilih `Masak` saat pesanan perlu dikirim ke dapur.
5. Admin memilih `Selesai` saat pesanan sudah selesai.

Aturan penting:

- Pesanan yang sudah selesai tidak bisa dibatalkan.
- Menyelesaikan pesanan hanya mengurangi stok satu kali.
- Membatalkan atau menyelesaikan pesanan akan melepas meja.

## 13. Manajemen Menu Admin

Route: `/admin/menu`

Gunakan fitur ini untuk membuat, memperbarui, dan menghapus item menu.

Cara menambahkan item menu:

1. Buka `Menu` dari sidebar admin.
2. Pada `Tambah menu`, pilih kategori.
3. Isi `Nama menu`, `Harga`, dan `Stok`.
4. Isi deskripsi, batas stok rendah, dan urutan jika diperlukan.
5. Pilih checkbox ketersediaan:
   - `available`
   - `for dine in`
   - `for catering`
6. Pilih `Simpan Menu`.

Cara memperbarui item menu:

1. Cari form item menu yang sudah ada.
2. Ubah kategori, nama, harga, stok, deskripsi, batas stok, urutan, atau ketersediaan.
3. Pilih `Update`.

Cara menghapus item menu:

1. Cari item menu.
2. Pilih `Hapus`.

Aturan penting:

- Nama wajib diisi dan maksimal 150 karakter.
- Harga harus berupa angka dan minimal 0.
- Stok harus berupa bilangan bulat dan minimal 0.
- Perubahan stok akan membuat stock log.
- Item menu yang dihapus akan dihapus secara soft delete.
- CRUD kategori menu belum diimplementasikan pada MVP saat ini.

## 14. Manajemen Meja Admin

Route: `/admin/stok-meja`

Gunakan fitur ini untuk mengelola meja dine-in dan URL pemesanan meja.

Cara menambahkan meja:

1. Buka `Stok & Meja` dari sidebar admin.
2. Isi `Nomor meja`.
3. Isi `Kapasitas`.
4. Isi `Lokasi` dan `Catatan` jika diperlukan.
5. Pilih `Tambah`.

Cara memperbarui meja:

1. Cari kartu meja.
2. Ubah kapasitas, status, lokasi, atau catatan.
3. Pilih `Update Meja`.

Status meja yang tersedia:

| Status | Arti |
| --- | --- |
| `kosong` | Kosong dan tersedia |
| `locked` | Terkunci sementara oleh checkout pending |
| `terisi` | Pelanggan sudah datang dan meja sedang digunakan |
| `reserved` | Direservasi manual oleh staf |

Penggunaan URL pesanan:

1. Salin atau buka URL yang ditampilkan pada setiap kartu meja, misalnya `/menu?table=1`.
2. Gunakan URL ini sebagai QR meja atau link input pesanan.
3. Pelanggan yang membukanya akan memiliki meja tersebut sebagai meja checkout yang dipilih.

Aturan penting:

- Nomor meja harus unik.
- Kapasitas minimal 1.
- Mengubah status meja menjadi `kosong` akan menghapus data lock.

## 15. Manajemen Pengguna Admin

Route: `/admin/pengguna`

Gunakan fitur ini untuk mengelola akun pelanggan dan staf.

Cara memfilter pengguna:

1. Buka `Pengguna` dari sidebar admin.
2. Gunakan dropdown role untuk memfilter berdasarkan `customer`, `admin`, `owner`, atau `kitchen`.

Cara menambahkan pengguna:

1. Isi `Nama`.
2. Isi email, WhatsApp, dan alamat jika diperlukan.
3. Pilih role.
4. Masukkan password.
5. Biarkan `Aktif` tercentang jika akun boleh login.
6. Pilih `Simpan Pengguna`.

Cara memperbarui pengguna:

1. Cari form pengguna.
2. Ubah nama, email, WhatsApp, role, alamat, password, atau status aktif.
3. Kosongkan password jika tidak ingin mengubahnya.
4. Pilih `Update`.

Cara menghapus pengguna:

1. Cari pengguna.
2. Pilih `Hapus`.

Aturan penting:

- Password wajib untuk pengguna baru dan minimal 8 karakter.
- Email dan nomor telepon harus unik jika diisi.
- Admin tidak bisa menghapus akun yang sedang digunakan.
- Pengguna tidak aktif tidak bisa login.
- Pengguna yang dihapus akan dihapus secara soft delete.

## 16. Pengaturan Admin

Route: `/admin/pengaturan`

Gunakan fitur ini untuk mengubah pengaturan runtime aplikasi.

Cara memperbarui pengaturan:

1. Buka `Pengaturan` dari sidebar admin.
2. Ubah nilai setting yang ditampilkan pada setiap grup.
3. Pilih `Simpan Pengaturan`.

Setting bawaan penting:

| Key | Fungsi |
| --- | --- |
| `tax_rate` | Tarif PPN/pajak yang digunakan saat checkout |
| `auto_cancel_minutes` | Menit sebelum reservasi dan pembayaran pending kedaluwarsa |
| `low_stock_threshold` | Batas default peringatan stok rendah |
| `dp_percentage` | Setting down payment catering untuk fitur mendatang |
| `delivery_fee_per_km` | Setting ongkir catering per km untuk fitur mendatang |

Aturan penting:

- Setting integer harus berupa bilangan bulat.
- Setting float harus berupa angka valid.
- Setting numerik tidak boleh negatif.
- Nilai yang tidak valid akan ditolak.

## 17. Laporan Admin

Routes:

- Halaman laporan: `/admin/laporan`
- Export CSV: `/admin/laporan/export`

Gunakan fitur ini untuk meninjau revenue pesanan yang sudah dibayar dan mengekspor data pesanan.

Cara melihat laporan:

1. Buka `Laporan` dari sidebar admin.
2. Pilih tanggal `from` dan `to`.
3. Pilih `Filter`.

Laporan menampilkan:

- Jumlah transaksi paid.
- Total revenue paid.
- Rata-rata nilai pesanan paid.
- Revenue harian.
- Revenue berdasarkan kategori menu.

Cara export CSV:

1. Atur rentang tanggal yang diinginkan.
2. Pilih `Export CSV`.
3. CSV berisi kode pesanan, tanggal, customer, meja, status, status pembayaran, subtotal, PPN, dan total.

Catatan penting:

- Ringkasan hanya menghitung pesanan dengan `payment_status = paid`.
- Export CSV berisi pesanan dalam rentang tanggal. Jika tidak ada data pesanan, export akan menampilkan error.
- Jika tanggal `to` lebih awal daripada tanggal `from`, aplikasi akan menukar rentang tanggal secara otomatis.

## 18. Kitchen Display

Route: `/kitchen`

Gunakan fitur ini agar staf dapur dapat melihat pesanan aktif yang perlu dimasak.

Cara menggunakan:

1. Login sebagai `kitchen`, `admin`, atau `owner`.
2. Buka `/kitchen` atau pilih `Kitchen` dari sidebar admin.
3. Periksa setiap kartu pesanan aktif.

Kitchen display menampilkan:

- Kode pesanan
- Nomor meja
- Status pesanan
- Jumlah item
- Nama menu
- Catatan item

Pesanan yang muncul di kitchen display:

- Pesanan dengan status `on_site`
- Pesanan dengan status `preparing`

Catatan:

- Halaman memperbarui data pesanan otomatis setiap 5 detik.
- Pengguna kitchen dapat melihat halaman ini, tetapi tidak memiliki akses ke halaman manajemen admin.

## 19. Command Expiry Pending

Command:

```bash
php artisan rmkembar:expire-pending
```

Gunakan command ini untuk memproses reservasi lama, pembayaran pending, dan pesanan pending yang belum dibayar.

Yang dilakukan command:

1. Menandai reservasi pending atau confirmed yang sudah kedaluwarsa sebagai `auto_cancelled`.
2. Menandai pembayaran pending yang sudah kedaluwarsa sebagai `expired`.
3. Membatalkan pesanan pending terkait yang belum dibayar.
4. Melepas meja yang terkunci dari pesanan yang dibatalkan.

Penggunaan operasional:

1. Jalankan manual saat testing jika perlu memproses expiry langsung.
2. Di produksi, jalankan scheduler Laravel agar command berjalan setiap menit.

Command scheduler:

```bash
php artisan schedule:work
```

## 20. Alur End-to-End Umum

### Alur Pesanan Dine-In

1. Pelanggan membuka `/menu` atau memindai URL meja seperti `/menu?table=1`.
2. Pelanggan menambahkan item ke keranjang.
3. Pelanggan checkout dan menerima kode pesanan.
4. Pelanggan menunjukkan kode pesanan ke kasir.
5. Admin membuka `/admin/pesanan`.
6. Admin memilih `Validasi Bayar`.
7. Admin memilih `Tiba`.
8. Admin memilih `Masak`.
9. Kitchen melihat pesanan di `/kitchen`.
10. Admin memilih `Selesai`.
11. Stok berkurang dan meja dilepas.

### Alur Reservasi

1. Pelanggan membuka `/reservasi`.
2. Pelanggan mengirim tanggal, waktu, jumlah tamu, dan catatan jika ada.
3. Reservasi disimpan sebagai `pending`.
4. Staf mengonfirmasi dan menangani meja saat pelanggan datang.
5. Jika reservasi melewati waktu auto-cancel dan scheduler berjalan, reservasi dapat berubah menjadi `auto_cancelled`.

### Alur Pembatalan Pelanggan

1. Pelanggan login.
2. Pelanggan membuka `/akun/riwayat`.
3. Pelanggan memilih `Batalkan` pada pesanan pending yang belum dibayar.
4. Pesanan menjadi `cancelled`, pembayaran pending menjadi `failed`, dan meja dilepas.

## 21. Batasan MVP Saat Ini

Item berikut sudah direferensikan oleh data atau pengaturan, tetapi belum menjadi alur lengkap yang dapat digunakan pengguna:

- Integrasi payment gateway Midtrans.
- Integrasi notifikasi WhatsApp.
- File gambar QR yang digenerate untuk meja.
- UI scanner QR admin untuk validasi kedatangan.
- Alur pemesanan catering.
- CRUD kategori menu.
- Upload gambar menu.
- Export PDF atau Excel.
- UI rating.
- UI live chat.
- Update realtime menggunakan WebSocket.

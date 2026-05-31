# Bagian 1: Database & Models (`app/Models/`)

Model di Laravel merepresentasikan tabel di database. File-file di bawah menggunakan Eloquent ORM untuk memanipulasi data dan mengatur relasi (*relationships*).

### 1. `Catering.php`
- **Fungsi**: Entitas utama untuk sistem katering berskala besar.
- **Field Kunci**: `event_date`, `event_time`, `pic_name`, `pic_phone`, `delivery_address`.
- **Relasi**: Memiliki banyak `CateringItem` (`hasMany`).
- **Penjelasan**: Berbeda dengan pesanan meja biasa (`Order`), model ini dirancang khusus untuk menyimpan rincian acara yang lebih kompleks dan bisa dijadwalkan untuk tanggal di masa depan.

### 2. `CateringItem.php`
- **Fungsi**: Rincian menu/paket yang dipesan di dalam `Catering`.
- **Relasi**: Terikat pada satu `Catering` (`belongsTo`).
- **Penjelasan**: Memisahkan entitas induk (Katering) dengan anak-anaknya (barang yang dipesan). Menyimpan harga statis (`price` dan `subtotal`) saat katering dibuat.

### 3. `DineInTable.php`
- **Fungsi**: Mengelola data meja fisik di dalam restoran.
- **Field Kunci**: `table_number` (contoh: "Meja 1"), `capacity`, `status` (kosong, locked, dll).
- **Penjelasan**: Status `locked` digunakan untuk mencegah dua pelanggan men-scan QR code yang sama dan memesan di meja yang sama dalam waktu yang bersamaan.

### 4. `Menu.php`
- **Fungsi**: Katalog utama restoran (Makanan & Minuman).
- **Field Kunci**: `name`, `price`, `stock`, `image_path`, `is_available`.
- **Relasi**: Dimiliki oleh sebuah `MenuCategory` (`belongsTo`).
- **Penjelasan**: Memiliki *accessor* untuk format rupiah dan URL gambar publik, serta scope untuk memfilter menu yang stoknya masih ada (`is_available`).

### 5. `MenuCategory.php`
- **Fungsi**: Kategori pengelompokan menu (Camilan, Utama, Minuman).
- **Field Kunci**: `name`, `slug`, `sort_order`.
- **Penjelasan**: Field `sort_order` sangat penting agar kategori minuman selalu bisa ditaruh di bawah kategori makanan utama saat di-render di halaman `/menu` customer.

### 6. `Order.php`
- **Fungsi**: Entitas inti sistem transaksi (Dine-in / Takeaway).
- **Field Kunci**: `unique_code`, `status`, `payment_status`, `total_price`.
- **Relasi**: 
  - Dimiliki oleh `User` dan `DineInTable`.
  - Memiliki banyak `OrderItem` (keranjang).
  - Terkait dengan `Payment` dan `Rating` (secara polimorfik).
- **Penjelasan**: Memiliki logika krusial `generateCode()` untuk membuat ID Pesanan unik (contoh: `RMK-240531-ILHAM-001`). Model ini juga menggunakan *SoftDeletes* agar data tidak benar-benar terhapus dari database.

### 7. `OrderItem.php`
- **Fungsi**: Rincian baris barang dari sebuah `Order`.
- **Field Kunci**: `menu_id`, `menu_name`, `qty`, `price`, `subtotal`.
- **Penjelasan**: Alasan `menu_name` dan `price` di-copy ke sini adalah untuk menjaga histori. Jika bulan depan harga Nasi Goreng naik, total tagihan untuk pesanan bulan lalu tidak akan berubah.

### 8. `Payment.php`
- **Fungsi**: Histori pembayaran (*Payment Gateway* atau *Cash*).
- **Relasi**: *Polymorphic relation* (`payable_type`, `payable_id`).
- **Penjelasan**: Digunakan untuk menyimpan `snap_token` Midtrans. Dengan polimorfisme, model ini bisa menerima pembayaran untuk `Order` maupun `Catering` tanpa harus membuat tabel pembayaran terpisah.

### 9. `Rating.php`
- **Fungsi**: Sistem ulasan dan bintang pelanggan.
- **Field Kunci**: `stars`, `comment`.
- **Relasi**: *Polymorphic relation* (`rateable_type`, `rateable_id`) dan `User`.
- **Penjelasan**: Pelanggan bisa memberi bintang pada pesanan (`Order`) yang telah berstatus *completed*.

### 10. `Reservation.php`
- **Fungsi**: Pemesanan meja (Booking) di masa depan.
- **Field Kunci**: `reserved_date`, `reserved_time`, `guest_count`, `status`.
- **Penjelasan**: Terpisah dari `Order` dan `Catering`. Digunakan oleh pelanggan yang hanya ingin memastikan mereka dapat tempat duduk tanpa harus memesan makanan di awal.

### 11. `Setting.php`
- **Fungsi**: Konfigurasi global restoran.
- **Field Kunci**: `key`, `value` (contoh: `tax_rate` = 0.11).
- **Penjelasan**: Admin tidak perlu memanggil *developer* (mengubah `.env`) hanya untuk mengganti nilai PPN atau jam operasional. Semua bisa diatur melalui database.

### 12. `StockLog.php`
- **Fungsi**: Catatan audit keluar/masuk bahan atau makanan.
- **Field Kunci**: `menu_id`, `quantity_change`, `reason`.
- **Penjelasan**: Setiap kali koki atau admin menambah/mengurangi stok, sistem mencatat riwayatnya (Audit Trail) untuk mencegah kecurangan.

### 13. `User.php`
- **Fungsi**: Model autentikasi bawaan Laravel.
- **Field Kunci**: `name`, `email`, `phone`, `password`, `role`.
- **Penjelasan**: Field `role` adalah fondasi sistem keamanan. Hanya user dengan role `admin` atau `owner` yang dapat menembus middleware ke halaman `/admin/*`.

# Entity Relationship Diagram — RM Kembar

> Dokumentasi ini dibuat langsung dari file migrasi database.  
> Total: **15 tabel** + 3 tabel sistem Laravel (sessions, cache, jobs).

---

## Diagram ERD (Mermaid)

```mermaid
erDiagram

    users {
        bigint id PK
        string name
        string email UK
        string phone UK
        string role
        text address
        string avatar
        timestamp email_verified_at
        string password
        boolean is_active
        json meta
        string remember_token
        timestamp deleted_at
        timestamps
    }

    sessions {
        string id PK
        bigint user_id FK
        string ip_address
        text user_agent
        longtext payload
        int last_activity
    }

    password_reset_tokens {
        string email PK
        string token
        timestamp created_at
    }

    settings {
        bigint id PK
        string key UK
        text value
        string type
        string label
        string group
        timestamps
    }

    menu_categories {
        bigint id PK
        string name
        string slug UK
        int sort_order
        boolean is_active
        json meta
        timestamps
    }

    menus {
        bigint id PK
        bigint category_id FK
        string name
        string slug UK
        text description
        decimal price
        string image
        int stock
        int low_stock_threshold
        boolean is_available
        boolean is_for_dine_in
        boolean is_for_catering
        int sort_order
        json meta
        timestamp deleted_at
        timestamps
    }

    dine_in_tables {
        bigint id PK
        string table_number UK
        int capacity
        string status
        timestamp locked_at
        bigint locked_by_order_id FK
        string qr_code_path
        string location_label
        string notes
        json meta
        timestamps
    }

    orders {
        bigint id PK
        string unique_code UK
        bigint user_id FK
        string order_type
        bigint dine_in_table_id FK
        decimal subtotal
        decimal tax_rate
        decimal tax_amount
        decimal total_price
        string payment_status
        string status
        text notes
        text cancellation_reason
        string snap_token
        timestamp arrived_at
        timestamp preparing_at
        timestamp completed_at
        timestamp cancelled_at
        json meta
        timestamp deleted_at
        timestamps
    }

    order_items {
        bigint id PK
        bigint order_id FK
        bigint menu_id FK
        string menu_name
        int qty
        decimal price
        decimal subtotal
        string notes
        json meta
        timestamps
    }

    caterings {
        bigint id PK
        string unique_code UK
        bigint user_id FK
        date event_date
        time event_time
        text delivery_address
        decimal delivery_fee
        decimal delivery_distance_km
        string delivery_zone
        int guest_count
        decimal subtotal
        decimal tax_rate
        decimal tax_amount
        decimal total_price
        decimal dp_percentage
        decimal dp_amount
        decimal remaining_amount
        string payment_type
        string payment_status
        string status
        text notes
        text cancellation_reason
        timestamp confirmed_at
        timestamp completed_at
        timestamp cancelled_at
        json meta
        timestamp deleted_at
        timestamps
    }

    catering_items {
        bigint id PK
        bigint catering_id FK
        bigint menu_id FK
        string menu_name
        int qty
        decimal price
        decimal subtotal
        string notes
        json meta
        timestamps
    }

    reservations {
        bigint id PK
        string unique_code UK
        bigint user_id FK
        bigint table_id FK
        bigint order_id FK
        date reserved_date
        time reserved_time
        int guest_count
        string status
        text notes
        timestamp auto_cancel_at
        timestamp cancelled_at
        string cancellation_reason
        json meta
        timestamps
    }

    payments {
        bigint id PK
        bigint payable_id
        string payable_type
        string transaction_id UK
        string payment_method
        string payment_type
        decimal amount
        string status
        json gateway_response
        timestamp paid_at
        timestamp expired_at
        json meta
        timestamps
    }

    stock_logs {
        bigint id PK
        bigint menu_id FK
        bigint changed_by FK
        string change_type
        int qty_before
        int qty_change
        int qty_after
        string reason
        bigint reference_id
        string reference_type
        timestamp created_at
    }

    conversations {
        bigint id PK
        bigint user_id FK
        bigint assigned_to FK
        string status
        timestamp last_message_at
        json meta
        timestamps
    }

    messages {
        bigint id PK
        bigint conversation_id FK
        bigint sender_id FK
        text message
        string channel
        string direction
        string external_id
        boolean is_read
        timestamp read_at
        json meta
        timestamps
    }

    notifications {
        bigint id PK
        bigint user_id FK
        string type
        string title
        text body
        string channel
        string status
        bigint notifiable_id
        string notifiable_type
        timestamp read_at
        timestamp sent_at
        string failed_reason
        timestamps
    }

    ratings {
        bigint id PK
        bigint user_id FK
        bigint rateable_id
        string rateable_type
        tinyint stars
        text comment
        json meta
        timestamps
    }

    %% ─── Relasi ───────────────────────────────────────────
    users ||--o{ orders : "membuat"
    users ||--o{ caterings : "memesan"
    users ||--o{ reservations : "membuat"
    users ||--o{ conversations : "memiliki"
    users ||--o{ notifications : "menerima"
    users ||--o{ ratings : "memberi"
    users ||--o{ stock_logs : "mengubah (changed_by)"

    menu_categories ||--o{ menus : "memiliki"

    menus ||--o{ order_items : "digunakan"
    menus ||--o{ catering_items : "digunakan"
    menus ||--o{ stock_logs : "tercatat"

    orders ||--o{ order_items : "berisi"
    orders ||--o{ reservations : "terkait"
    orders }o--|| dine_in_tables : "menggunakan meja"
    dine_in_tables }o--|| orders : "dikunci oleh"

    caterings ||--o{ catering_items : "berisi"

    reservations }o--|| dine_in_tables : "memesan meja"

    conversations ||--o{ messages : "berisi"
```

---

## Detail Setiap Tabel

### 1. `users`
Tabel utama autentikasi. Satu tabel untuk semua role.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | Auto increment |
| `name` | varchar(100) | Nama lengkap |
| `email` | varchar(150) UNIQUE nullable | Email login |
| `phone` | varchar(20) UNIQUE nullable | Nomor HP |
| `role` | varchar(30) | `customer`, `admin`, `kitchen` |
| `address` | text nullable | Alamat pengiriman |
| `avatar` | varchar nullable | Path foto profil |
| `email_verified_at` | timestamp nullable | — |
| `password` | varchar | Bcrypt hash |
| `is_active` | boolean | Default `true` |
| `meta` | json nullable | Data tambahan |
| `deleted_at` | timestamp | Soft delete |

---

### 2. `menu_categories`
Kategori untuk mengelompokkan menu.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | — |
| `name` | varchar(100) | Nama kategori |
| `slug` | varchar(100) UNIQUE | URL-friendly name |
| `sort_order` | int | Urutan tampil |
| `is_active` | boolean | Default `true` |
| `meta` | json nullable | — |

---

### 3. `menus`
Data menu makanan/minuman. Stok langsung di sini (tidak tabel terpisah).

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | — |
| `category_id` | bigint FK → `menu_categories` | — |
| `name` | varchar(150) | Nama menu |
| `slug` | varchar(150) UNIQUE | — |
| `description` | text nullable | — |
| `price` | decimal(12,2) | Harga satuan |
| `image` | varchar nullable | Path gambar |
| `stock` | int | Stok tersedia |
| `low_stock_threshold` | int nullable | Batas stok rendah |
| `is_available` | boolean | Aktif/tidak |
| `is_for_dine_in` | boolean | Tersedia untuk dine-in |
| `is_for_catering` | boolean | Tersedia untuk catering |
| `sort_order` | int | — |
| `meta` | json nullable | — |
| `deleted_at` | timestamp | Soft delete |

---

### 4. `dine_in_tables`
Meja fisik restoran.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | — |
| `table_number` | varchar(10) UNIQUE | Nomor meja |
| `capacity` | int | Kapasitas kursi |
| `status` | varchar(20) | `kosong`, `terisi`, `dipesan` |
| `locked_at` | timestamp nullable | Waktu dikunci |
| `locked_by_order_id` | bigint FK → `orders` nullable | Order yang mengunci |
| `qr_code_path` | varchar nullable | Path QR code |
| `location_label` | varchar(100) nullable | Label lokasi (e.g. "Lantai 2") |
| `notes` | varchar nullable | — |
| `meta` | json nullable | — |

---

### 5. `orders`
Pesanan dine-in. Relasi ke meja, user, dan item.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | — |
| `unique_code` | varchar(30) UNIQUE | Kode pesanan (e.g. `ORD-20260101-001`) |
| `user_id` | bigint FK → `users` | — |
| `order_type` | varchar(30) | `dine_in` (default) |
| `dine_in_table_id` | bigint FK → `dine_in_tables` nullable | — |
| `subtotal` | decimal(12,2) | Sebelum pajak |
| `tax_rate` | decimal(5,4) | Rate pajak (e.g. 0.1 = 10%) |
| `tax_amount` | decimal(12,2) | Nominal pajak |
| `total_price` | decimal(12,2) | Total akhir |
| `payment_status` | varchar(20) | `unpaid`, `paid` |
| `status` | varchar(30) | `pending`, `paid_waiting`, `on_site`, `preparing`, `completed`, `cancelled` |
| `notes` | text nullable | Catatan pelanggan |
| `cancellation_reason` | text nullable | — |
| `snap_token` | varchar nullable | Token Midtrans |
| `arrived_at` | timestamp nullable | — |
| `preparing_at` | timestamp nullable | — |
| `completed_at` | timestamp nullable | — |
| `cancelled_at` | timestamp nullable | — |
| `meta` | json nullable | — |
| `deleted_at` | timestamp | Soft delete |

---

### 6. `order_items`
Detail item per pesanan (snapshot harga saat order).

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | — |
| `order_id` | bigint FK → `orders` | Cascade delete |
| `menu_id` | bigint FK → `menus` nullable | Null jika menu dihapus |
| `menu_name` | varchar(150) | Snapshot nama menu |
| `qty` | int | Jumlah |
| `price` | decimal(12,2) | Snapshot harga saat order |
| `subtotal` | decimal(12,2) | `qty × price` |
| `notes` | varchar nullable | Catatan item |
| `meta` | json nullable | — |

---

### 7. `caterings`
Pesanan catering (event/luar tempat).

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | — |
| `unique_code` | varchar(30) UNIQUE | — |
| `user_id` | bigint FK → `users` | — |
| `event_date` | date | Tanggal acara |
| `event_time` | time nullable | — |
| `delivery_address` | text | Alamat pengiriman |
| `delivery_fee` | decimal(12,2) | Ongkir |
| `delivery_distance_km` | decimal(6,2) nullable | Jarak km |
| `delivery_zone` | varchar(100) nullable | Zona pengiriman |
| `guest_count` | int nullable | Jumlah tamu |
| `subtotal` | decimal(12,2) | — |
| `tax_rate` / `tax_amount` | decimal | Pajak |
| `total_price` | decimal(12,2) | Total akhir |
| `dp_percentage` | decimal(5,4) | Default 50% (0.5) |
| `dp_amount` | decimal nullable | Nominal DP |
| `remaining_amount` | decimal nullable | Sisa pembayaran |
| `payment_type` | varchar(20) | `dp` atau `full` |
| `payment_status` | varchar(20) | `unpaid`, `partial`, `paid` |
| `status` | varchar(30) | `pending`, `confirmed`, `completed`, `cancelled` |
| `meta` | json nullable | — |
| `deleted_at` | timestamp | Soft delete |

---

### 8. `catering_items`
Detail item per pesanan catering.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | — |
| `catering_id` | bigint FK → `caterings` | Cascade delete |
| `menu_id` | bigint FK → `menus` nullable | — |
| `menu_name` | varchar(150) | Snapshot nama |
| `qty` | int | — |
| `price` | decimal(12,2) | Snapshot harga |
| `subtotal` | decimal(12,2) | — |
| `notes` | varchar nullable | — |
| `meta` | json nullable | — |

---

### 9. `reservations`
Reservasi meja sebelum datang ke restoran.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | — |
| `unique_code` | varchar(30) UNIQUE | — |
| `user_id` | bigint FK → `users` | — |
| `table_id` | bigint FK → `dine_in_tables` nullable | Meja yang dipesan |
| `order_id` | bigint FK → `orders` nullable | Order terkait (setelah tiba) |
| `reserved_date` | date | — |
| `reserved_time` | time | — |
| `guest_count` | int | — |
| `status` | varchar(30) | `pending`, `confirmed`, `arrived`, `completed`, `cancelled` |
| `notes` | text nullable | — |
| `auto_cancel_at` | timestamp nullable | Batas auto cancel |
| `cancelled_at` | timestamp nullable | — |
| `cancellation_reason` | varchar nullable | — |
| `meta` | json nullable | — |

---

### 10. `payments`
Polymorphic — melayani pembayaran untuk `orders` dan `caterings`.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | — |
| `payable_id` | bigint | ID dari orders atau caterings |
| `payable_type` | varchar | `App\Models\Order` atau `App\Models\Catering` |
| `transaction_id` | varchar(100) UNIQUE | ID dari Midtrans |
| `payment_method` | varchar(50) | `cash`, `transfer`, `qris`, dll. |
| `payment_type` | varchar(20) | `full`, `dp`, `remaining` |
| `amount` | decimal(12,2) | Jumlah dibayar |
| `status` | varchar(20) | `pending`, `paid`, `failed`, `expired` |
| `gateway_response` | json nullable | Raw response Midtrans |
| `paid_at` | timestamp nullable | — |
| `expired_at` | timestamp nullable | — |
| `meta` | json nullable | — |

---

### 11. `stock_logs`
Log setiap perubahan stok menu.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | — |
| `menu_id` | bigint FK → `menus` | — |
| `changed_by` | bigint FK → `users` nullable | Admin yang mengubah |
| `change_type` | varchar(30) | `manual`, `order`, `catering`, `adjustment` |
| `qty_before` | int | Stok sebelum |
| `qty_change` | int | Perubahan (positif/negatif) |
| `qty_after` | int | Stok setelah |
| `reason` | varchar nullable | Alasan perubahan |
| `reference_id` | bigint nullable | Polymorphic ref |
| `reference_type` | varchar nullable | Polymorphic ref |
| `created_at` | timestamp | — |

---

### 12. `conversations`
Thread percakapan WhatsApp (via Evolution API).

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | — |
| `user_id` | bigint FK → `users` | Pelanggan |
| `assigned_to` | bigint FK → `users` nullable | Admin yang handle |
| `status` | varchar(20) | `open`, `closed` |
| `last_message_at` | timestamp nullable | — |
| `meta` | json nullable | — |

---

### 13. `messages`
Pesan individual dalam conversation.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | — |
| `conversation_id` | bigint FK → `conversations` | — |
| `sender_id` | bigint FK → `users` | — |
| `message` | text | Isi pesan |
| `channel` | varchar(20) | `whatsapp`, `in_app` |
| `direction` | varchar(10) | `inbound`, `outbound` |
| `external_id` | varchar(100) nullable | ID dari Evolution API |
| `is_read` | boolean | — |
| `read_at` | timestamp nullable | — |
| `meta` | json nullable | — |

---

### 14. `notifications`
Notifikasi sistem (WhatsApp, in-app).

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | — |
| `user_id` | bigint FK → `users` | Penerima |
| `type` | varchar(100) | Jenis notif (e.g. `OrderConfirmed`) |
| `title` | varchar | — |
| `body` | text | Isi notif |
| `channel` | varchar(20) | `whatsapp`, `in_app` |
| `status` | varchar(20) | `pending`, `sent`, `failed` |
| `notifiable_id` | bigint nullable | Polymorphic ref |
| `notifiable_type` | varchar nullable | Polymorphic ref |
| `read_at` / `sent_at` | timestamp nullable | — |
| `failed_reason` | varchar nullable | — |

---

### 15. `ratings`
Rating ulasan dari pelanggan (polymorphic).

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | — |
| `user_id` | bigint FK → `users` | — |
| `rateable_id` | bigint | Polymorphic ref |
| `rateable_type` | varchar | `App\Models\Order`, `App\Models\Menu`, dll. |
| `stars` | tinyint | 1–5 |
| `comment` | text nullable | — |
| `meta` | json nullable | — |

---

### 16. `settings`
Key-value store untuk konfigurasi aplikasi.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | — |
| `key` | varchar(100) UNIQUE | e.g. `restaurant_name` |
| `value` | text | — |
| `type` | varchar(20) | `string`, `integer`, `boolean`, `json` |
| `label` | varchar(150) | Label tampilan di UI |
| `group` | varchar(50) nullable | Pengelompokan setting |

---

## Ringkasan Relasi

```
users ─────────────┬──< orders (1:N)
                   ├──< caterings (1:N)
                   ├──< reservations (1:N)
                   ├──< conversations (1:N)
                   ├──< notifications (1:N)
                   └──< ratings (1:N)

menu_categories ───┴──< menus (1:N)

menus ─────────────┬──< order_items (1:N)
                   ├──< catering_items (1:N)
                   └──< stock_logs (1:N)

orders ────────────┬──< order_items (1:N)
                   ├──> dine_in_tables (N:1)
                   └──< reservations (1:N)

caterings ─────────└──< catering_items (1:N)

reservations ──────└──> dine_in_tables (N:1)

payments ──────────── polymorphic → orders | caterings
stock_logs ────────── polymorphic reference
notifications ─────── polymorphic notifiable
ratings ───────────── polymorphic rateable
```

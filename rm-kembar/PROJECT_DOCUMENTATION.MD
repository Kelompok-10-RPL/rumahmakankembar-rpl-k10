# RM Kembar Project Documentation

This document describes the current RM Kembar application as implemented in this repository. It is meant to be the first place to read before changing routes, controllers, models, tests, or deployment setup.

## 1. Project Summary

RM Kembar is a Laravel 12 and Inertia React restaurant operations app. The current MVP supports:

- Customer browsing, cart, dine-in checkout, reservations, order confirmation, account registration/login, order history, and pending order cancellation.
- Admin/owner dashboard, order operations, menu management, table management, user management, settings, reports, and CSV export.
- Kitchen role display for active orders.
- Scheduled expiry for stale reservations and unpaid orders.

The application lives in the `rm-kembar` directory.

## 2. Technology Stack

- Backend: Laravel 12, PHP 8.2+
- Frontend: React 19, Inertia.js, Vite, Tailwind CSS 4
- Database: MySQL/MariaDB in production, SQLite in tests
- Auth: Laravel session auth using the `users` table
- Roles: simple `users.role` string, currently `customer`, `admin`, `owner`, `kitchen`
- Tests: PHPUnit feature/unit tests
- Build: Vite

## 3. Important Directories

- `app/Http/Controllers`: route handlers for customer, admin, kitchen, and auth features.
- `app/Http/Middleware`: Inertia shared props and role protection.
- `app/Models`: Eloquent models for users, menus, orders, payments, tables, reservations, and operations logs.
- `database/migrations`: database schema.
- `database/seeders`: default settings, staff accounts, sample menu, and tables.
- `resources/js/Layouts`: shared customer/admin layouts.
- `resources/js/Pages`: Inertia React pages.
- `routes/web.php`: web routes.
- `routes/console.php`: artisan commands and scheduler.
- `tests/Feature`: end-to-end feature tests.
- `tests/Unit`: small unit tests.

## 4. Environment

Required production variables:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com
APP_KEY=base64:...

DB_CONNECTION=mysql
DB_HOST=...
DB_PORT=3306
DB_DATABASE=...
DB_USERNAME=...
DB_PASSWORD=...

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

Development usually uses `.env`; production values should be configured in the hosting platform, not committed.

## 5. Seeded Accounts

The seeder creates these staff users:

- Admin: `admin@rmkembar.test`, password `password`
- Owner: `owner@rmkembar.test`, password `password`
- Kitchen: `kitchen@rmkembar.test`, password `password`

These are development defaults. Change or remove them before real production use.

## 6. Roles and Access

Role checks are handled by `App\Http\Middleware\EnsureRole`.

- `customer`: can view customer pages, checkout, reserve, view own history, cancel own unpaid pending orders.
- `admin`: can access admin pages and kitchen display.
- `owner`: can access admin pages and kitchen display.
- `kitchen`: can access only the kitchen display among staff pages.

Inactive users cannot log in.

## 7. Customer Features

### Home

Route: `GET /`

Shows:

- Available table count.
- Total table count.
- Featured available menus.
- Links to dine-in order and reservation.

Controller: `Customer\HomeController`
Page: `resources/js/Pages/Home.jsx`

### Menu and Cart

Routes:

- `GET /menu`
- `POST /cart/items`
- `DELETE /cart/items/{menu}`

Supported behavior:

- Search by menu name using `q`.
- Filter by category using `category`.
- Select table by URL query, for example `/menu?table=1`.
- Add menu items to a session cart.
- Add per-item notes.
- Remove items from the cart.
- Cart quantity is capped by current stock.

Controller: `Customer\MenuController`
Page: `resources/js/Pages/Customer/Menu.jsx`

### Checkout

Routes:

- `GET /checkout`
- `POST /checkout`

Supported behavior:

- Requires a non-empty session cart.
- Guests can checkout by entering name, phone, email, and address.
- Logged-in users can checkout without re-entering identity fields.
- Creates a customer user for guests by phone if needed.
- Creates an order, order items, and pending payment.
- Calculates tax using `settings.tax_rate`.
- Locks the selected table if one is selected.
- Redirects to the order confirmation page.

Controller: `Customer\CheckoutController`
Page: `resources/js/Pages/Customer/Checkout.jsx`

### Order Confirmation

Route: `GET /order/confirm/{code}`

Shows:

- Unique order code.
- Order status.
- Payment status.
- Table number.
- Total.
- Ordered items.

Controller: `Customer\OrderConfirmationController`
Page: `resources/js/Pages/Orders/Confirm.jsx`

### Reservations

Routes:

- `GET /reservasi`
- `POST /reservasi`

Supported behavior:

- Guests and customers can create reservations.
- Stores reserved date, time, guest count, notes, and pending status.
- Computes `auto_cancel_at` from `settings.auto_cancel_minutes`.
- Admin assigns the actual table later; the reservation does not lock a specific table.

Controller: `Customer\ReservationController`
Page: `resources/js/Pages/Reservations/Create.jsx`

### Customer Account

Routes:

- `GET /akun/riwayat`
- `POST /akun/pesanan/{order}/cancel`

Supported behavior:

- Authenticated customers can view their own order history.
- Customers can cancel only their own unpaid pending orders.
- Cancelling releases a locked table and marks pending payment records as failed.

Controller: `Customer\AccountController`
Page: `resources/js/Pages/Customer/History.jsx`

## 8. Authentication Features

Routes:

- `GET /login`
- `POST /login`
- `GET /register`
- `POST /register`
- `POST /logout`

Supported behavior:

- Login by email/password.
- Register customer account with name, email, phone, address, and password.
- Redirect staff to their role-appropriate dashboard after login.
- Block inactive users.
- Logout invalidates the session.

Controllers:

- `Auth\LoginController`
- `Auth\RegisterController`

Pages:

- `resources/js/Pages/Auth/Login.jsx`
- `resources/js/Pages/Auth/Register.jsx`

## 9. Admin and Owner Features

All admin routes are protected by `auth` and `role:admin,owner`.

### Dashboard

Route: `GET /admin/dashboard`

Shows:

- Orders today.
- Paid revenue today.
- Active orders.
- Occupied/locked tables.
- Low-stock menu items.
- Recent orders.

Controller: `Admin\DashboardController`
Page: `resources/js/Pages/Admin/Dashboard.jsx`

### Order Management

Routes:

- `GET /admin/pesanan`
- `POST /admin/pesanan/{order}/{action}`

Supported behavior:

- Filter by order status.
- Search by order code, customer name, or customer phone.
- Mark payment as paid.
- Mark customer arrived.
- Mark order preparing.
- Complete order.
- Cancel order.
- Completing an order deducts menu stock, writes stock logs, and releases the table.
- Cancelling releases the table.

Valid actions:

- `paid`
- `arrive`
- `prepare`
- `complete`
- `cancel`

Controller: `Admin\OrderController`
Page: `resources/js/Pages/Admin/Orders.jsx`

### Menu Management

Routes:

- `GET /admin/menu`
- `POST /admin/menu`
- `PUT /admin/menu/{menu}`
- `DELETE /admin/menu/{menu}`

Supported behavior:

- Create menu item.
- Update menu item.
- Soft-delete menu item.
- Set category, name, description, price, stock, low-stock threshold, sort order, availability, dine-in flag, and catering flag.
- Stock updates create `stock_logs` records.

Controller: `Admin\MenuController`
Page: `resources/js/Pages/Admin/Menu.jsx`

### Table Management

Routes:

- `GET /admin/stok-meja`
- `POST /admin/stok-meja`
- `PUT /admin/stok-meja/{table}`

Supported behavior:

- Create table.
- Update table capacity, status, location, and notes.
- Setting status to `kosong` clears lock fields.
- Each table exposes an order URL like `/menu?table=1`.

Controller: `Admin\TableController`
Page: `resources/js/Pages/Admin/Tables.jsx`

### User Management

Routes:

- `GET /admin/pengguna`
- `POST /admin/pengguna`
- `PUT /admin/pengguna/{user}`
- `DELETE /admin/pengguna/{user}`

Supported behavior:

- List users.
- Filter by role.
- Create users.
- Update profile fields, role, active status, and optionally password.
- Soft-delete users.
- Prevent deleting the currently logged-in user.

Controller: `Admin\UserController`
Page: `resources/js/Pages/Admin/Users.jsx`

### Settings

Routes:

- `GET /admin/pengaturan`
- `PUT /admin/pengaturan`

Supported behavior:

- View grouped settings.
- Update setting values.
- Validate values according to setting type.

Important seeded settings:

- `tax_rate`
- `auto_cancel_minutes`
- `low_stock_threshold`
- `dp_percentage`
- `delivery_fee_per_km`

Controller: `Admin\SettingController`
Page: `resources/js/Pages/Admin/Settings.jsx`

### Reports

Routes:

- `GET /admin/laporan`
- `GET /admin/laporan/export`

Supported behavior:

- Filter by date range.
- Show paid transaction count.
- Show paid revenue.
- Show average order value.
- Show daily revenue.
- Show category revenue.
- Export order report as CSV.

Controller: `Admin\ReportController`
Page: `resources/js/Pages/Admin/Reports.jsx`

## 10. Kitchen Feature

Route: `GET /kitchen`

Protected by `auth` and `role:kitchen,admin,owner`.

Supported behavior:

- Shows active kitchen orders with status `on_site` or `preparing`.
- Shows table number, order code, item quantities, names, and notes.
- Frontend polls every 5 seconds.

Controller: `KitchenController`
Page: `resources/js/Pages/Kitchen/Index.jsx`

## 11. Data Model Overview

### `users`

Stores customers and staff. Uses soft deletes. Important fields:

- `name`
- `email`
- `phone`
- `role`
- `address`
- `password`
- `is_active`
- `meta`

### `menu_categories`

Groups menu items. Important fields:

- `name`
- `slug`
- `sort_order`
- `is_active`

### `menus`

Stores menu catalog and stock. Uses soft deletes. Important fields:

- `category_id`
- `name`
- `slug`
- `description`
- `price`
- `stock`
- `low_stock_threshold`
- `is_available`
- `is_for_dine_in`
- `is_for_catering`

### `dine_in_tables`

Stores restaurant table state. Important fields:

- `table_number`
- `capacity`
- `status`
- `locked_at`
- `locked_by_order_id`
- `qr_code_path`
- `location_label`
- `notes`

### `orders`

Stores dine-in orders. Uses soft deletes. Important fields:

- `unique_code`
- `user_id`
- `order_type`
- `dine_in_table_id`
- `subtotal`
- `tax_rate`
- `tax_amount`
- `total_price`
- `payment_status`
- `status`
- timestamp fields for arrival, preparing, completion, and cancellation

### `order_items`

Stores order line items. Menu name and price are snapshotted.

### `reservations`

Stores table reservations. Reservation availability is guaranteed by date/time/guest count workflow, not by locking a specific table.

### `payments`

Polymorphic payment records. Currently used for manual payment tracking.

### `stock_logs`

Append-only stock movement log.

### `settings`

Runtime configuration key-value table.

### Future-oriented tables

These tables exist but do not yet have complete user-facing features:

- `caterings`
- `catering_items`
- `conversations`
- `messages`
- `notifications`
- `ratings`

## 12. Core Workflows

### Dine-In Order

1. Customer opens `/menu`, optionally with `?table=1`.
2. Customer adds items to cart.
3. Customer opens `/checkout`.
4. Checkout creates order, order items, and pending payment.
5. Checkout locks selected table.
6. Customer sees order confirmation code.
7. Admin validates payment.
8. Admin marks customer arrived.
9. Admin sends order to kitchen by marking it preparing.
10. Admin completes order.
11. Completion deducts stock and releases table.

### Reservation

1. Customer opens `/reservasi`.
2. Customer submits date, time, guest count, and notes.
3. Reservation is stored as pending.
4. `auto_cancel_at` is calculated.
5. Scheduler can mark stale reservation as `auto_cancelled`.

### Expiry

Command:

```bash
php artisan rmkembar:expire-pending
```

This command:

- Marks stale pending/confirmed reservations as `auto_cancelled`.
- Marks expired pending payments as `expired`.
- Cancels related unpaid pending orders.
- Releases locked tables for cancelled orders.

It is scheduled every minute in `routes/console.php`. Production must run Laravel's scheduler.

## 13. Artisan Commands

Common commands:

```bash
composer install
npm install
php artisan key:generate
php artisan migrate
php artisan db:seed
npm run dev
php artisan serve
```

Production commands:

```bash
composer install --no-dev --optimize-autoloader
npm ci
npm run build
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Scheduler:

```bash
php artisan schedule:work
```

Queue worker, when queue-backed jobs are added:

```bash
php artisan queue:work --tries=3
```

## 14. Testing

Run all tests:

```bash
php artisan test
```

Current feature test coverage:

- `AccessControlTest`: guest redirects, staff/customer role protection, inactive login, staff redirects.
- `AdminMvpTest`: dashboard, order search, menu CRUD, stock logs, table management, order transitions, cancellation, kitchen page, users, settings, reports.
- `CustomerMvpTest`: public pages, cart, checkout, reservations, register/history.
- `MvpOperationsTest`: expiry command, customer cancellation, admin operations pages.
- `ExampleTest`: Laravel starter smoke test.

Tests use SQLite in memory and run with database seeding.

## 15. Frontend

Frontend pages are Inertia React components. There is no client-side router; Laravel routes choose the page.

Shared helpers:

- `money(value)` in `AppLayout.jsx`
- `statusText(value)` in `AppLayout.jsx`

Layouts:

- `AppLayout`: customer-facing shell.
- `AdminLayout`: admin/kitchen shell.

Build:

```bash
npm run build
```

Development:

```bash
npm run dev
```

## 16. Deployment Notes

Recommended MVP deployment:

- Use Coolify from GitHub.
- Set the application root directory to `rm-kembar`.
- Start with Nixpacks.
- Add a MySQL/MariaDB service.
- Put environment variables in Coolify, not in git.
- Run migrations and seeders on first deploy.
- Run a scheduler worker for expiry features.

Useful commands after first deploy:

```bash
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
```

The app can later move to a custom Dockerfile or Docker Compose setup when it needs stricter control over PHP extensions, workers, scheduler, cron, or image builds.

## 17. Known MVP Gaps

These are planned but not fully implemented:

- Midtrans payment gateway integration.
- WhatsApp/EvolutionAPI notifications.
- Generated QR image files for tables.
- Real QR scanner UI for admin arrival validation.
- Catering ordering flow.
- Menu category CRUD.
- Menu image upload.
- PDF/Excel exports.
- Ratings UI.
- Live chat UI.
- WebSocket realtime updates.

## 18. Development Conventions

- Prefer Laravel validation in controllers.
- Keep role checks in routes/middleware.
- Keep customer and admin controllers separated by namespace.
- Use soft deletes for user-facing records where migrations already support it.
- Keep order item name/price snapshots for history correctness.
- Use settings for configurable values instead of hardcoding.
- Add feature tests for new routes and workflow side effects.
- Run `vendor/bin/pint --dirty`, `php artisan test`, and `npm run build` before deployment.


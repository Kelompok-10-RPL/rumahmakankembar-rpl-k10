# RM Kembar Test Documentation

This document explains the current automated tests for RM Kembar: how to run them, what each file covers, what data they rely on, and how to add new tests safely.

## 1. Test Stack

- Test runner: PHPUnit through Laravel's `php artisan test`
- Main test type: Laravel feature tests
- Database during tests: in-memory SQLite
- Database reset: `RefreshDatabase`
- Seed data: enabled in feature tests with `protected bool $seed = true`
- Password hashing cost: reduced by `BCRYPT_ROUNDS=4` in `phpunit.xml`
- Session driver: array
- Queue driver: sync
- Mail driver: array

The main configuration file is `phpunit.xml`.

## 2. Run Tests

Run the full suite:

```bash
php artisan test
```

Run only feature tests:

```bash
php artisan test --testsuite=Feature
```

Run only unit tests:

```bash
php artisan test --testsuite=Unit
```

Run one test file:

```bash
php artisan test tests/Feature/AdminMvpTest.php
```

Run one specific test:

```bash
php artisan test --filter=test_admin_order_status_flow_marks_paid_arrived_preparing_and_completed
```

Format test files:

```bash
vendor/bin/pint --dirty
```

Recommended verification before commits or deployment:

```bash
vendor/bin/pint --dirty
php artisan test
npm run build
```

## 3. Current Result

At the time this documentation was written:

- Tests: 44 passing
- Assertions: 218 passing

The suite covers the current implemented MVP. It does not cover future-only features such as Midtrans, WhatsApp notifications, catering UI, ratings UI, generated QR image files, or WebSocket realtime updates.

## 4. Test Data and Seeding

Most feature tests use:

```php
use RefreshDatabase;

protected bool $seed = true;
```

This means every test gets a fresh migrated database and the default seeder data.

The seeder creates:

- Admin user: `admin@rmkembar.test`, password `password`
- Owner user: `owner@rmkembar.test`, password `password`
- Kitchen user: `kitchen@rmkembar.test`, password `password`
- Default settings such as `tax_rate` and `auto_cancel_minutes`
- Menu categories
- Sample menu items
- 10 dine-in tables

Tests often fetch seeded records with:

```php
User::query()->where('email', 'admin@rmkembar.test')->firstOrFail();
Menu::query()->firstOrFail();
DineInTable::query()->firstOrFail();
```

When creating extra users in tests, use unique phone/email values. The `users.email` and `users.phone` columns are unique.

## 5. Test File Overview

### `tests/Feature/AccessControlTest.php`

Purpose: protects role-based access and login behavior.

Covered behavior:

- Guests are redirected away from authenticated pages.
- Customers cannot access admin or kitchen pages.
- Kitchen users can access `/kitchen`.
- Kitchen users cannot access `/admin/dashboard`.
- Owners can access admin pages.
- Inactive users cannot log in.
- Admin login redirects to admin dashboard.
- Kitchen login redirects to kitchen display.

Important routes covered:

- `account.history`
- `admin.dashboard`
- `admin.menu.index`
- `admin.tables.index`
- `kitchen.index`
- `login.store`

Why this matters:

This app uses a simple `users.role` field. These tests catch accidental route/middleware changes that would expose staff pages to the wrong role.

### `tests/Feature/AdminMvpTest.php`

Purpose: covers admin, owner, and kitchen-facing MVP workflows.

Covered behavior:

- Admin dashboard opens.
- Admin order search opens with a query.
- Admin can create, update, and soft-delete menus.
- Menu stock edits create `stock_logs`.
- Admin can create/update tables.
- Table `order_url` is exposed for QR/table workflows.
- Order flow transitions from paid to arrived to preparing to completed.
- Completing an order deducts menu stock.
- Completing an order writes an order stock log.
- Completing an order releases the table.
- Admin can cancel an order and release the table.
- Kitchen display opens for active kitchen orders.
- Admin can create, update, deactivate, and delete users.
- Admin can update settings.
- Admin can open reports.
- Admin can export CSV reports.
- Admin cannot delete their own account.

Important routes covered:

- `admin.dashboard`
- `admin.orders.index`
- `admin.orders.transition`
- `admin.menu.store`
- `admin.menu.update`
- `admin.menu.destroy`
- `admin.tables.store`
- `admin.tables.update`
- `admin.users.store`
- `admin.users.update`
- `admin.users.destroy`
- `admin.settings.update`
- `admin.reports.index`
- `admin.reports.export`
- `kitchen.index`

Important side effects asserted:

- `menus.slug` changes after menu rename.
- `stock_logs` records exist after stock changes and order completion.
- `menus` are soft-deleted.
- `dine_in_tables.status` returns to `kosong` after completion/cancellation.
- `users` are soft-deleted.
- Settings are cast correctly through `Setting::valueFor`.

### `tests/Feature/CustomerMvpTest.php`

Purpose: covers customer-facing MVP workflows.

Covered behavior:

- Public pages open.
- Guests can add menu items to cart.
- Cart stores item notes, quantity, and selected table.
- Guests can remove cart items.
- Checkout rejects an empty cart.
- Checkout creates user, order, order items, payment, and table lock.
- Guests can create reservations.
- Reservations compute `auto_cancel_at`.
- Customers can register.
- Authenticated customers can view order history.

Important routes covered:

- `home`
- `menu.index`
- `reservations.create`
- `reservations.store`
- `login`
- `register`
- `register.store`
- `cart.add`
- `cart.remove`
- `checkout.show`
- `checkout.store`
- `account.history`

Important side effects asserted:

- Session cart is created and removed.
- `selected_table_id` is stored in session.
- Guest checkout creates a customer user.
- Checkout creates an order with `pending` status and `unpaid` payment status.
- Checkout creates related order items and payment records.
- Checkout locks the selected table.
- Reservation creates a customer and pending reservation.

### `tests/Feature/MvpOperationsTest.php`

Purpose: covers backend operations added for MVP safety.

Covered behavior:

- `rmkembar:expire-pending` cancels stale reservations.
- `rmkembar:expire-pending` expires stale pending payments.
- `rmkembar:expire-pending` cancels related unpaid orders.
- Expiry releases locked tables.
- Customers can cancel their own unpaid pending orders.
- New admin operations pages open.

Important routes and commands covered:

- Artisan command `rmkembar:expire-pending`
- `account.orders.cancel`
- `admin.users.index`
- `admin.settings.index`
- `admin.reports.index`

Important side effects asserted:

- Reservation status becomes `auto_cancelled`.
- Order status becomes `cancelled`.
- Payment status becomes `expired`.
- Table status becomes `kosong`.

### `tests/Feature/ExampleTest.php`

Purpose: Laravel starter smoke test.

Covered behavior:

- The home page returns HTTP 200.

This is redundant with `CustomerMvpTest`, but harmless. It can be removed later if the team wants a cleaner suite.

### `tests/Unit/ExampleTest.php`

Purpose: Laravel starter unit test.

Covered behavior:

- Asserts `true` is true.

This is a placeholder. Replace it when actual unit-level logic exists, such as status helper classes, services, or value objects.

## 6. Coverage Matrix

| Feature Area | Covered By |
|---|---|
| Public home/menu/reservation/login/register pages | `CustomerMvpTest`, `ExampleTest` |
| Cart add/remove | `CustomerMvpTest` |
| Checkout and order creation | `CustomerMvpTest` |
| Guest user creation during checkout/reservation | `CustomerMvpTest` |
| Table selection/locking | `CustomerMvpTest`, `AdminMvpTest` |
| Reservation creation | `CustomerMvpTest` |
| Registration/login/logout path | `CustomerMvpTest`, `AccessControlTest` |
| Customer history | `CustomerMvpTest` |
| Customer order cancellation | `MvpOperationsTest` |
| Role middleware | `AccessControlTest` |
| Inactive login blocking | `AccessControlTest` |
| Admin dashboard | `AdminMvpTest`, `AccessControlTest` |
| Admin order search | `AdminMvpTest` |
| Admin order transitions | `AdminMvpTest` |
| Admin order cancellation | `AdminMvpTest` |
| Stock deduction and logs | `AdminMvpTest` |
| Menu CRUD | `AdminMvpTest` |
| Table management | `AdminMvpTest` |
| Kitchen display | `AdminMvpTest`, `AccessControlTest` |
| User management | `AdminMvpTest`, `MvpOperationsTest` |
| Settings update | `AdminMvpTest`, `MvpOperationsTest` |
| Reports and CSV export | `AdminMvpTest`, `MvpOperationsTest` |
| Expiry command | `MvpOperationsTest` |

## 7. Testing Patterns Used

### Acting as a user

```php
$this->actingAs($admin)->get(route('admin.dashboard'))->assertOk();
```

### Creating model records

```php
$customer = User::factory()->create([
    'role' => 'customer',
    'phone' => '628166600001',
]);
```

### Calling named routes

```php
$this->post(route('cart.add'), [
    'menu_id' => $menu->id,
    'qty' => 2,
]);
```

### Asserting database records

```php
$this->assertDatabaseHas('stock_logs', [
    'menu_id' => $menu->id,
    'change_type' => 'manual_update',
]);
```

### Asserting soft deletes

```php
$this->assertSoftDeleted('menus', ['id' => $menu->id]);
```

### Running Artisan commands

```php
$this->artisan('rmkembar:expire-pending')->assertSuccessful();
```

### Working with session cart data

```php
$this->withSession([
    'cart' => $cart,
    'selected_table_id' => $table->id,
])->post(route('checkout.store'), $payload);
```

## 8. Adding New Tests

When adding a new feature test:

1. Put it in `tests/Feature`.
2. Use `RefreshDatabase` if it touches database state.
3. Set `protected bool $seed = true` when the test depends on seeded staff, menus, settings, or tables.
4. Prefer named routes through `route(...)`.
5. Assert meaningful side effects, not only HTTP status codes.
6. Use unique emails and phone numbers.
7. Test authorization for new staff/customer routes.
8. Test failure states when the feature has business rules.
9. Run `php artisan test --filter=YourTestName`.
10. Run the full suite before finishing.

Example:

```php
public function test_admin_can_do_new_feature(): void
{
    $admin = User::query()->where('email', 'admin@rmkembar.test')->firstOrFail();

    $this->actingAs($admin)
        ->post(route('admin.example.store'), [
            'name' => 'Example',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('examples', [
        'name' => 'Example',
    ]);
}
```

## 9. What to Test Next

As planned features are implemented, add tests for:

- Midtrans payment callback success/failure/expiry.
- WhatsApp notification queue records or fake HTTP calls.
- Catering order creation and DP/full payment paths.
- Menu category CRUD.
- Menu image upload validation/storage.
- Reservation confirmation and arrival workflow.
- Admin QR/code scanner endpoint if added.
- Rating submission and authorization.
- Report date range edge cases.
- CSV export content assertions.
- Kitchen realtime/WebSocket behavior if polling is replaced.

## 10. Common Failure Causes

### Unique constraint failures

Use a unique email and phone when creating users. The seeder already creates staff phones and emails.

### Missing seed data

If `firstOrFail()` fails for menus/tables/settings, make sure the test class has:

```php
protected bool $seed = true;
```

### Auth redirects instead of 403

Unauthenticated users are redirected to login. Authenticated users with the wrong role should receive 403.

### Session assertions fail

Cart data is stored in Laravel session. Use `assertSessionHas` for POST responses or `withSession` to prepare checkout state.

### Soft-delete assertions fail

Use `assertSoftDeleted` only for models/tables that actually use soft deletes.

### Date-sensitive tests fail

Prefer relative dates like `now()->addDay()` for future reservations and `now()->subMinute()` for expiry tests.

## 11. Current Limitations

The current tests mostly assert backend behavior and page availability. They do not use browser automation, so they do not verify visual layout, JavaScript interactions in a real browser, or accessibility. For frontend-heavy work later, consider adding browser tests with Laravel Dusk or Playwright.

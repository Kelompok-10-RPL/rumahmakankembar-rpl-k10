<?php

namespace Tests\Feature;

use App\Models\DineInTable;
use App\Models\Menu;
use App\Models\MenuCategory;
use App\Models\Order;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminMvpTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::query()->where('email', 'admin@rmkembar.test')->firstOrFail();
    }

    public function test_admin_dashboard_and_order_search_are_available(): void
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628166600001']);
        $order = Order::create([
            'unique_code' => 'RMK-TEST-CARI',
            'user_id' => $customer->id,
            'order_type' => 'dine_in',
            'subtotal' => 10000,
            'tax_rate' => 0.11,
            'tax_amount' => 1100,
            'total_price' => 11100,
            'payment_status' => 'unpaid',
            'status' => 'pending',
        ]);

        $this->actingAs($this->admin)->get(route('admin.dashboard'))->assertOk();
        $this->actingAs($this->admin)->get(route('admin.orders.index', ['q' => $order->unique_code]))->assertOk();
    }

    public function test_admin_order_search_with_unknown_keyword_has_no_results(): void
    {
        $this->actingAs($this->admin)
            ->get(route('admin.orders.index', ['q' => 'ORDER-TIDAK-ADA']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Orders')
                ->has('orders.data', 0)
            );
    }

    public function test_admin_can_manage_menu_and_stock_logs(): void
    {
        $category = MenuCategory::query()->firstOrFail();

        $this->actingAs($this->admin)->post(route('admin.menu.store'), [
            'category_id' => $category->id,
            'name' => 'Tahu Isi',
            'description' => 'Tahu isi sayur',
            'price' => 8000,
            'stock' => 10,
            'low_stock_threshold' => 3,
            'sort_order' => 20,
            'is_available' => true,
            'is_for_dine_in' => true,
            'is_for_catering' => false,
        ])->assertRedirect();

        $menu = Menu::query()->where('slug', 'tahu-isi')->firstOrFail();

        $this->actingAs($this->admin)->put(route('admin.menu.update', $menu), [
            'category_id' => $category->id,
            'name' => 'Tahu Isi Pedas',
            'description' => 'Tahu isi sayur pedas',
            'price' => 9000,
            'stock' => 14,
            'low_stock_threshold' => 3,
            'sort_order' => 20,
            'is_available' => true,
            'is_for_dine_in' => true,
            'is_for_catering' => false,
        ])->assertRedirect();

        $menu->refresh();

        $this->assertSame('tahu-isi-pedas', $menu->slug);
        $this->assertDatabaseHas('stock_logs', [
            'menu_id' => $menu->id,
            'change_type' => 'manual_update',
            'qty_before' => 10,
            'qty_change' => 4,
            'qty_after' => 14,
        ]);

        $this->actingAs($this->admin)->delete(route('admin.menu.destroy', $menu))->assertRedirect();
        $this->assertSoftDeleted('menus', ['id' => $menu->id]);
    }

    public function test_admin_cannot_create_menu_with_empty_required_data(): void
    {
        $this->actingAs($this->admin)
            ->from(route('admin.menu.index'))
            ->post(route('admin.menu.store'), [])
            ->assertRedirect(route('admin.menu.index'))
            ->assertSessionHasErrors(['category_id', 'name', 'price', 'stock']);

        $this->assertDatabaseMissing('menus', ['name' => '']);
    }

    public function test_admin_cannot_update_menu_with_negative_stock(): void
    {
        $category = MenuCategory::query()->firstOrFail();
        $menu = Menu::query()->firstOrFail();
        $oldStock = $menu->stock;

        $this->actingAs($this->admin)
            ->from(route('admin.menu.index'))
            ->put(route('admin.menu.update', $menu), [
                'category_id' => $category->id,
                'name' => $menu->name,
                'description' => $menu->description,
                'price' => $menu->price,
                'stock' => -5,
                'low_stock_threshold' => $menu->low_stock_threshold,
                'sort_order' => $menu->sort_order,
                'is_available' => true,
                'is_for_dine_in' => true,
                'is_for_catering' => true,
            ])
            ->assertRedirect(route('admin.menu.index'))
            ->assertSessionHasErrors('stock');

        $this->assertSame($oldStock, $menu->fresh()->stock);
    }

    public function test_admin_can_manage_tables_and_table_order_url_is_exposed(): void
    {
        $this->actingAs($this->admin)->post(route('admin.tables.store'), [
            'table_number' => 'VIP1',
            'capacity' => 8,
            'location_label' => 'VIP',
            'notes' => 'Dekat kasir',
        ])->assertRedirect();

        $table = DineInTable::query()->where('table_number', 'VIP1')->firstOrFail();

        $this->assertStringContainsString('/menu?table=VIP1', $table->order_url);

        $this->actingAs($this->admin)->put(route('admin.tables.update', $table), [
            'capacity' => 10,
            'status' => 'kosong',
            'location_label' => 'VIP',
            'notes' => 'Sudah dibersihkan',
        ])->assertRedirect();

        $table->refresh();

        $this->assertSame(10, $table->capacity);
        $this->assertSame('kosong', $table->status);
        $this->assertNull($table->locked_at);
        $this->assertNull($table->locked_by_order_id);
    }

    public function test_admin_cannot_update_table_with_invalid_capacity(): void
    {
        $table = DineInTable::query()->firstOrFail();
        $oldCapacity = $table->capacity;

        $this->actingAs($this->admin)
            ->from(route('admin.tables.index'))
            ->put(route('admin.tables.update', $table), [
                'capacity' => 0,
                'status' => 'kosong',
                'location_label' => $table->location_label,
                'notes' => $table->notes,
            ])
            ->assertRedirect(route('admin.tables.index'))
            ->assertSessionHasErrors('capacity');

        $this->assertSame($oldCapacity, $table->fresh()->capacity);
    }

    public function test_admin_order_status_flow_marks_paid_arrived_preparing_and_completed(): void
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628166600002']);
        $menu = Menu::query()->firstOrFail();
        $table = DineInTable::query()->firstOrFail();
        $beforeStock = $menu->stock;

        $order = Order::create([
            'unique_code' => Order::generateCode($customer),
            'user_id' => $customer->id,
            'order_type' => 'dine_in',
            'dine_in_table_id' => $table->id,
            'subtotal' => 10000,
            'tax_rate' => 0.11,
            'tax_amount' => 1100,
            'total_price' => 11100,
            'payment_status' => 'unpaid',
            'status' => 'pending',
        ]);

        $order->items()->create([
            'menu_id' => $menu->id,
            'menu_name' => $menu->name,
            'qty' => 2,
            'price' => $menu->price,
            'subtotal' => 2 * (float) $menu->price,
        ]);

        $order->payments()->create([
            'transaction_id' => 'FLOW-'.$order->unique_code,
            'payment_method' => 'cash',
            'payment_type' => 'full',
            'amount' => $order->total_price,
            'status' => 'pending',
        ]);

        foreach (['paid', 'arrive', 'prepare', 'complete'] as $action) {
            $this->actingAs($this->admin)
                ->post(route('admin.orders.transition', [$order, $action]))
                ->assertRedirect();
        }

        $order->refresh();

        $this->assertSame('completed', $order->status);
        $this->assertSame('paid', $order->payment_status);
        $this->assertSame(max(0, $beforeStock - 2), $menu->fresh()->stock);
        $this->assertSame('kosong', $table->fresh()->status);
        $this->assertDatabaseHas('stock_logs', [
            'menu_id' => $menu->id,
            'change_type' => 'order_deduct',
            'reference_type' => Order::class,
            'reference_id' => $order->id,
        ]);
    }

    public function test_admin_order_transition_rejects_unknown_action(): void
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628166600009']);
        $order = Order::create([
            'unique_code' => Order::generateCode($customer),
            'user_id' => $customer->id,
            'order_type' => 'dine_in',
            'subtotal' => 10000,
            'tax_rate' => 0.11,
            'tax_amount' => 1100,
            'total_price' => 11100,
            'payment_status' => 'unpaid',
            'status' => 'pending',
        ]);

        $this->actingAs($this->admin)
            ->post(route('admin.orders.transition', [$order, 'selesai123']))
            ->assertNotFound();

        $this->assertSame('pending', $order->fresh()->status);
    }

    public function test_admin_can_cancel_order_and_release_table(): void
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628166600003']);
        $table = DineInTable::query()->firstOrFail();
        $order = Order::create([
            'unique_code' => Order::generateCode($customer),
            'user_id' => $customer->id,
            'order_type' => 'dine_in',
            'dine_in_table_id' => $table->id,
            'subtotal' => 10000,
            'tax_rate' => 0.11,
            'tax_amount' => 1100,
            'total_price' => 11100,
            'payment_status' => 'unpaid',
            'status' => 'pending',
        ]);

        $table->update(['status' => 'locked', 'locked_by_order_id' => $order->id]);

        $this->actingAs($this->admin)
            ->post(route('admin.orders.transition', [$order, 'cancel']), ['cancellation_reason' => 'Tidak jadi'])
            ->assertRedirect();

        $this->assertSame('cancelled', $order->fresh()->status);
        $this->assertSame('kosong', $table->fresh()->status);
    }

    public function test_admin_cannot_cancel_completed_order(): void
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628166600010']);
        $order = Order::create([
            'unique_code' => Order::generateCode($customer),
            'user_id' => $customer->id,
            'order_type' => 'dine_in',
            'subtotal' => 10000,
            'tax_rate' => 0.11,
            'tax_amount' => 1100,
            'total_price' => 11100,
            'payment_status' => 'paid',
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        $this->actingAs($this->admin)
            ->from(route('admin.orders.index'))
            ->post(route('admin.orders.transition', [$order, 'cancel']))
            ->assertRedirect(route('admin.orders.index'))
            ->assertSessionHasErrors('order');

        $this->assertSame('completed', $order->fresh()->status);
    }

    public function test_kitchen_display_shows_active_kitchen_orders(): void
    {
        $kitchen = User::query()->where('email', 'kitchen@rmkembar.test')->firstOrFail();
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628166600004']);
        Order::create([
            'unique_code' => Order::generateCode($customer),
            'user_id' => $customer->id,
            'order_type' => 'dine_in',
            'subtotal' => 10000,
            'tax_rate' => 0.11,
            'tax_amount' => 1100,
            'total_price' => 11100,
            'payment_status' => 'paid',
            'status' => 'preparing',
        ]);

        $this->actingAs($kitchen)->get(route('kitchen.index'))->assertOk();
    }

    public function test_admin_can_manage_users_settings_and_reports(): void
    {
        $this->actingAs($this->admin)->post(route('admin.users.store'), [
            'name' => 'Staff Baru',
            'email' => 'staff-baru@example.test',
            'phone' => '628166600005',
            'role' => 'kitchen',
            'address' => 'Dapur',
            'password' => 'password',
            'is_active' => true,
        ])->assertRedirect();

        $staff = User::query()->where('email', 'staff-baru@example.test')->firstOrFail();

        $this->actingAs($this->admin)->put(route('admin.users.update', $staff), [
            'name' => 'Staff Dapur',
            'email' => 'staff-baru@example.test',
            'phone' => '628166600005',
            'role' => 'admin',
            'address' => 'Kasir',
            'password' => '',
            'is_active' => false,
        ])->assertRedirect();

        $this->assertSame('admin', $staff->fresh()->role);
        $this->assertFalse($staff->fresh()->is_active);

        $this->actingAs($this->admin)->put(route('admin.settings.update'), [
            'settings' => [
                'tax_rate' => '0.10',
                'auto_cancel_minutes' => '45',
            ],
        ])->assertRedirect();

        $this->assertSame(0.10, Setting::valueFor('tax_rate'));
        $this->assertSame(45, Setting::valueFor('auto_cancel_minutes'));

        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628166600006']);
        Order::create([
            'unique_code' => Order::generateCode($customer),
            'user_id' => $customer->id,
            'order_type' => 'dine_in',
            'subtotal' => 10000,
            'tax_rate' => 0.10,
            'tax_amount' => 1000,
            'total_price' => 11000,
            'payment_status' => 'paid',
            'status' => 'completed',
        ]);

        $this->actingAs($this->admin)->get(route('admin.reports.index'))->assertOk();
        $this->actingAs($this->admin)->get(route('admin.reports.export'))->assertOk();

        $this->actingAs($this->admin)->delete(route('admin.users.destroy', $staff))->assertRedirect();
        $this->assertSoftDeleted('users', ['id' => $staff->id]);
    }

    public function test_admin_cannot_create_user_with_duplicate_email(): void
    {
        $existing = User::query()->where('email', 'admin@rmkembar.test')->firstOrFail();

        $this->actingAs($this->admin)
            ->from(route('admin.users.index'))
            ->post(route('admin.users.store'), [
                'name' => 'Duplikat Email',
                'email' => $existing->email,
                'phone' => '628166600007',
                'role' => 'customer',
                'address' => 'Jl. Duplikat',
                'password' => 'password',
                'is_active' => true,
            ])
            ->assertRedirect(route('admin.users.index'))
            ->assertSessionHasErrors('email');

        $this->assertDatabaseMissing('users', ['phone' => '628166600007']);
    }

    public function test_admin_settings_reject_negative_numeric_values(): void
    {
        $this->actingAs($this->admin)
            ->from(route('admin.settings.index'))
            ->put(route('admin.settings.update'), [
                'settings' => [
                    'tax_rate' => '-10',
                ],
            ])
            ->assertRedirect(route('admin.settings.index'))
            ->assertSessionHasErrors('settings.tax_rate');

        $this->assertSame(0.11, Setting::valueFor('tax_rate'));
    }

    public function test_admin_report_export_rejects_empty_date_range(): void
    {
        $this->actingAs($this->admin)
            ->from(route('admin.reports.index'))
            ->get(route('admin.reports.export', [
                'from' => now()->addYear()->toDateString(),
                'to' => now()->addYear()->addDay()->toDateString(),
            ]))
            ->assertRedirect(route('admin.reports.index'))
            ->assertSessionHasErrors('report');
    }

    public function test_admin_cannot_delete_their_own_account(): void
    {
        $this->actingAs($this->admin)
            ->delete(route('admin.users.destroy', $this->admin))
            ->assertSessionHasErrors('user');

        $this->assertNotSoftDeleted('users', ['id' => $this->admin->id]);
    }
}

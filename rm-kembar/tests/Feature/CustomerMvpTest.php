<?php

namespace Tests\Feature;

use App\Models\DineInTable;
use App\Models\Menu;
use App\Models\MenuCategory;
use App\Models\Order;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class CustomerMvpTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    public function test_customer_public_pages_are_available(): void
    {
        $this->get(route('home'))->assertOk();
        $this->get(route('menu.index'))->assertOk();
        $this->get(route('reservations.create'))->assertOk();
        $this->get(route('login'))->assertOk();
        $this->get(route('register'))->assertOk();
    }

    public function test_guest_can_add_and_remove_menu_items_from_cart(): void
    {
        $menu = Menu::query()->firstOrFail();
        $table = DineInTable::query()->firstOrFail();

        $this->post(route('cart.add'), [
            'menu_id' => $menu->id,
            'qty' => 2,
            'notes' => 'Sambal dipisah',
            'table_id' => $table->id,
        ])
            ->assertRedirect()
            ->assertSessionHas("cart.{$menu->id}.qty", 2)
            ->assertSessionHas('selected_table_id', $table->id);

        $this->delete(route('cart.remove', $menu))
            ->assertRedirect()
            ->assertSessionMissing("cart.{$menu->id}");
    }

    public function test_menu_can_be_filtered_by_category(): void
    {
        $menu = Menu::query()->whereNotNull('category_id')->firstOrFail();
        $category = MenuCategory::query()->findOrFail($menu->category_id);
        $expectedCount = Menu::query()->where('category_id', $category->id)->count();

        $this->get(route('menu.index', ['category' => $category->slug]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Customer/Menu')
                ->where('filters.category', $category->slug)
                ->has('menus', $expectedCount)
            );
    }

    public function test_menu_filter_with_unknown_category_returns_no_menu_results(): void
    {
        $this->get(route('menu.index', ['category' => 'kategori-tidak-ada']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Customer/Menu')
                ->where('filters.category', 'kategori-tidak-ada')
                ->has('menus', 0)
            );
    }

    public function test_cart_rejects_invalid_quantity(): void
    {
        $menu = Menu::query()->firstOrFail();

        $this->from(route('menu.index'))->post(route('cart.add'), [
            'menu_id' => $menu->id,
            'qty' => 0,
        ])
            ->assertRedirect(route('menu.index'))
            ->assertSessionHasErrors('qty');

        $this->assertArrayNotHasKey((string) $menu->id, session('cart', []));
    }

    public function test_checkout_creates_order_payment_items_and_locks_selected_table(): void
    {
        \Illuminate\Support\Facades\Http::fake();

        $menu = Menu::query()->firstOrFail();
        $table = DineInTable::query()->firstOrFail();

        $cart = [
            (string) $menu->id => [
                'menu_id' => $menu->id,
                'name' => $menu->name,
                'price' => (float) $menu->price,
                'qty' => 2,
                'notes' => 'Tanpa lalapan',
            ],
        ];

        $this->withSession([
            'cart' => $cart,
            'selected_table_id' => $table->id,
        ])->post(route('checkout.store'), [
            'name' => 'Budi',
            'phone' => '628155500001',
            'email' => 'budi@example.test',
            'payment_method' => 'cash',
            'notes' => 'Datang 10 menit lagi',
        ])->assertRedirect();

        $order = Order::query()->with(['items', 'payments'])->firstOrFail();

        $this->assertSame('pending', $order->status);
        $this->assertSame('unpaid', $order->payment_status);
        $this->assertSame($table->id, $order->dine_in_table_id);
        $this->assertCount(1, $order->items);
        $this->assertCount(1, $order->payments);
        $this->assertSame('locked', $table->fresh()->status);
        $this->assertSame($order->id, $table->fresh()->locked_by_order_id);
        $this->assertDatabaseHas('users', ['phone' => '628155500001', 'role' => 'customer']);
    }

    public function test_order_confirmation_page_opens_with_valid_code(): void
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628155500004']);
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

        $this->get(route('orders.confirm', $order->unique_code))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Orders/Confirm')
                ->where('order.unique_code', $order->unique_code)
            );
    }

    public function test_order_confirmation_page_rejects_unknown_code(): void
    {
        $this->get(route('orders.confirm', 'RMK-TIDAK-ADA'))->assertNotFound();
    }

    public function test_checkout_rejects_empty_cart(): void
    {
        $this->get(route('checkout.show'))
            ->assertRedirect(route('menu.index'))
            ->assertSessionHasErrors('cart');
    }

    public function test_guest_can_create_reservation_with_auto_cancel_time(): void
    {
        $this->post(route('reservations.store'), [
            'name' => 'Sari',
            'phone' => '628155500002',
            'reserved_date' => now()->addDay()->toDateString(),
            'reserved_time' => '18:30',
            'guest_count' => 4,
            'notes' => 'Dekat jendela',
        ])->assertRedirect(route('reservations.create'));

        $reservation = Reservation::query()->firstOrFail();

        $this->assertSame('pending', $reservation->status);
        $this->assertSame(4, $reservation->guest_count);
        $this->assertNotNull($reservation->auto_cancel_at);
        $this->assertDatabaseHas('users', ['phone' => '628155500002', 'role' => 'customer']);
    }

    public function test_reservation_rejects_past_dates(): void
    {
        $this->from(route('reservations.create'))->post(route('reservations.store'), [
            'name' => 'Dina',
            'phone' => '628155500005',
            'reserved_date' => now()->subDay()->toDateString(),
            'reserved_time' => '18:30',
            'guest_count' => 4,
        ])
            ->assertRedirect(route('reservations.create'))
            ->assertSessionHasErrors('reserved_date');

        $this->assertDatabaseMissing('users', ['phone' => '628155500005']);
        $this->assertDatabaseCount('reservations', 0);
    }

    public function test_customer_auth_and_history_workflow(): void
    {
        $this->post(route('register.store'), [
            'name' => 'Customer Baru',
            'email' => 'customer-baru@example.test',
            'phone' => '628155500003',
            'address' => 'Jl. Testing',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertRedirect(route('home'));

        $this->assertAuthenticated();

        $customer = User::query()->where('email', 'customer-baru@example.test')->firstOrFail();
        Order::create([
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

        $this->actingAs($customer)->get(route('account.history'))->assertOk();
    }

    public function test_registration_rejects_invalid_email_format(): void
    {
        $this->from(route('register'))->post(route('register.store'), [
            'name' => 'Email Salah',
            'email' => 'usergmail.com',
            'phone' => '628155500006',
            'address' => 'Jl. Testing',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])
            ->assertRedirect(route('register'))
            ->assertSessionHasErrors('email');

        $this->assertGuest();
        $this->assertDatabaseMissing('users', ['phone' => '628155500006']);
    }
}

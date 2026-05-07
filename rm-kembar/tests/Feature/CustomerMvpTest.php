<?php

namespace Tests\Feature;

use App\Models\DineInTable;
use App\Models\Menu;
use App\Models\Order;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
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

    public function test_checkout_creates_order_payment_items_and_locks_selected_table(): void
    {
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
}

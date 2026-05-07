<?php

namespace Tests\Feature;

use App\Models\DineInTable;
use App\Models\Order;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MvpOperationsTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    public function test_expire_pending_command_cancels_stale_reservations_and_unpaid_orders(): void
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '6281999999999']);
        $table = DineInTable::query()->first();

        $reservation = Reservation::create([
            'unique_code' => Reservation::generateCode(),
            'user_id' => $customer->id,
            'reserved_date' => today(),
            'reserved_time' => now()->format('H:i'),
            'guest_count' => 2,
            'status' => 'pending',
            'auto_cancel_at' => now()->subMinute(),
        ]);

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

        $order->payments()->create([
            'transaction_id' => 'TEST-'.$order->unique_code,
            'payment_method' => 'cash',
            'payment_type' => 'full',
            'amount' => $order->total_price,
            'status' => 'pending',
            'expired_at' => now()->subMinute(),
        ]);

        $table->update([
            'status' => 'locked',
            'locked_at' => now(),
            'locked_by_order_id' => $order->id,
        ]);

        $this->artisan('rmkembar:expire-pending')->assertSuccessful();

        $this->assertSame('auto_cancelled', $reservation->fresh()->status);
        $this->assertSame('cancelled', $order->fresh()->status);
        $this->assertSame('expired', $order->payments()->first()->status);
        $this->assertSame('kosong', $table->fresh()->status);
    }

    public function test_customer_can_cancel_own_unpaid_pending_order(): void
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '6281888888888']);
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

        $this->actingAs($customer)
            ->post(route('account.orders.cancel', $order))
            ->assertRedirect();

        $this->assertSame('cancelled', $order->fresh()->status);
    }

    public function test_admin_can_open_new_operations_pages(): void
    {
        $admin = User::query()->where('email', 'admin@rmkembar.test')->firstOrFail();

        $this->actingAs($admin)->get(route('admin.users.index'))->assertOk();
        $this->actingAs($admin)->get(route('admin.settings.index'))->assertOk();
        $this->actingAs($admin)->get(route('admin.reports.index'))->assertOk();
    }
}

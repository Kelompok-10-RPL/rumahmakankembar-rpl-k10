<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MidtransCallbackTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    private function createOrderWithPayment(): array
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628155500008']);
        
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

        $payment = $order->payments()->create([
            'amount' => 11100,
            'payment_method' => 'midtrans',
            'status' => 'pending',
            'transaction_id' => 'TRX-' . $order->unique_code,
        ]);

        return [$order, $payment];
    }

    public function test_midtrans_callback_capture_updates_order_and_payment_status(): void
    {
        [$order, $payment] = $this->createOrderWithPayment();

        $response = $this->postJson('/payment/midtrans-callback', [
            'order_id' => $order->unique_code,
            'transaction_status' => 'capture',
        ]);

        $response->assertOk()->assertJson(['message' => 'Success']);
        
        $this->assertEquals('paid', $order->fresh()->payment_status);
        $this->assertEquals('paid', $payment->fresh()->status);
    }

    public function test_midtrans_callback_settlement_updates_order_and_payment_status(): void
    {
        [$order, $payment] = $this->createOrderWithPayment();

        $response = $this->postJson('/payment/midtrans-callback', [
            'order_id' => $order->unique_code,
            'transaction_status' => 'settlement',
        ]);

        $response->assertOk()->assertJson(['message' => 'Success']);
        
        $this->assertEquals('paid', $order->fresh()->payment_status);
        $this->assertEquals('paid', $payment->fresh()->status);
    }

    public function test_midtrans_callback_cancel_updates_order_and_payment_status(): void
    {
        [$order, $payment] = $this->createOrderWithPayment();

        $response = $this->postJson('/payment/midtrans-callback', [
            'order_id' => $order->unique_code,
            'transaction_status' => 'cancel',
        ]);

        $response->assertOk()->assertJson(['message' => 'Success']);
        
        $this->assertEquals('failed', $order->fresh()->payment_status);
        $this->assertEquals('cancelled', $order->fresh()->status);
        $this->assertEquals('failed', $payment->fresh()->status);
    }

    public function test_midtrans_callback_pending_updates_payment_status(): void
    {
        [$order, $payment] = $this->createOrderWithPayment();

        $response = $this->postJson('/payment/midtrans-callback', [
            'order_id' => $order->unique_code,
            'transaction_status' => 'pending',
        ]);

        $response->assertOk()->assertJson(['message' => 'Success']);
        
        $this->assertEquals('unpaid', $order->fresh()->payment_status); // Only payment is updated to pending
        $this->assertEquals('pending', $payment->fresh()->status);
    }

    public function test_midtrans_callback_not_found_returns_404(): void
    {
        $response = $this->postJson('/payment/midtrans-callback', [
            'order_id' => 'INVALID-ORDER-ID',
            'transaction_status' => 'capture',
        ]);

        $response->assertNotFound()->assertJson(['message' => 'Order not found']);
    }
}

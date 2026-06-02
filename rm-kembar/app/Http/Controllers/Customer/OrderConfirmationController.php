<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderConfirmationController extends Controller
{
    public function __invoke(Request $request, string $code): Response
    {
        $order = Order::query()
            ->with(['items', 'table', 'payments', 'rating'])
            ->where('unique_code', $code)
            ->firstOrFail();

        // Midtrans redirects back with ?transaction_status=settlement&status_code=200
        // Sync payment status immediately so the page shows correct state
        // even if the server-side webhook hasn't arrived yet.
        $transactionStatus = $request->query('transaction_status');
        if (in_array($transactionStatus, ['settlement', 'capture']) && $order->payment_status !== 'paid') {
            $order->update([
                'payment_status' => 'paid',
                'status' => 'paid_waiting'
            ]);
            $order->payments()->latest()->first()?->update(['status' => 'paid']);
            event(new \App\Events\KitchenOrderUpdated($order));
            
            if ($order->user && $order->user->phone) {
                $message = "Pembayaran untuk pesanan *{$order->unique_code}* berhasil diterima.\nStatus pesanan sekarang sedang disiapkan di dapur.";
                dispatch(function () use ($order, $message) {
                    \App\Services\WhatsAppService::sendMessage($order->user->phone, $message);
                })->afterResponse();
            }

            $order->refresh();
        }

        return Inertia::render('Orders/Confirm', [
            'order' => $order,
        ]);
    }
}

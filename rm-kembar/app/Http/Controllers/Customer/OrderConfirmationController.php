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
            ->with(['items', 'table', 'payments'])
            ->where('unique_code', $code)
            ->firstOrFail();

        // Midtrans redirects back with ?transaction_status=settlement&status_code=200
        // Sync payment status immediately so the page shows correct state
        // even if the server-side webhook hasn't arrived yet.
        $transactionStatus = $request->query('transaction_status');
        if (in_array($transactionStatus, ['settlement', 'capture']) && $order->payment_status !== 'paid') {
            $order->update(['payment_status' => 'paid']);
            $order->payments()->latest()->first()?->update(['status' => 'paid']);
            $order->refresh();
        }

        return Inertia::render('Orders/Confirm', [
            'order' => $order,
        ]);
    }
}

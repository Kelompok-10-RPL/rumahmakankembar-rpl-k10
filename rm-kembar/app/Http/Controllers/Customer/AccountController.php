<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function history(Request $request): Response
    {
        $orders = Order::query()
            ->with(['items', 'table', 'payments', 'rating'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('Customer/History', compact('orders'));
    }

    public function cancelOrder(Request $request, Order $order): RedirectResponse
    {
        abort_if($order->user_id !== $request->user()->id, 403);

        if ($order->status !== 'pending' || $order->payment_status === 'paid') {
            return back()->withErrors(['order' => 'Pesanan ini sudah tidak bisa dibatalkan.']);
        }

        DB::transaction(function () use ($order) {
            $order->update([
                'status' => 'cancelled',
                'cancelled_at' => now(),
                'cancellation_reason' => 'Dibatalkan pelanggan',
            ]);

            $order->payments()
                ->where('status', 'pending')
                ->update(['status' => 'failed']);

            $order->table?->update([
                'status' => 'kosong',
                'locked_at' => null,
                'locked_by_order_id' => null,
            ]);
        });

        return back()->with('status', 'Pesanan dibatalkan.');
    }
}

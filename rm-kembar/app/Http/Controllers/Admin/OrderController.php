<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\StockLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        $orders = Order::query()
            ->with(['user', 'table', 'items', 'payments'])
            ->when($request->query('status'), fn ($query, $status) => $query->where('status', $status))
            ->when($request->query('q'), function ($query, $q) {
                $query->where(function ($query) use ($q) {
                    $query->where('unique_code', 'like', "%{$q}%")
                        ->orWhereHas('user', fn ($userQuery) => $userQuery->where('name', 'like', "%{$q}%")->orWhere('phone', 'like', "%{$q}%"));
                });
            })
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
            'filters' => $request->only('status', 'q'),
        ]);
    }

    public function transition(Request $request, Order $order, string $action): RedirectResponse
    {
        DB::transaction(function () use ($request, $order, $action) {
            $order->refresh();

            match ($action) {
                'paid' => $this->markPaid($order),
                'arrive' => $this->markArrived($order),
                'prepare' => $this->markPreparing($order),
                'complete' => $this->complete($request, $order),
                'cancel' => $this->cancel($request, $order),
                default => abort(404),
            };
        });

        return back()->with('status', 'Status pesanan diperbarui.');
    }

    private function markPaid(Order $order): void
    {
        $order->payments()->latest()->first()?->update(['status' => 'success', 'paid_at' => now()]);
        $order->update(['payment_status' => 'paid', 'status' => 'paid_waiting']);
    }

    private function markArrived(Order $order): void
    {
        $order->update(['status' => 'on_site', 'arrived_at' => now()]);
        $order->table?->update(['status' => 'terisi']);
    }

    private function markPreparing(Order $order): void
    {
        $order->update(['status' => 'preparing', 'preparing_at' => now()]);
    }

    private function complete(Request $request, Order $order): void
    {
        if ($order->status !== 'completed') {
            foreach ($order->items()->with('menu')->get() as $item) {
                if (! $item->menu) {
                    continue;
                }

                $before = $item->menu->stock;
                $after = max(0, $before - $item->qty);
                $item->menu->update(['stock' => $after]);

                StockLog::create([
                    'menu_id' => $item->menu->id,
                    'changed_by' => $request->user()->id,
                    'change_type' => 'order_deduct',
                    'qty_before' => $before,
                    'qty_change' => -$item->qty,
                    'qty_after' => $after,
                    'reason' => 'Pesanan selesai',
                    'reference_type' => Order::class,
                    'reference_id' => $order->id,
                    'created_at' => now(),
                ]);
            }
        }

        $order->update(['status' => 'completed', 'completed_at' => now()]);
        $this->releaseTable($order);
    }

    private function cancel(Request $request, Order $order): void
    {
        $order->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
            'cancellation_reason' => $request->input('cancellation_reason', 'Dibatalkan admin'),
        ]);

        $this->releaseTable($order);
    }

    private function releaseTable(Order $order): void
    {
        $order->table?->update([
            'status' => 'kosong',
            'locked_at' => null,
            'locked_by_order_id' => null,
        ]);
    }
}

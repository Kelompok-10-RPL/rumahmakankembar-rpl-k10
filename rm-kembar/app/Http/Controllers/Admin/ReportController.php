<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Exports\SalesExport;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {
        [$from, $to] = $this->dateRange($request);

        $paidOrders = Order::query()
            ->where('payment_status', 'paid')
            ->whereBetween('created_at', [$from, $to]);

        return Inertia::render('Admin/Reports', [
            'filters' => [
                'from' => $from->toDateString(),
                'to' => $to->toDateString(),
            ],
            'summary' => [
                'orders' => (clone $paidOrders)->count(),
                'revenue' => (clone $paidOrders)->sum('total_price'),
                'averageOrderValue' => (clone $paidOrders)->avg('total_price') ?? 0,
            ],
            'dailyRevenue' => $this->dailyRevenue($from, $to),
            'categoryRevenue' => $this->categoryRevenue($from, $to),
        ]);
    }

    public function export(Request $request)
    {
        [$from, $to] = $this->dateRange($request);
        $type = $request->query('type', 'csv');

        $orders = Order::query()
            ->with(['user', 'table'])
            ->whereBetween('created_at', [$from, $to])
            ->latest()
            ->get();

        if ($orders->isEmpty()) {
            return back()->withErrors(['report' => 'Data tidak tersedia.']);
        }

        $filename = "laporan-rm-kembar-{$from->toDateString()}-{$to->toDateString()}";

        if ($type === 'excel') {
            return Excel::download(new SalesExport($from, $to), $filename . '.xlsx');
        } elseif ($type === 'pdf') {
            $pdf = Pdf::loadView('reports.sales', [
                'orders' => $orders,
                'from' => $from,
                'to' => $to,
                'total_revenue' => collect($orders)->where('payment_status', 'paid')->sum('total_price'),
            ]);
            return $pdf->download($filename . '.pdf');
        }

        // Fallback to basic CSV if no type provided
        return response()->streamDownload(function () use ($orders) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Kode', 'Tanggal', 'Customer', 'Meja', 'Status', 'Pembayaran', 'Subtotal', 'PPN', 'Total']);

            foreach ($orders as $order) {
                fputcsv($handle, [
                    $order->unique_code,
                    $order->created_at->format('Y-m-d H:i:s'),
                    $order->user?->name,
                    $order->table?->table_number,
                    $order->status,
                    $order->payment_status,
                    $order->subtotal,
                    $order->tax_amount,
                    $order->total_price,
                ]);
            }

            fclose($handle);
        }, $filename . '.csv', ['Content-Type' => 'text/csv']);
    }

    private function dateRange(Request $request): array
    {
        $from = $request->date('from')?->startOfDay() ?? now()->startOfMonth();
        $to = $request->date('to')?->endOfDay() ?? now()->endOfDay();

        if ($to->lessThan($from)) {
            [$from, $to] = [$to->copy()->startOfDay(), $from->copy()->endOfDay()];
        }

        return [$from, $to];
    }

    private function dailyRevenue(Carbon $from, Carbon $to): array
    {
        return Order::query()
            ->selectRaw('DATE(created_at) as date, COUNT(*) as orders, SUM(total_price) as revenue')
            ->where('payment_status', 'paid')
            ->whereBetween('created_at', [$from, $to])
            ->groupByRaw('DATE(created_at)')
            ->orderBy('date')
            ->get()
            ->toArray();
    }

    private function categoryRevenue(Carbon $from, Carbon $to): array
    {
        return DB::table('order_items')
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->leftJoin('menus', 'menus.id', '=', 'order_items.menu_id')
            ->leftJoin('menu_categories', 'menu_categories.id', '=', 'menus.category_id')
            ->where('orders.payment_status', 'paid')
            ->whereBetween('orders.created_at', [$from, $to])
            ->groupBy('menu_categories.name')
            ->orderByDesc(DB::raw('SUM(order_items.subtotal)'))
            ->get([
                DB::raw("COALESCE(menu_categories.name, 'Tanpa kategori') as category"),
                DB::raw('SUM(order_items.qty) as qty'),
                DB::raw('SUM(order_items.subtotal) as revenue'),
            ])
            ->toArray();
    }
}

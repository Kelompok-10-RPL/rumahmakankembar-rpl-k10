<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DineInTable;
use App\Models\Menu;
use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'ordersToday' => Order::query()->whereDate('created_at', today())->count(),
            'revenueToday' => Order::query()->whereDate('created_at', today())->where('payment_status', 'paid')->sum('total_price'),
            'activeOrders' => Order::query()->whereNotIn('status', ['completed', 'cancelled'])->count(),
            'occupiedTables' => DineInTable::query()->whereIn('status', ['terisi', 'locked'])->count(),
            'lowStockMenus' => Menu::query()->whereColumn('stock', '<=', 'low_stock_threshold')->orWhere('stock', '<=', 5)->orderBy('stock')->take(8)->get(),
            'recentOrders' => Order::query()->with(['user', 'table'])->latest()->take(8)->get(),
        ]);
    }
}

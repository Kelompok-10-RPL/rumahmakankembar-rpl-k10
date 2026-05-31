# Codebase Dump - RM Kembar

Generated: 2026-06-01 05:22:06
Total Files: 118

---

## Daftar File

1. app\Events\KitchenOrderUpdated.php
2. app\Exports\SalesExport.php
3. app\Http\Controllers\Admin\CategoryController.php
4. app\Http\Controllers\Admin\DashboardController.php
5. app\Http\Controllers\Admin\MenuController.php
6. app\Http\Controllers\Admin\OrderController.php
7. app\Http\Controllers\Admin\ReportController.php
8. app\Http\Controllers\Admin\ReservationController.php
9. app\Http\Controllers\Admin\SettingController.php
10. app\Http\Controllers\Admin\TableController.php
11. app\Http\Controllers\Admin\UserController.php
12. app\Http\Controllers\Auth\LoginController.php
13. app\Http\Controllers\Auth\RegisterController.php
14. app\Http\Controllers\Controller.php
15. app\Http\Controllers\Customer\AccountController.php
16. app\Http\Controllers\Customer\CateringController.php
17. app\Http\Controllers\Customer\CheckoutController.php
18. app\Http\Controllers\Customer\HomeController.php
19. app\Http\Controllers\Customer\MenuController.php
20. app\Http\Controllers\Customer\OrderConfirmationController.php
21. app\Http\Controllers\Customer\RatingController.php
22. app\Http\Controllers\Customer\ReservationController.php
23. app\Http\Controllers\DebugController.php
24. app\Http\Controllers\Info\AboutController.php
25. app\Http\Controllers\KitchenController.php
26. app\Http\Controllers\PaymentCallbackController.php
27. app\Http\Middleware\EnsureRole.php
28. app\Http\Middleware\HandleInertiaRequests.php
29. app\Models\Catering.php
30. app\Models\CateringItem.php
31. app\Models\DineInTable.php
32. app\Models\Menu.php
33. app\Models\MenuCategory.php
34. app\Models\Order.php
35. app\Models\OrderItem.php
36. app\Models\Payment.php
37. app\Models\Rating.php
38. app\Models\Reservation.php
39. app\Models\Setting.php
40. app\Models\StockLog.php
41. app\Models\User.php
42. app\Providers\AppServiceProvider.php
43. app\Services\WhatsAppService.php
44. bootstrap\app.php
45. bootstrap\providers.php
46. config\app.php
47. config\auth.php
48. config\broadcasting.php
49. config\cache.php
50. config\database.php
51. config\filesystems.php
52. config\logging.php
53. config\mail.php
54. config\queue.php
55. config\services.php
56. config\session.php
57. database\factories\UserFactory.php
58. database\migrations\0001_01_01_000000_create_users_table.php
59. database\migrations\0001_01_01_000001_create_cache_table.php
60. database\migrations\0001_01_01_000002_create_jobs_table.php
61. database\migrations\2026_02_10_073159_create_customers_table.php
62. database\migrations\2026_02_10_073606_create_menus_table.php
63. database\migrations\2026_02_10_073748_create_dine_in_tables_table.php
64. database\migrations\2026_02_10_073900_create_orders_table.php
65. database\migrations\2026_02_10_074008_create_order_items_table.php
66. database\migrations\2026_02_10_074056_create_caterings_table.php
67. database\migrations\2026_02_10_074151_create_catering_items_table.php
68. database\migrations\2026_02_10_074200_create_mvp_operations_tables.php
69. database\seeders\DatabaseSeeder.php
70. public\index.php
71. resources\css\app.css
72. resources\js\app.js
73. resources\js\bootstrap.js
74. resources\js\Components\navbar.jsx
75. resources\js\echo.js
76. resources\js\Layouts\AdminLayout.jsx
77. resources\js\Layouts\AppLayout.jsx
78. resources\js\Layouts\footer.jsx
79. resources\js\Pages\Admin\Categories.jsx
80. resources\js\Pages\Admin\Dashboard.jsx
81. resources\js\Pages\Admin\Menu.jsx
82. resources\js\Pages\Admin\Orders.jsx
83. resources\js\Pages\Admin\Reports.jsx
84. resources\js\Pages\Admin\Reservations.jsx
85. resources\js\Pages\Admin\Settings.jsx
86. resources\js\Pages\Admin\Tables.jsx
87. resources\js\Pages\Admin\Users.jsx
88. resources\js\Pages\Auth\Login.jsx
89. resources\js\Pages\Auth\Register.jsx
90. resources\js\Pages\Catering\Catering.jsx
91. resources\js\Pages\Customer\Checkout.jsx
92. resources\js\Pages\Customer\History.jsx
93. resources\js\Pages\Customer\Menu.jsx
94. resources\js\Pages\Debug.jsx
95. resources\js\Pages\Home.jsx
96. resources\js\Pages\Info\AboutUs.jsx
97. resources\js\Pages\Info\Location.jsx
98. resources\js\Pages\Kitchen\Index.jsx
99. resources\js\Pages\Orders\Confirm.jsx
100. resources\js\Pages\Reservations\Create.jsx
101. resources\views\app.blade.php
102. resources\views\reports\sales.blade.php
103. resources\views\welcome.blade.php
104. routes\channels.php
105. routes\console.php
106. routes\web.php
107. tests\Feature\AccessControlTest.php
108. tests\Feature\AdminMvpTest.php
109. tests\Feature\CateringTest.php
110. tests\Feature\CustomerMvpTest.php
111. tests\Feature\ExampleTest.php
112. tests\Feature\MidtransCallbackTest.php
113. tests\Feature\MvpOperationsTest.php
114. tests\Feature\ReportExportTest.php
115. tests\Feature\WhatsAppServiceTest.php
116. tests\TestCase.php
117. tests\Unit\ExampleTest.php
118. vite.config.js

---

## app\Events\KitchenOrderUpdated.php

```php
<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class KitchenOrderUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $order;

    /**
     * Create a new event instance.
     */
    public function __construct($order)
    {
        $this->order = $order;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('kitchen.orders'),
        ];
    }
    
    /**
     * Get the data to broadcast.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'id' => $this->order->id,
            'status' => $this->order->status,
        ];
    }
}
```

---

## app\Exports\SalesExport.php

```php
<?php

namespace App\Exports;

use App\Models\Order;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class SalesExport implements FromCollection, WithHeadings, WithMapping
{
    protected $from;
    protected $to;

    public function __construct(Carbon $from, Carbon $to)
    {
        $this->from = $from;
        $this->to = $to;
    }

    public function collection()
    {
        return Order::query()
            ->with(['user', 'table'])
            ->whereBetween('created_at', [$this->from, $this->to])
            ->latest()
            ->get();
    }

    public function headings(): array
    {
        return [
            'Kode',
            'Tanggal',
            'Customer',
            'Meja',
            'Status',
            'Pembayaran',
            'Subtotal',
            'PPN',
            'Total',
        ];
    }

    public function map($order): array
    {
        return [
            $order->unique_code,
            $order->created_at->format('Y-m-d H:i:s'),
            $order->user?->name,
            $order->table?->table_number,
            $order->status,
            $order->payment_status,
            $order->subtotal,
            $order->tax_amount,
            $order->total_price,
        ];
    }
}
```

---

## app\Http\Controllers\Admin\CategoryController.php

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Categories', [
            'categories' => MenuCategory::query()->orderBy('sort_order')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:150', 'unique:menu_categories,name'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $data['slug'] = Str::slug($data['name']);

        MenuCategory::create($data);

        return back()->with('status', 'Kategori berhasil ditambahkan.');
    }

    public function update(Request $request, MenuCategory $category): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:150', 'unique:menu_categories,name,' . $category->id],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $data['slug'] = Str::slug($data['name']);

        $category->update($data);

        return back()->with('status', 'Kategori berhasil diperbarui.');
    }

    public function destroy(MenuCategory $category): RedirectResponse
    {
        // Check if there are menus attached before deleting
        if ($category->menus()->exists()) {
            return back()->withErrors(['message' => 'Tidak dapat menghapus kategori karena masih memiliki menu.']);
        }

        $category->delete();

        return back()->with('status', 'Kategori dihapus.');
    }
}
```

---

## app\Http\Controllers\Admin\DashboardController.php

```php
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
```

---

## app\Http\Controllers\Admin\MenuController.php

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuCategory;
use App\Models\StockLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Menu', [
            'menus' => Menu::query()->with('category')->orderBy('sort_order')->orderBy('name')->get(),
            'categories' => MenuCategory::query()->orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['slug'] = Str::slug($data['name']);
        $data['is_available'] = $request->boolean('is_available');
        $data['is_for_dine_in'] = $request->boolean('is_for_dine_in', true);
        $data['is_for_catering'] = $request->boolean('is_for_catering', true);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('menus', 'public');
            $data['image'] = '/storage/' . $path;
        }

        Menu::create($data);

        return back()->with('status', 'Menu berhasil ditambahkan.');
    }

    public function update(Request $request, Menu $menu): RedirectResponse
    {
        $oldStock = $menu->stock;
        $data = $this->validated($request, $menu->id);
        $data['slug'] = Str::slug($data['name']);
        $data['is_available'] = $request->boolean('is_available');
        $data['is_for_dine_in'] = $request->boolean('is_for_dine_in', true);
        $data['is_for_catering'] = $request->boolean('is_for_catering', true);

        if ($request->hasFile('image')) {
            if ($menu->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $menu->image));
            }
            $path = $request->file('image')->store('menus', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $menu->update($data);

        if ((int) $data['stock'] !== (int) $oldStock) {
            StockLog::create([
                'menu_id' => $menu->id,
                'changed_by' => $request->user()->id,
                'change_type' => 'manual_update',
                'qty_before' => $oldStock,
                'qty_change' => (int) $data['stock'] - (int) $oldStock,
                'qty_after' => (int) $data['stock'],
                'reason' => 'Update dari admin menu',
                'created_at' => now(),
            ]);
        }

        return back()->with('status', 'Menu berhasil diperbarui.');
    }

    public function destroy(Menu $menu): RedirectResponse
    {
        if ($menu->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $menu->image));
        }
        $menu->delete();

        return back()->with('status', 'Menu dihapus.');
    }

    private function validated(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'category_id' => ['required', 'exists:menu_categories,id'],
            'name' => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'low_stock_threshold' => ['nullable', 'integer', 'min:0'],
            'sort_order' => ['nullable', 'integer'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);
    }
}
```

---

## app\Http\Controllers\Admin\OrderController.php

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\StockLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
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
        if ($action === 'cancel' && $order->status === 'completed') {
            throw ValidationException::withMessages([
                'order' => 'Pesanan yang sudah selesai tidak bisa dibatalkan.',
            ]);
        }

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

        event(new \App\Events\KitchenOrderUpdated($order));

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
```

---

## app\Http\Controllers\Admin\ReportController.php

```php
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
```

---

## app\Http\Controllers\Admin\ReservationController.php

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\DineInTable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    public function index(): Response
    {
        $reservations = Reservation::with(['user', 'table'])
            ->orderByRaw("CASE WHEN status = 'pending' THEN 1 WHEN status = 'confirmed' THEN 2 ELSE 3 END")
            ->orderBy('reserved_date', 'asc')
            ->orderBy('reserved_time', 'asc')
            ->get();
            
        $tables = DineInTable::whereIn('status', ['kosong', 'reserved'])->get();

        return Inertia::render('Admin/Reservations', [
            'reservations' => $reservations,
            'tables' => $tables,
        ]);
    }

    public function update(Request $request, Reservation $reservation): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'in:pending,confirmed,cancelled,completed'],
            'table_id' => ['nullable', 'exists:dine_in_tables,id'],
        ]);

        if ($data['status'] === 'confirmed' && $data['table_id']) {
            $table = DineInTable::find($data['table_id']);
            if ($table && $table->status === 'kosong') {
                $table->update(['status' => 'reserved']);
            }
        }
        
        if (in_array($data['status'], ['cancelled', 'completed']) && $reservation->table_id) {
            $table = DineInTable::find($reservation->table_id);
            if ($table) {
                $table->update(['status' => 'kosong']);
            }
        }

        $reservation->update($data);

        return back()->with('status', 'Status reservasi berhasil diperbarui.');
    }
}
```

---

## app\Http\Controllers\Admin\SettingController.php

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Settings', [
            'settings' => Setting::query()
                ->orderBy('group')
                ->orderBy('label')
                ->get()
                ->groupBy('group')
                ->toArray(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $values = $request->validate([
            'settings' => ['required', 'array'],
            'settings.*' => ['nullable', 'string', 'max:255'],
        ])['settings'];

        $settings = Setting::query()->whereIn('key', array_keys($values))->get();

        foreach ($settings as $setting) {
            $value = $values[$setting->key] ?? null;
            $this->validateValue($setting, $value);
            $setting->update(['value' => (string) $value]);
        }

        return back()->with('status', 'Pengaturan diperbarui.');
    }

    private function validateValue(Setting $setting, mixed $value): void
    {
        $isValid = match ($setting->type) {
            'integer' => filter_var($value, FILTER_VALIDATE_INT) !== false,
            'float' => filter_var($value, FILTER_VALIDATE_FLOAT) !== false,
            'boolean' => in_array($value, ['0', '1', 'true', 'false'], true),
            default => filled($value),
        };

        if ($isValid && in_array($setting->type, ['integer', 'float'], true) && (float) $value < 0) {
            $isValid = false;
        }

        if (! $isValid) {
            throw ValidationException::withMessages([
                "settings.{$setting->key}" => "{$setting->label} tidak valid.",
            ]);
        }
    }
}
```

---

## app\Http\Controllers\Admin\TableController.php

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DineInTable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TableController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Tables', [
            'tables' => DineInTable::query()->orderBy('table_number')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'table_number' => ['required', 'string', 'max:10', 'unique:dine_in_tables,table_number'],
            'capacity' => ['required', 'integer', 'min:1'],
            'location_label' => ['nullable', 'string', 'max:100'],
            'notes' => ['nullable', 'string', 'max:255'],
        ]);

        DineInTable::create($data + ['status' => 'kosong']);

        return back()->with('status', 'Meja ditambahkan.');
    }

    public function update(Request $request, DineInTable $table): RedirectResponse
    {
        $data = $request->validate([
            'capacity' => ['required', 'integer', 'min:1'],
            'status' => ['required', 'string', 'max:20'],
            'location_label' => ['nullable', 'string', 'max:100'],
            'notes' => ['nullable', 'string', 'max:255'],
        ]);

        if ($data['status'] === 'kosong') {
            $data['locked_at'] = null;
            $data['locked_by_order_id'] = null;
        }

        $table->update($data);

        return back()->with('status', 'Meja diperbarui.');
    }
}
```

---

## app\Http\Controllers\Admin\UserController.php

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Admin/Users', [
            'users' => User::query()
                ->when($request->query('role'), fn ($query, $role) => $query->where('role', $role))
                ->latest()
                ->paginate(12)
                ->withQueryString(),
            'filters' => $request->only('role'),
            'roles' => ['customer', 'admin', 'owner', 'kitchen'],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        User::create($this->validated($request));

        return back()->with('status', 'Pengguna ditambahkan.');
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $data = $this->validated($request, $user->id, true);

        if (blank($data['password'] ?? null)) {
            unset($data['password']);
        }

        $user->update($data);

        return back()->with('status', 'Pengguna diperbarui.');
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($request->user()->is($user)) {
            return back()->withErrors(['user' => 'Akun yang sedang dipakai tidak bisa dihapus.']);
        }

        $user->delete();

        return back()->with('status', 'Pengguna dihapus.');
    }

    private function validated(Request $request, ?int $ignoreId = null, bool $isUpdate = false): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:100', 'regex:/^[a-zA-Z\s\.\,\'\-]+$/'],
            'email' => [
                'nullable',
                'email',
                'max:150',
                Rule::unique('users', 'email')->ignore($ignoreId),
            ],
            'phone' => [
                'nullable',
                'string',
                'min:9',
                'max:20',
                'regex:/^[0-9\-\+\s\(\)]+$/',
                Rule::unique('users', 'phone')->ignore($ignoreId),
            ],
            'role' => ['required', Rule::in(['customer', 'admin', 'owner', 'kitchen'])],
            'address' => ['nullable', 'string'],
            'password' => [$isUpdate ? 'nullable' : 'required', 'string', 'min:8'],
            'is_active' => ['nullable', 'boolean'],
        ]);
    }
}
```

---

## app\Http\Controllers\Auth\LoginController.php

```php
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class LoginController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (! Auth::attempt($credentials, $request->boolean('remember'))) {
            return back()->withErrors(['email' => 'Email atau password tidak cocok.'])->onlyInput('email');
        }

        if (! Auth::user()->is_active) {
            Auth::logout();

            return back()->withErrors(['email' => 'Akun ini sedang tidak aktif.'])->onlyInput('email');
        }

        $request->session()->regenerate();

        return match (Auth::user()->role) {
            'admin', 'owner' => redirect()->intended(route('admin.dashboard')),
            'kitchen' => redirect()->intended(route('kitchen.index')),
            default => redirect()->intended(route('home')),
        };
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }
}
```

---

## app\Http\Controllers\Auth\RegisterController.php

```php
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RegisterController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:100', 'regex:/^[a-zA-Z\s\.\,\'\-]+$/'],
            'email' => ['required', 'email', 'max:150', 'unique:users,email'],
            'phone' => ['required', 'string', 'min:9', 'max:20', 'regex:/^[0-9\-\+\s\(\)]+$/', 'unique:users,phone'],
            'address' => ['nullable', 'string'],
            'password' => ['required', 'confirmed', 'min:8'],
        ]);

        $user = User::create([
            ...$data,
            'role' => 'customer',
        ]);

        Auth::login($user);

        return redirect()->route('home')->with('status', 'Akun berhasil dibuat.');
    }
}
```

---

## app\Http\Controllers\Controller.php

```php
<?php

namespace App\Http\Controllers;

abstract class Controller
{
    //
}
```

---

## app\Http\Controllers\Customer\AccountController.php

```php
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
```

---

## app\Http\Controllers\Customer\CateringController.php

```php
<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Catering;
use App\Models\Menu;
use App\Models\Order;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CateringController extends Controller
{
    public function index(): Response
    {
        $menus = Menu::query()
            ->with('category')
            ->where('is_available', true)
            ->where('is_for_catering', true)
            ->orderBy('category_id')
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Catering/Catering', [
            'cateringMenus' => $menus,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'eventName' => ['required', 'string', 'min:3', 'max:255', 'regex:/^[a-zA-Z0-9\s\.\,\'\-]+$/'],
            'date' => ['required', 'date', 'after_or_equal:today'],
            'time' => ['nullable', 'date_format:H:i'],
            'place' => ['required', 'string', 'min:5', 'max:1000'],
            'contacts' => ['required', 'array', 'min:1'],
            'contacts.*.name' => ['required', 'string', 'min:3', 'max:100', 'regex:/^[a-zA-Z\s\.\,\'\-]+$/'],
            'contacts.*.phone' => ['required', 'string', 'min:9', 'max:20', 'regex:/^[0-9\-\+\s\(\)]+$/'],
            'contacts.*.email' => ['nullable', 'email'],
            'menuItems' => ['required', 'array', 'min:1'],
            'menuItems.*.id' => ['required', 'exists:menus,id'],
            'menuItems.*.quantity' => ['required', 'integer', 'min:1'],
            'specialRequest' => ['nullable', 'string', 'max:1000'],
        ]);

        $catering = DB::transaction(function () use ($request, $data) {
            // Check if primary contact exists as a user, or create guest user
            $primaryContact = $data['contacts'][0];
            $user = $request->user() ?: User::firstOrCreate(
                ['phone' => $primaryContact['phone']],
                [
                    'name' => $primaryContact['name'],
                    'email' => $primaryContact['email'] ?? null,
                    'role' => 'customer',
                    'password' => Str::password(16),
                ]
            );

            // Calculate subtotal
            $subtotal = 0;
            $items = [];
            foreach ($data['menuItems'] as $item) {
                $menu = Menu::findOrFail($item['id']);
                $itemSubtotal = $item['quantity'] * $menu->price;
                $subtotal += $itemSubtotal;
                $items[] = [
                    'menu_id' => $menu->id,
                    'menu_name' => $menu->name,
                    'qty' => $item['quantity'],
                    'price' => $menu->price,
                    'subtotal' => $itemSubtotal,
                ];
            }

            $taxRate = (float) Setting::valueFor('tax_rate', 0.11);
            $taxAmount = round($subtotal * $taxRate, 2);
            $totalPrice = $subtotal + $taxAmount;

            $dpPercentage = (float) Setting::valueFor('dp_percentage', 0.5);
            $dpAmount = round($totalPrice * $dpPercentage, 2);
            
            $uniqueCode = 'CAT-' . strtoupper(Str::random(6)) . '-' . rand(100, 999);

            $catering = Catering::create([
                'unique_code' => $uniqueCode,
                'user_id' => $user->id,
                'event_date' => $data['date'],
                'event_time' => $data['time'] ?? null,
                'delivery_address' => $data['place'],
                'subtotal' => $subtotal,
                'tax_rate' => $taxRate,
                'tax_amount' => $taxAmount,
                'total_price' => $totalPrice,
                'dp_percentage' => $dpPercentage,
                'dp_amount' => $dpAmount,
                'remaining_amount' => $totalPrice - $dpAmount,
                'status' => 'pending',
                'notes' => $data['specialRequest'] ?? null,
                'meta' => [
                    'event_name' => $data['eventName'],
                    'contacts' => $data['contacts'],
                ],
            ]);

            foreach ($items as $item) {
                $catering->items()->create($item);
            }

            return $catering;
        });

        // After saving, redirect to a catering confirmation page (or home with success msg)
        return redirect()->route('home')->with('status', 'Pesanan catering Anda berhasil dibuat! Kode: ' . $catering->unique_code);
    }
}
```

---

## app\Http\Controllers\Customer\CheckoutController.php

```php
<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\DineInTable;
use App\Models\Menu;
use App\Models\Order;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Midtrans\Config;
use Midtrans\Snap;
use App\Services\WhatsAppService;

class CheckoutController extends Controller
{
    public function show(Request $request): Response|RedirectResponse
    {
        $cart = $request->session()->get('cart', []);
        if ($cart === []) {
            return redirect()->route('menu.index')->withErrors(['cart' => 'Keranjang masih kosong.']);
        }

        $table = $request->session()->has('selected_table_id')
            ? DineInTable::find($request->session()->get('selected_table_id'))
            : null;

        return Inertia::render('Customer/Checkout', $this->summary($cart) + [
            'table' => $table,
            'paymentMethods' => ['cash' => 'Bayar di kasir', 'qris' => 'QRIS manual', 'bank_transfer' => 'Transfer bank'],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $cart = $request->session()->get('cart', []);
        if ($cart === []) {
            return redirect()->route('menu.index')->withErrors(['cart' => 'Keranjang masih kosong.']);
        }

        $data = $request->validate([
            'name' => [$request->user() ? 'nullable' : 'required', 'string', 'min:3', 'max:100', 'regex:/^[a-zA-Z\s\.\,\'\-]+$/'],
            'phone' => [$request->user() ? 'nullable' : 'required', 'string', 'min:9', 'max:20', 'regex:/^[0-9\-\+\s\(\)]+$/'],
            'email' => ['nullable', 'email', 'max:150'],
            'address' => ['nullable', 'string'],
            'payment_method' => ['required', 'string', 'max:50'],
            'notes' => ['nullable', 'string'],
        ]);

        $order = DB::transaction(function () use ($request, $data, $cart) {
            $user = $request->user() ?: User::firstOrCreate(
                ['phone' => $data['phone']],
                [
                    'name' => $data['name'],
                    'email' => $data['email'] ?? null,
                    'address' => $data['address'] ?? null,
                    'role' => 'customer',
                    'password' => Str::password(16),
                ]
            );

            $summary = $this->summary($cart);
            $table = $request->session()->has('selected_table_id')
                ? DineInTable::lockForUpdate()->find($request->session()->get('selected_table_id'))
                : null;

            if ($table && ! in_array($table->status, ['kosong', 'locked'], true)) {
                abort(422, 'Meja ini sedang tidak tersedia.');
            }

            $order = Order::create([
                'unique_code' => Order::generateCode($user),
                'user_id' => $user->id,
                'order_type' => 'dine_in',
                'dine_in_table_id' => $table?->id,
                'subtotal' => $summary['subtotal'],
                'tax_rate' => $summary['taxRate'],
                'tax_amount' => $summary['taxAmount'],
                'total_price' => $summary['total'],
                'payment_status' => 'unpaid',
                'status' => 'pending',
                'notes' => $data['notes'] ?? null,
            ]);

            foreach ($cart as $item) {
                $menu = Menu::findOrFail($item['menu_id']);
                $order->items()->create([
                    'menu_id' => $menu->id,
                    'menu_name' => $menu->name,
                    'qty' => $item['qty'],
                    'price' => $menu->price,
                    'subtotal' => $item['qty'] * (float) $menu->price,
                    'notes' => $item['notes'] ?? null,
                ]);
            }

            if ($data['payment_method'] === 'qris' || $data['payment_method'] === 'bank_transfer') {
                Config::$serverKey = env('MIDTRANS_SERVER_KEY');
                Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
                Config::$isSanitized = true;
                Config::$is3ds = true;

                $params = [
                    'transaction_details' => [
                        'order_id' => $order->unique_code,
                        'gross_amount' => (int) $order->total_price,
                    ],
                    'customer_details' => [
                        'first_name' => $user->name,
                        'email' => $user->email,
                        'phone' => $user->phone,
                    ],
                ];

                try {
                    $snapToken = Snap::getSnapToken($params);
                    $order->payments()->create([
                        'transaction_id' => $snapToken,
                        'payment_method' => $data['payment_method'],
                        'payment_type' => 'full',
                        'amount' => $order->total_price,
                        'status' => 'pending',
                        'expired_at' => now()->addMinutes((int) Setting::valueFor('auto_cancel_minutes', 30)),
                    ]);
                    $order->update(['snap_token' => $snapToken]);
                } catch (\Exception $e) {
                    // Fallback to manual if API fails
                    $order->payments()->create([
                        'transaction_id' => 'MANUAL-'.$order->unique_code,
                        'payment_method' => $data['payment_method'],
                        'payment_type' => 'full',
                        'amount' => $order->total_price,
                        'status' => 'pending',
                        'expired_at' => now()->addMinutes((int) Setting::valueFor('auto_cancel_minutes', 30)),
                    ]);
                }
            } else {
                $order->payments()->create([
                    'transaction_id' => 'MANUAL-'.$order->unique_code,
                    'payment_method' => $data['payment_method'],
                    'payment_type' => 'full',
                    'amount' => $order->total_price,
                    'status' => 'pending',
                    'expired_at' => now()->addMinutes((int) Setting::valueFor('auto_cancel_minutes', 30)),
                ]);
            }

            if ($table) {
                $table->update([
                    'status' => 'locked',
                    'locked_at' => now(),
                    'locked_by_order_id' => $order->id,
                ]);
            }

            return $order;
        });

        event(new \App\Events\KitchenOrderUpdated($order));

        // Send WhatsApp Notification asynchronously (if phone exists)
        if ($order->user->phone) {
            $message = "Halo {$order->user->name}, pesanan Anda di RM Kembar telah diterima.\n\n"
                     . "Kode Pesanan: *{$order->unique_code}*\n"
                     . "Total: *Rp " . number_format($order->total_price, 0, ',', '.') . "*\n\n"
                     . "Status: {$order->status}\n"
                     . "Terima kasih!";
                     
            dispatch(function () use ($order, $message) {
                WhatsAppService::sendMessage($order->user->phone, $message);
            })->afterResponse();
        }

        $request->session()->forget(['cart', 'selected_table_id']);

        return redirect()->route('orders.confirm', $order->unique_code);
    }

    private function summary(array $cart): array
    {
        $subtotal = collect($cart)->sum(fn ($item) => $item['qty'] * $item['price']);
        $taxRate = (float) Setting::valueFor('tax_rate', 0.11);
        $taxAmount = round($subtotal * $taxRate, 2);

        return [
            'cart' => $cart,
            'subtotal' => $subtotal,
            'taxRate' => $taxRate,
            'taxAmount' => $taxAmount,
            'total' => $subtotal + $taxAmount,
        ];
    }
}
```

---

## app\Http\Controllers\Customer\HomeController.php

```php
<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\DineInTable;
use App\Models\Menu;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Home', [
            'availableTables' => DineInTable::query()->where('status', 'kosong')->count(),
            'totalTables' => DineInTable::query()->count(),
            'featuredMenus' => Menu::query()
                ->with('category')
                ->sellable()
                ->orderBy('sort_order')
                ->take(6)
                ->get(),
        ]);
    }
}
```

---

## app\Http\Controllers\Customer\MenuController.php

```php
<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\DineInTable;
use App\Models\Menu;
use App\Models\MenuCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(Request $request): Response
    {
        $selectedTable = null;
        if ($request->filled('table')) {
            $selectedTable = DineInTable::query()
                ->where('table_number', $request->query('table'))
                ->orWhere('id', $request->query('table'))
                ->first();

            if ($selectedTable) {
                $request->session()->put('selected_table_id', $selectedTable->id);
            }
        } elseif ($request->session()->has('selected_table_id')) {
            $selectedTable = DineInTable::find($request->session()->get('selected_table_id'));
        }

        $menus = Menu::query()
            ->with('category')
            ->when($request->query('category'), fn ($query, $category) => $query->whereHas('category', fn ($categoryQuery) => $categoryQuery->where('slug', $category)))
            ->when($request->query('q'), fn ($query, $q) => $query->where('name', 'like', "%{$q}%"))
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('Customer/Menu', [
            'menus' => $menus,
            'categories' => MenuCategory::query()->where('is_active', true)->orderBy('sort_order')->get(),
            'cart' => $request->session()->get('cart', []),
            'selectedTable' => $selectedTable,
            'filters' => $request->only('q', 'category'),
        ]);
    }

    public function addToCart(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'menu_id' => ['required', 'exists:menus,id'],
            'qty' => ['required', 'integer', 'min:1', 'max:99'],
            'notes' => ['nullable', 'string', 'max:255'],
            'table_id' => ['nullable', 'exists:dine_in_tables,id'],
        ]);

        $menu = Menu::findOrFail($data['menu_id']);
        if (! $menu->is_available || $menu->stock < 1) {
            return back()->withErrors(['menu' => 'Menu ini sedang tidak tersedia.']);
        }

        if (! empty($data['table_id'])) {
            $request->session()->put('selected_table_id', $data['table_id']);
        }

        $cart = $request->session()->get('cart', []);
        $key = (string) $menu->id;
        $newQty = ($cart[$key]['qty'] ?? 0) + $data['qty'];

        $cart[$key] = [
            'menu_id' => $menu->id,
            'name' => $menu->name,
            'price' => (float) $menu->price,
            'qty' => min($newQty, $menu->stock),
            'notes' => $data['notes'] ?? ($cart[$key]['notes'] ?? null),
        ];

        $request->session()->put('cart', $cart);

        return back()->with('status', "{$menu->name} ditambahkan ke keranjang.");
    }

    public function removeFromCart(Request $request, int $menu): RedirectResponse
    {
        $cart = $request->session()->get('cart', []);
        unset($cart[(string) $menu]);
        $request->session()->put('cart', $cart);

        return back()->with('status', 'Item dihapus dari keranjang.');
    }
}
```

---

## app\Http\Controllers\Customer\OrderConfirmationController.php

```php
<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;

class OrderConfirmationController extends Controller
{
    public function __invoke(string $code): Response
    {
        return Inertia::render('Orders/Confirm', [
            'order' => Order::query()
                ->with(['items', 'table', 'payments'])
                ->where('unique_code', $code)
                ->firstOrFail(),
        ]);
    }
}
```

---

## app\Http\Controllers\Customer\RatingController.php

```php
<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    public function store(Request $request, Order $order)
    {
        // Ensure the order belongs to the user and is completed
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        if ($order->status !== 'completed') {
            return back()->withErrors(['rating' => 'Anda hanya bisa memberi ulasan pada pesanan yang sudah selesai.']);
        }

        // Check if already rated
        $existing = Rating::where('user_id', Auth::id())
            ->where('rateable_type', Order::class)
            ->where('rateable_id', $order->id)
            ->first();

        if ($existing) {
            return back()->withErrors(['rating' => 'Anda sudah memberi ulasan untuk pesanan ini.']);
        }

        $validated = $request->validate([
            'stars' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        Rating::create([
            'user_id' => Auth::id(),
            'rateable_type' => Order::class,
            'rateable_id' => $order->id,
            'stars' => $validated['stars'],
            'comment' => $validated['comment'],
        ]);

        return back()->with('status', 'Terima kasih atas ulasan Anda!');
    }
}
```

---

## app\Http\Controllers\Customer\ReservationController.php

```php
<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\DineInTable;
use App\Models\Reservation;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('Reservations/Create', [
            'availableTables' => DineInTable::query()->where('status', 'kosong')->orderBy('table_number')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => [$request->user() ? 'nullable' : 'required', 'string', 'min:3', 'max:100', 'regex:/^[a-zA-Z\s\.\,\'\-]+$/'],
            'phone' => [$request->user() ? 'nullable' : 'required', 'string', 'min:9', 'max:20', 'regex:/^[0-9\-\+\s\(\)]+$/'],
            'reserved_date' => ['required', 'date', 'after_or_equal:today'],
            'reserved_time' => ['required', 'date_format:H:i'],
            'guest_count' => ['required', 'integer', 'min:1', 'max:100'],
            'notes' => ['nullable', 'string'],
        ]);

        $user = $request->user() ?: User::firstOrCreate(
            ['phone' => $data['phone']],
            ['name' => $data['name'], 'role' => 'customer', 'password' => Str::password(16)]
        );

        $reservedAt = Carbon::parse($data['reserved_date'].' '.$data['reserved_time']);
        $reservation = Reservation::create([
            'unique_code' => Reservation::generateCode(),
            'user_id' => $user->id,
            'reserved_date' => $data['reserved_date'],
            'reserved_time' => $data['reserved_time'],
            'guest_count' => $data['guest_count'],
            'status' => 'pending',
            'notes' => $data['notes'] ?? null,
            'auto_cancel_at' => $reservedAt->copy()->addMinutes((int) Setting::valueFor('auto_cancel_minutes', 30)),
        ]);

        return redirect()->route('reservations.create')->with('status', "Reservasi {$reservation->unique_code} dibuat. Admin akan konfirmasi meja saat kedatangan.");
    }
}
```

---

## app\Http\Controllers\DebugController.php

```php
<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Reservation;
use App\Models\User;
use App\Models\DineInTable;
use App\Models\Menu;
use App\Services\WhatsAppService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DebugController extends Controller
{
    public function index()
    {
        return Inertia::render('Debug', [
            'routes' => [
                'kitchen' => route('kitchen.index'),
                'admin_menu' => route('admin.menu.index'),
                'admin_categories' => route('admin.categories.index'),
                'admin_reservations' => route('admin.reservations.index'),
            ]
        ]);
    }

    public function testWhatsApp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'message' => 'required|string'
        ]);

        try {
            $response = WhatsAppService::sendMessage($request->phone, $request->message);
            return back()->with('status', 'WhatsApp message sent! Response: ' . json_encode($response));
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'WA Error: ' . $e->getMessage()]);
        }
    }

    public function seedReservation()
    {
        $user = User::firstOrCreate(
            ['email' => 'debug@example.com'],
            ['name' => 'Debug User', 'password' => bcrypt('password'), 'role' => 'customer', 'phone' => '081234567890']
        );

        Reservation::create([
            'unique_code' => Reservation::generateCode(),
            'user_id' => $user->id,
            'reserved_date' => now()->addDays(1)->toDateString(),
            'reserved_time' => '19:00:00',
            'guest_count' => 4,
            'status' => 'pending',
            'notes' => 'Debug reservation generated automatically.',
        ]);

        return back()->with('status', 'Seeded a new pending reservation!');
    }

    public function seedOrder()
    {
        $user = User::firstOrCreate(
            ['email' => 'debug@example.com'],
            ['name' => 'Debug User', 'password' => bcrypt('password'), 'role' => 'customer', 'phone' => '081234567890']
        );

        $table = DineInTable::firstOrCreate(['table_number' => 'D1'], ['capacity' => 4, 'status' => 'kosong']);
        
        $order = Order::create([
            'unique_code' => Order::generateCode($user),
            'user_id' => $user->id,
            'order_type' => 'dine_in',
            'dine_in_table_id' => $table->id,
            'subtotal' => 100000,
            'tax_rate' => 0.11,
            'tax_amount' => 11000,
            'total_price' => 111000,
            'payment_status' => 'paid',
            'status' => 'paid_waiting',
            'notes' => 'Debug order',
        ]);

        $menu = Menu::first();
        if ($menu) {
            $order->items()->create([
                'menu_id' => $menu->id,
                'menu_name' => $menu->name,
                'qty' => 1,
                'price' => $menu->price,
                'subtotal' => $menu->price,
            ]);
        }

        event(new \App\Events\KitchenOrderUpdated($order));

        return back()->with('status', 'Seeded a paid order! Check the Kitchen view.');
    }

    public function simulatePayment(Order $order)
    {
        if ($order->payment_status === 'paid') {
            return back()->with('status', 'Order is already paid.');
        }

        $order->update([
            'payment_status' => 'paid',
            'status' => 'paid_waiting',
        ]);

        $order->payments()->where('status', 'pending')->update([
            'status' => 'settlement',
            'paid_at' => now(),
        ]);

        event(new \App\Events\KitchenOrderUpdated($order));

        // WhatsApp Notification (Optional, but included for completeness)
        if ($order->user && $order->user->phone) {
            $message = "Pembayaran untuk pesanan *{$order->unique_code}* berhasil diterima.\nStatus pesanan sekarang sedang disiapkan di dapur.";
            try {
                WhatsAppService::sendMessage($order->user->phone, $message);
            } catch (\Exception $e) {}
        }

        return back()->with('status', 'Simulated successful payment!');
    }
}
```

---

## app\Http\Controllers\Info\AboutController.php

```php
<?php

namespace App\Http\Controllers\Info;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Info/AboutUs');
    }
}
```

---

## app\Http\Controllers\KitchenController.php

```php
<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;

class KitchenController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Kitchen/Index', [
            'orders' => Order::query()
                ->with(['items', 'table'])
                ->whereIn('status', ['on_site', 'preparing'])
                ->oldest('preparing_at')
                ->latest()
                ->get(),
        ]);
    }
}
```

---

## app\Http\Controllers\PaymentCallbackController.php

```php
<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentCallbackController extends Controller
{
    public function handleMidtrans(Request $request)
    {
        $payload = $request->all();
        
        // In a real app, verify signature key
        // $signatureKey = hash('sha512', $payload['order_id'] . $payload['status_code'] . $payload['gross_amount'] . env('MIDTRANS_SERVER_KEY'));
        // if ($signatureKey !== $payload['signature_key']) {
        //     return response()->json(['message' => 'Invalid signature'], 403);
        // }

        $orderId = $payload['order_id'];
        $transactionStatus = $payload['transaction_status'];
        
        $order = Order::where('unique_code', $orderId)->first();
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $payment = $order->payments()->latest()->first();
        
        if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
            if ($payment) {
                $payment->update(['status' => 'paid']);
            }
            $order->update(['payment_status' => 'paid']);
        } elseif ($transactionStatus == 'cancel' || $transactionStatus == 'deny' || $transactionStatus == 'expire') {
            if ($payment) {
                $payment->update(['status' => 'failed']);
            }
            $order->update(['payment_status' => 'failed', 'status' => 'cancelled']);
        } elseif ($transactionStatus == 'pending') {
            if ($payment) {
                $payment->update(['status' => 'pending']);
            }
        }

        return response()->json(['message' => 'Success']);
    }
}
```

---

## app\Http\Middleware\EnsureRole.php

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        abort_if(! $user || ! in_array($user->role, $roles, true), 403);

        return $next($request);
    }
}
```

---

## app\Http\Middleware\HandleInertiaRequests.php

```php
<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()?->only('id', 'name', 'email', 'phone', 'role'),
            ],
            'flash' => [
                'status' => fn () => $request->session()->get('status'),
            ],
        ];
    }
}
```

---

## app\Models\Catering.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Catering extends Model
{
    use SoftDeletes;

    protected $guarded = [];

    protected $casts = [
        'event_date' => 'date',
        'subtotal' => 'decimal:2',
        'tax_rate' => 'decimal:4',
        'tax_amount' => 'decimal:2',
        'total_price' => 'decimal:2',
        'dp_percentage' => 'decimal:4',
        'dp_amount' => 'decimal:2',
        'remaining_amount' => 'decimal:2',
        'meta' => 'array',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(CateringItem::class);
    }

    public function payments(): MorphMany
    {
        return $this->morphMany(Payment::class, 'payable');
    }
}
```

---

## app\Models\CateringItem.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CateringItem extends Model
{
    protected $guarded = [];

    public function catering(): BelongsTo
    {
        return $this->belongsTo(Catering::class);
    }
}
```

---

## app\Models\DineInTable.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DineInTable extends Model
{
    protected $appends = ['order_url'];

    protected $fillable = [
        'table_number',
        'capacity',
        'status',
        'locked_at',
        'locked_by_order_id',
        'qr_code_path',
        'location_label',
        'notes',
        'meta',
    ];

    protected $casts = [
        'locked_at' => 'datetime',
        'meta' => 'array',
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function lockedByOrder(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'locked_by_order_id');
    }

    public function getOrderUrlAttribute(): string
    {
        return route('menu.index', ['table' => $this->table_number]);
    }
}
```

---

## app\Models\Menu.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Menu extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'image',
        'stock',
        'low_stock_threshold',
        'is_available',
        'is_for_dine_in',
        'is_for_catering',
        'sort_order',
        'meta',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_available' => 'boolean',
        'is_for_dine_in' => 'boolean',
        'is_for_catering' => 'boolean',
        'meta' => 'array',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(MenuCategory::class, 'category_id');
    }

    public function stockLogs(): HasMany
    {
        return $this->hasMany(StockLog::class);
    }

    public function scopeSellable($query)
    {
        return $query->where('is_available', true)->where('stock', '>', 0);
    }
}
```

---

## app\Models\MenuCategory.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MenuCategory extends Model
{
    protected $fillable = ['name', 'slug', 'sort_order', 'is_active', 'meta'];

    protected $casts = [
        'is_active' => 'boolean',
        'meta' => 'array',
    ];

    public function menus(): HasMany
    {
        return $this->hasMany(Menu::class, 'category_id');
    }
}
```

---

## app\Models\Order.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class Order extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'unique_code',
        'user_id',
        'order_type',
        'dine_in_table_id',
        'subtotal',
        'tax_rate',
        'tax_amount',
        'total_price',
        'payment_status',
        'status',
        'notes',
        'cancellation_reason',
        'arrived_at',
        'preparing_at',
        'completed_at',
        'cancelled_at',
        'snap_token',
        'meta',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'tax_rate' => 'decimal:4',
        'tax_amount' => 'decimal:2',
        'total_price' => 'decimal:2',
        'arrived_at' => 'datetime',
        'preparing_at' => 'datetime',
        'completed_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'meta' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function table(): BelongsTo
    {
        return $this->belongsTo(DineInTable::class, 'dine_in_table_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payments(): MorphMany
    {
        return $this->morphMany(Payment::class, 'payable');
    }

    public function rating()
    {
        return $this->morphOne(Rating::class, 'rateable');
    }

    public static function generateCode(?User $user = null): string
    {
        $name = $user ? Str::upper(Str::limit(Str::slug($user->name, ''), 5, '')) : 'GUEST';
        $date = Carbon::now()->format('ymd');

        do {
            $code = sprintf('RMK-%s-%s-%03d', $date, $name ?: 'GUEST', random_int(1, 999));
        } while (static::query()->where('unique_code', $code)->exists());

        return $code;
    }
}
```

---

## app\Models\OrderItem.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    protected $fillable = ['order_id', 'menu_id', 'menu_name', 'qty', 'price', 'subtotal', 'notes', 'meta'];

    protected $casts = [
        'price' => 'decimal:2',
        'subtotal' => 'decimal:2',
        'meta' => 'array',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class);
    }
}
```

---

## app\Models\Payment.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Payment extends Model
{
    protected $fillable = [
        'transaction_id',
        'payment_method',
        'payment_type',
        'amount',
        'status',
        'gateway_response',
        'paid_at',
        'expired_at',
        'meta',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'gateway_response' => 'array',
        'paid_at' => 'datetime',
        'expired_at' => 'datetime',
        'meta' => 'array',
    ];

    public function payable(): MorphTo
    {
        return $this->morphTo();
    }
}
```

---

## app\Models\Rating.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'rateable_type',
        'rateable_id',
        'stars',
        'comment',
        'meta',
    ];

    protected $casts = [
        'stars' => 'integer',
        'meta' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function rateable(): MorphTo
    {
        return $this->morphTo();
    }
}
```

---

## app\Models\Reservation.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class Reservation extends Model
{
    protected $fillable = [
        'unique_code',
        'user_id',
        'table_id',
        'order_id',
        'reserved_date',
        'reserved_time',
        'guest_count',
        'status',
        'notes',
        'auto_cancel_at',
        'cancelled_at',
        'cancellation_reason',
        'meta',
    ];

    protected $casts = [
        'reserved_date' => 'date',
        'auto_cancel_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'meta' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function table(): BelongsTo
    {
        return $this->belongsTo(DineInTable::class, 'table_id');
    }

    public static function generateCode(): string
    {
        do {
            $code = 'RSV-'.Carbon::now()->format('ymd').'-'.Str::upper(Str::random(4));
        } while (static::query()->where('unique_code', $code)->exists());

        return $code;
    }
}
```

---

## app\Models\Setting.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['key', 'value', 'type', 'label', 'group'];

    public static function valueFor(string $key, mixed $default = null): mixed
    {
        $setting = static::query()->where('key', $key)->first();

        if (! $setting) {
            return $default;
        }

        return match ($setting->type) {
            'integer' => (int) $setting->value,
            'float' => (float) $setting->value,
            'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
            default => $setting->value,
        };
    }
}
```

---

## app\Models\StockLog.php

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class StockLog extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'menu_id',
        'changed_by',
        'change_type',
        'qty_before',
        'qty_change',
        'qty_after',
        'reason',
        'reference_type',
        'reference_id',
        'created_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class);
    }

    public function reference(): MorphTo
    {
        return $this->morphTo();
    }
}
```

---

## app\Models\User.php

```php
<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'role',
        'address',
        'avatar',
        'password',
        'is_active',
        'meta',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
            'meta' => 'array',
        ];
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function isStaff(): bool
    {
        return in_array($this->role, ['admin', 'owner', 'kitchen'], true);
    }
}
```

---

## app\Providers\AppServiceProvider.php

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
```

---

## app\Services\WhatsAppService.php

```php
<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    public static function sendMessage(string $phone, string $message): bool
    {
        $url = config('services.evolution.url') . '/message/sendText/' . config('services.evolution.instance');
        $apiKey = config('services.evolution.key');

        // Clean phone number (remove +, spaces, dashes, parentheses)
        $phone = preg_replace('/[^0-9]/', '', $phone);
        
        // Format phone number to international format (example for ID)
        if (str_starts_with($phone, '0')) {
            $phone = '62' . substr($phone, 1);
        }

        try {
            $response = Http::timeout(5)->withHeaders([
                'apikey' => $apiKey,
                'Content-Type' => 'application/json',
            ])->post($url, [
                'number' => $phone,
                'text' => $message,
                'delay' => 1200,
            ]);

            if ($response->successful()) {
                return true;
            }

            Log::error('WhatsApp API Error: ' . $response->body());
            return false;
        } catch (\Exception $e) {
            Log::error('WhatsApp Exception: ' . $e->getMessage());
            return false;
        }
    }
}
```

---

## bootstrap\app.php

```php
<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);

        $middleware->alias([
            'role' => \App\Http\Middleware\EnsureRole::class,
        ]);

        $middleware->validateCsrfTokens(except: [
            'payment/midtrans-callback',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
```

---

## bootstrap\providers.php

```php
<?php

return [
    App\Providers\AppServiceProvider::class,
];
```

---

## config\app.php

```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    |
    | This value is the name of your application, which will be used when the
    | framework needs to place the application's name in a notification or
    | other UI elements where an application name needs to be displayed.
    |
    */

    'name' => env('APP_NAME', 'Laravel'),

    /*
    |--------------------------------------------------------------------------
    | Application Environment
    |--------------------------------------------------------------------------
    |
    | This value determines the "environment" your application is currently
    | running in. This may determine how you prefer to configure various
    | services the application utilizes. Set this in your ".env" file.
    |
    */

    'env' => env('APP_ENV', 'production'),

    /*
    |--------------------------------------------------------------------------
    | Application Debug Mode
    |--------------------------------------------------------------------------
    |
    | When your application is in debug mode, detailed error messages with
    | stack traces will be shown on every error that occurs within your
    | application. If disabled, a simple generic error page is shown.
    |
    */

    'debug' => (bool) env('APP_DEBUG', false),

    /*
    |--------------------------------------------------------------------------
    | Application URL
    |--------------------------------------------------------------------------
    |
    | This URL is used by the console to properly generate URLs when using
    | the Artisan command line tool. You should set this to the root of
    | the application so that it's available within Artisan commands.
    |
    */

    'url' => env('APP_URL', 'http://localhost'),

    /*
    |--------------------------------------------------------------------------
    | Application Timezone
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default timezone for your application, which
    | will be used by the PHP date and date-time functions. The timezone
    | is set to "UTC" by default as it is suitable for most use cases.
    |
    */

    'timezone' => 'UTC',

    /*
    |--------------------------------------------------------------------------
    | Application Locale Configuration
    |--------------------------------------------------------------------------
    |
    | The application locale determines the default locale that will be used
    | by Laravel's translation / localization methods. This option can be
    | set to any locale for which you plan to have translation strings.
    |
    */

    'locale' => env('APP_LOCALE', 'en'),

    'fallback_locale' => env('APP_FALLBACK_LOCALE', 'en'),

    'faker_locale' => env('APP_FAKER_LOCALE', 'en_US'),

    /*
    |--------------------------------------------------------------------------
    | Encryption Key
    |--------------------------------------------------------------------------
    |
    | This key is utilized by Laravel's encryption services and should be set
    | to a random, 32 character string to ensure that all encrypted values
    | are secure. You should do this prior to deploying the application.
    |
    */

    'cipher' => 'AES-256-CBC',

    'key' => env('APP_KEY'),

    'previous_keys' => [
        ...array_filter(
            explode(',', (string) env('APP_PREVIOUS_KEYS', ''))
        ),
    ],

    /*
    |--------------------------------------------------------------------------
    | Maintenance Mode Driver
    |--------------------------------------------------------------------------
    |
    | These configuration options determine the driver used to determine and
    | manage Laravel's "maintenance mode" status. The "cache" driver will
    | allow maintenance mode to be controlled across multiple machines.
    |
    | Supported drivers: "file", "cache"
    |
    */

    'maintenance' => [
        'driver' => env('APP_MAINTENANCE_DRIVER', 'file'),
        'store' => env('APP_MAINTENANCE_STORE', 'database'),
    ],

];
```

---

## config\auth.php

```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    |
    | This option defines the default authentication "guard" and password
    | reset "broker" for your application. You may change these values
    | as required, but they're a perfect start for most applications.
    |
    */

    'defaults' => [
        'guard' => env('AUTH_GUARD', 'web'),
        'passwords' => env('AUTH_PASSWORD_BROKER', 'users'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Next, you may define every authentication guard for your application.
    | Of course, a great default configuration has been defined for you
    | which utilizes session storage plus the Eloquent user provider.
    |
    | All authentication guards have a user provider, which defines how the
    | users are actually retrieved out of your database or other storage
    | system used by the application. Typically, Eloquent is utilized.
    |
    | Supported: "session"
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | All authentication guards have a user provider, which defines how the
    | users are actually retrieved out of your database or other storage
    | system used by the application. Typically, Eloquent is utilized.
    |
    | If you have multiple user tables or models you may configure multiple
    | providers to represent the model / table. These providers may then
    | be assigned to any extra authentication guards you have defined.
    |
    | Supported: "database", "eloquent"
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => env('AUTH_MODEL', App\Models\User::class),
        ],

        // 'users' => [
        //     'driver' => 'database',
        //     'table' => 'users',
        // ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Resetting Passwords
    |--------------------------------------------------------------------------
    |
    | These configuration options specify the behavior of Laravel's password
    | reset functionality, including the table utilized for token storage
    | and the user provider that is invoked to actually retrieve users.
    |
    | The expiry time is the number of minutes that each reset token will be
    | considered valid. This security feature keeps tokens short-lived so
    | they have less time to be guessed. You may change this as needed.
    |
    | The throttle setting is the number of seconds a user must wait before
    | generating more password reset tokens. This prevents the user from
    | quickly generating a very large amount of password reset tokens.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Confirmation Timeout
    |--------------------------------------------------------------------------
    |
    | Here you may define the number of seconds before a password confirmation
    | window expires and users are asked to re-enter their password via the
    | confirmation screen. By default, the timeout lasts for three hours.
    |
    */

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),

];
```

---

## config\broadcasting.php

```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Broadcaster
    |--------------------------------------------------------------------------
    |
    | This option controls the default broadcaster that will be used by the
    | framework when an event needs to be broadcast. You may set this to
    | any of the connections defined in the "connections" array below.
    |
    | Supported: "reverb", "pusher", "ably", "redis", "log", "null"
    |
    */

    'default' => env('BROADCAST_CONNECTION', 'null'),

    /*
    |--------------------------------------------------------------------------
    | Broadcast Connections
    |--------------------------------------------------------------------------
    |
    | Here you may define all of the broadcast connections that will be used
    | to broadcast events to other systems or over WebSockets. Samples of
    | each available type of connection are provided inside this array.
    |
    */

    'connections' => [

        'reverb' => [
            'driver' => 'reverb',
            'key' => env('REVERB_APP_KEY'),
            'secret' => env('REVERB_APP_SECRET'),
            'app_id' => env('REVERB_APP_ID'),
            'options' => [
                'host' => env('REVERB_HOST'),
                'port' => env('REVERB_PORT', 443),
                'scheme' => env('REVERB_SCHEME', 'https'),
                'useTLS' => env('REVERB_SCHEME', 'https') === 'https',
            ],
            'client_options' => [
                // Guzzle client options: https://docs.guzzlephp.org/en/stable/request-options.html
            ],
        ],

        'pusher' => [
            'driver' => 'pusher',
            'key' => env('PUSHER_APP_KEY'),
            'secret' => env('PUSHER_APP_SECRET'),
            'app_id' => env('PUSHER_APP_ID'),
            'options' => [
                'cluster' => env('PUSHER_APP_CLUSTER'),
                'host' => env('PUSHER_HOST') ?: 'api-'.env('PUSHER_APP_CLUSTER', 'mt1').'.pusher.com',
                'port' => env('PUSHER_PORT', 443),
                'scheme' => env('PUSHER_SCHEME', 'https'),
                'encrypted' => true,
                'useTLS' => env('PUSHER_SCHEME', 'https') === 'https',
            ],
            'client_options' => [
                // Guzzle client options: https://docs.guzzlephp.org/en/stable/request-options.html
            ],
        ],

        'ably' => [
            'driver' => 'ably',
            'key' => env('ABLY_KEY'),
        ],

        'log' => [
            'driver' => 'log',
        ],

        'null' => [
            'driver' => 'null',
        ],

    ],

];
```

---

## config\cache.php

```php
<?php

use Illuminate\Support\Str;

return [

    /*
    |--------------------------------------------------------------------------
    | Default Cache Store
    |--------------------------------------------------------------------------
    |
    | This option controls the default cache store that will be used by the
    | framework. This connection is utilized if another isn't explicitly
    | specified when running a cache operation inside the application.
    |
    */

    'default' => env('CACHE_STORE', 'database'),

    /*
    |--------------------------------------------------------------------------
    | Cache Stores
    |--------------------------------------------------------------------------
    |
    | Here you may define all of the cache "stores" for your application as
    | well as their drivers. You may even define multiple stores for the
    | same cache driver to group types of items stored in your caches.
    |
    | Supported drivers: "array", "database", "file", "memcached",
    |                    "redis", "dynamodb", "octane",
    |                    "failover", "null"
    |
    */

    'stores' => [

        'array' => [
            'driver' => 'array',
            'serialize' => false,
        ],

        'database' => [
            'driver' => 'database',
            'connection' => env('DB_CACHE_CONNECTION'),
            'table' => env('DB_CACHE_TABLE', 'cache'),
            'lock_connection' => env('DB_CACHE_LOCK_CONNECTION'),
            'lock_table' => env('DB_CACHE_LOCK_TABLE'),
        ],

        'file' => [
            'driver' => 'file',
            'path' => storage_path('framework/cache/data'),
            'lock_path' => storage_path('framework/cache/data'),
        ],

        'memcached' => [
            'driver' => 'memcached',
            'persistent_id' => env('MEMCACHED_PERSISTENT_ID'),
            'sasl' => [
                env('MEMCACHED_USERNAME'),
                env('MEMCACHED_PASSWORD'),
            ],
            'options' => [
                // Memcached::OPT_CONNECT_TIMEOUT => 2000,
            ],
            'servers' => [
                [
                    'host' => env('MEMCACHED_HOST', '127.0.0.1'),
                    'port' => env('MEMCACHED_PORT', 11211),
                    'weight' => 100,
                ],
            ],
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => env('REDIS_CACHE_CONNECTION', 'cache'),
            'lock_connection' => env('REDIS_CACHE_LOCK_CONNECTION', 'default'),
        ],

        'dynamodb' => [
            'driver' => 'dynamodb',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
            'table' => env('DYNAMODB_CACHE_TABLE', 'cache'),
            'endpoint' => env('DYNAMODB_ENDPOINT'),
        ],

        'octane' => [
            'driver' => 'octane',
        ],

        'failover' => [
            'driver' => 'failover',
            'stores' => [
                'database',
                'array',
            ],
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Cache Key Prefix
    |--------------------------------------------------------------------------
    |
    | When utilizing the APC, database, memcached, Redis, and DynamoDB cache
    | stores, there might be other applications using the same cache. For
    | that reason, you may prefix every cache key to avoid collisions.
    |
    */

    'prefix' => env('CACHE_PREFIX', Str::slug((string) env('APP_NAME', 'laravel')).'-cache-'),

];
```

---

## config\database.php

```php
<?php

use Illuminate\Support\Str;

return [

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for database operations. This is
    | the connection which will be utilized unless another connection
    | is explicitly specified when you execute a query / statement.
    |
    */

    'default' => env('DB_CONNECTION', 'sqlite'),

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Below are all of the database connections defined for your application.
    | An example configuration is provided for each database system which
    | is supported by Laravel. You're free to add / remove connections.
    |
    */

    'connections' => [

        'sqlite' => [
            'driver' => 'sqlite',
            'url' => env('DB_URL'),
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
            'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
            'busy_timeout' => null,
            'journal_mode' => null,
            'synchronous' => null,
            'transaction_mode' => 'DEFERRED',
        ],

        'mysql' => [
            'driver' => 'mysql',
            'url' => env('DB_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'laravel'),
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => env('DB_CHARSET', 'utf8mb4'),
            'collation' => env('DB_COLLATION', 'utf8mb4_unicode_ci'),
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                (PHP_VERSION_ID >= 80500 ? \Pdo\Mysql::ATTR_SSL_CA : \PDO::MYSQL_ATTR_SSL_CA) => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mariadb' => [
            'driver' => 'mariadb',
            'url' => env('DB_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'laravel'),
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => env('DB_CHARSET', 'utf8mb4'),
            'collation' => env('DB_COLLATION', 'utf8mb4_unicode_ci'),
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                (PHP_VERSION_ID >= 80500 ? \Pdo\Mysql::ATTR_SSL_CA : \PDO::MYSQL_ATTR_SSL_CA) => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'pgsql' => [
            'driver' => 'pgsql',
            'url' => env('DB_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '5432'),
            'database' => env('DB_DATABASE', 'laravel'),
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => env('DB_CHARSET', 'utf8'),
            'prefix' => '',
            'prefix_indexes' => true,
            'search_path' => 'public',
            'sslmode' => env('DB_SSLMODE', 'prefer'),
        ],

        'sqlsrv' => [
            'driver' => 'sqlsrv',
            'url' => env('DB_URL'),
            'host' => env('DB_HOST', 'localhost'),
            'port' => env('DB_PORT', '1433'),
            'database' => env('DB_DATABASE', 'laravel'),
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => env('DB_CHARSET', 'utf8'),
            'prefix' => '',
            'prefix_indexes' => true,
            // 'encrypt' => env('DB_ENCRYPT', 'yes'),
            // 'trust_server_certificate' => env('DB_TRUST_SERVER_CERTIFICATE', 'false'),
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Migration Repository Table
    |--------------------------------------------------------------------------
    |
    | This table keeps track of all the migrations that have already run for
    | your application. Using this information, we can determine which of
    | the migrations on disk haven't actually been run on the database.
    |
    */

    'migrations' => [
        'table' => 'migrations',
        'update_date_on_publish' => true,
    ],

    /*
    |--------------------------------------------------------------------------
    | Redis Databases
    |--------------------------------------------------------------------------
    |
    | Redis is an open source, fast, and advanced key-value store that also
    | provides a richer body of commands than a typical key-value system
    | such as Memcached. You may define your connection settings here.
    |
    */

    'redis' => [

        'client' => env('REDIS_CLIENT', 'phpredis'),

        'options' => [
            'cluster' => env('REDIS_CLUSTER', 'redis'),
            'prefix' => env('REDIS_PREFIX', Str::slug((string) env('APP_NAME', 'laravel')).'-database-'),
            'persistent' => env('REDIS_PERSISTENT', false),
        ],

        'default' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'username' => env('REDIS_USERNAME'),
            'password' => env('REDIS_PASSWORD'),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_DB', '0'),
            'max_retries' => env('REDIS_MAX_RETRIES', 3),
            'backoff_algorithm' => env('REDIS_BACKOFF_ALGORITHM', 'decorrelated_jitter'),
            'backoff_base' => env('REDIS_BACKOFF_BASE', 100),
            'backoff_cap' => env('REDIS_BACKOFF_CAP', 1000),
        ],

        'cache' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'username' => env('REDIS_USERNAME'),
            'password' => env('REDIS_PASSWORD'),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_CACHE_DB', '1'),
            'max_retries' => env('REDIS_MAX_RETRIES', 3),
            'backoff_algorithm' => env('REDIS_BACKOFF_ALGORITHM', 'decorrelated_jitter'),
            'backoff_base' => env('REDIS_BACKOFF_BASE', 100),
            'backoff_cap' => env('REDIS_BACKOFF_CAP', 1000),
        ],

    ],

];
```

---

## config\filesystems.php

```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application for file storage.
    |
    */

    'default' => env('FILESYSTEM_DISK', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Below you may configure as many filesystem disks as necessary, and you
    | may even configure multiple disks for the same driver. Examples for
    | most supported storage drivers are configured here for reference.
    |
    | Supported drivers: "local", "ftp", "sftp", "s3"
    |
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app/private'),
            'serve' => true,
            'throw' => false,
            'report' => false,
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => rtrim(env('APP_URL', 'http://localhost'), '/').'/storage',
            'visibility' => 'public',
            'throw' => false,
            'report' => false,
        ],

        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
            'throw' => false,
            'report' => false,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Symbolic Links
    |--------------------------------------------------------------------------
    |
    | Here you may configure the symbolic links that will be created when the
    | `storage:link` Artisan command is executed. The array keys should be
    | the locations of the links and the values should be their targets.
    |
    */

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];
```

---

## config\logging.php

```php
<?php

use Monolog\Handler\NullHandler;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\SyslogUdpHandler;
use Monolog\Processor\PsrLogMessageProcessor;

return [

    /*
    |--------------------------------------------------------------------------
    | Default Log Channel
    |--------------------------------------------------------------------------
    |
    | This option defines the default log channel that is utilized to write
    | messages to your logs. The value provided here should match one of
    | the channels present in the list of "channels" configured below.
    |
    */

    'default' => env('LOG_CHANNEL', 'stack'),

    /*
    |--------------------------------------------------------------------------
    | Deprecations Log Channel
    |--------------------------------------------------------------------------
    |
    | This option controls the log channel that should be used to log warnings
    | regarding deprecated PHP and library features. This allows you to get
    | your application ready for upcoming major versions of dependencies.
    |
    */

    'deprecations' => [
        'channel' => env('LOG_DEPRECATIONS_CHANNEL', 'null'),
        'trace' => env('LOG_DEPRECATIONS_TRACE', false),
    ],

    /*
    |--------------------------------------------------------------------------
    | Log Channels
    |--------------------------------------------------------------------------
    |
    | Here you may configure the log channels for your application. Laravel
    | utilizes the Monolog PHP logging library, which includes a variety
    | of powerful log handlers and formatters that you're free to use.
    |
    | Available drivers: "single", "daily", "slack", "syslog",
    |                    "errorlog", "monolog", "custom", "stack"
    |
    */

    'channels' => [

        'stack' => [
            'driver' => 'stack',
            'channels' => explode(',', (string) env('LOG_STACK', 'single')),
            'ignore_exceptions' => false,
        ],

        'single' => [
            'driver' => 'single',
            'path' => storage_path('logs/laravel.log'),
            'level' => env('LOG_LEVEL', 'debug'),
            'replace_placeholders' => true,
        ],

        'daily' => [
            'driver' => 'daily',
            'path' => storage_path('logs/laravel.log'),
            'level' => env('LOG_LEVEL', 'debug'),
            'days' => env('LOG_DAILY_DAYS', 14),
            'replace_placeholders' => true,
        ],

        'slack' => [
            'driver' => 'slack',
            'url' => env('LOG_SLACK_WEBHOOK_URL'),
            'username' => env('LOG_SLACK_USERNAME', 'Laravel Log'),
            'emoji' => env('LOG_SLACK_EMOJI', ':boom:'),
            'level' => env('LOG_LEVEL', 'critical'),
            'replace_placeholders' => true,
        ],

        'papertrail' => [
            'driver' => 'monolog',
            'level' => env('LOG_LEVEL', 'debug'),
            'handler' => env('LOG_PAPERTRAIL_HANDLER', SyslogUdpHandler::class),
            'handler_with' => [
                'host' => env('PAPERTRAIL_URL'),
                'port' => env('PAPERTRAIL_PORT'),
                'connectionString' => 'tls://'.env('PAPERTRAIL_URL').':'.env('PAPERTRAIL_PORT'),
            ],
            'processors' => [PsrLogMessageProcessor::class],
        ],

        'stderr' => [
            'driver' => 'monolog',
            'level' => env('LOG_LEVEL', 'debug'),
            'handler' => StreamHandler::class,
            'handler_with' => [
                'stream' => 'php://stderr',
            ],
            'formatter' => env('LOG_STDERR_FORMATTER'),
            'processors' => [PsrLogMessageProcessor::class],
        ],

        'syslog' => [
            'driver' => 'syslog',
            'level' => env('LOG_LEVEL', 'debug'),
            'facility' => env('LOG_SYSLOG_FACILITY', LOG_USER),
            'replace_placeholders' => true,
        ],

        'errorlog' => [
            'driver' => 'errorlog',
            'level' => env('LOG_LEVEL', 'debug'),
            'replace_placeholders' => true,
        ],

        'null' => [
            'driver' => 'monolog',
            'handler' => NullHandler::class,
        ],

        'emergency' => [
            'path' => storage_path('logs/laravel.log'),
        ],

    ],

];
```

---

## config\mail.php

```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Mailer
    |--------------------------------------------------------------------------
    |
    | This option controls the default mailer that is used to send all email
    | messages unless another mailer is explicitly specified when sending
    | the message. All additional mailers can be configured within the
    | "mailers" array. Examples of each type of mailer are provided.
    |
    */

    'default' => env('MAIL_MAILER', 'log'),

    /*
    |--------------------------------------------------------------------------
    | Mailer Configurations
    |--------------------------------------------------------------------------
    |
    | Here you may configure all of the mailers used by your application plus
    | their respective settings. Several examples have been configured for
    | you and you are free to add your own as your application requires.
    |
    | Laravel supports a variety of mail "transport" drivers that can be used
    | when delivering an email. You may specify which one you're using for
    | your mailers below. You may also add additional mailers if needed.
    |
    | Supported: "smtp", "sendmail", "mailgun", "ses", "ses-v2",
    |            "postmark", "resend", "log", "array",
    |            "failover", "roundrobin"
    |
    */

    'mailers' => [

        'smtp' => [
            'transport' => 'smtp',
            'scheme' => env('MAIL_SCHEME'),
            'url' => env('MAIL_URL'),
            'host' => env('MAIL_HOST', '127.0.0.1'),
            'port' => env('MAIL_PORT', 2525),
            'username' => env('MAIL_USERNAME'),
            'password' => env('MAIL_PASSWORD'),
            'timeout' => null,
            'local_domain' => env('MAIL_EHLO_DOMAIN', parse_url((string) env('APP_URL', 'http://localhost'), PHP_URL_HOST)),
        ],

        'ses' => [
            'transport' => 'ses',
        ],

        'postmark' => [
            'transport' => 'postmark',
            // 'message_stream_id' => env('POSTMARK_MESSAGE_STREAM_ID'),
            // 'client' => [
            //     'timeout' => 5,
            // ],
        ],

        'resend' => [
            'transport' => 'resend',
        ],

        'sendmail' => [
            'transport' => 'sendmail',
            'path' => env('MAIL_SENDMAIL_PATH', '/usr/sbin/sendmail -bs -i'),
        ],

        'log' => [
            'transport' => 'log',
            'channel' => env('MAIL_LOG_CHANNEL'),
        ],

        'array' => [
            'transport' => 'array',
        ],

        'failover' => [
            'transport' => 'failover',
            'mailers' => [
                'smtp',
                'log',
            ],
            'retry_after' => 60,
        ],

        'roundrobin' => [
            'transport' => 'roundrobin',
            'mailers' => [
                'ses',
                'postmark',
            ],
            'retry_after' => 60,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Global "From" Address
    |--------------------------------------------------------------------------
    |
    | You may wish for all emails sent by your application to be sent from
    | the same address. Here you may specify a name and address that is
    | used globally for all emails that are sent by your application.
    |
    */

    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'hello@example.com'),
        'name' => env('MAIL_FROM_NAME', 'Example'),
    ],

];
```

---

## config\queue.php

```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Queue Connection Name
    |--------------------------------------------------------------------------
    |
    | Laravel's queue supports a variety of backends via a single, unified
    | API, giving you convenient access to each backend using identical
    | syntax for each. The default queue connection is defined below.
    |
    */

    'default' => env('QUEUE_CONNECTION', 'database'),

    /*
    |--------------------------------------------------------------------------
    | Queue Connections
    |--------------------------------------------------------------------------
    |
    | Here you may configure the connection options for every queue backend
    | used by your application. An example configuration is provided for
    | each backend supported by Laravel. You're also free to add more.
    |
    | Drivers: "sync", "database", "beanstalkd", "sqs", "redis",
    |          "deferred", "background", "failover", "null"
    |
    */

    'connections' => [

        'sync' => [
            'driver' => 'sync',
        ],

        'database' => [
            'driver' => 'database',
            'connection' => env('DB_QUEUE_CONNECTION'),
            'table' => env('DB_QUEUE_TABLE', 'jobs'),
            'queue' => env('DB_QUEUE', 'default'),
            'retry_after' => (int) env('DB_QUEUE_RETRY_AFTER', 90),
            'after_commit' => false,
        ],

        'beanstalkd' => [
            'driver' => 'beanstalkd',
            'host' => env('BEANSTALKD_QUEUE_HOST', 'localhost'),
            'queue' => env('BEANSTALKD_QUEUE', 'default'),
            'retry_after' => (int) env('BEANSTALKD_QUEUE_RETRY_AFTER', 90),
            'block_for' => 0,
            'after_commit' => false,
        ],

        'sqs' => [
            'driver' => 'sqs',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'prefix' => env('SQS_PREFIX', 'https://sqs.us-east-1.amazonaws.com/your-account-id'),
            'queue' => env('SQS_QUEUE', 'default'),
            'suffix' => env('SQS_SUFFIX'),
            'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
            'after_commit' => false,
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => env('REDIS_QUEUE_CONNECTION', 'default'),
            'queue' => env('REDIS_QUEUE', 'default'),
            'retry_after' => (int) env('REDIS_QUEUE_RETRY_AFTER', 90),
            'block_for' => null,
            'after_commit' => false,
        ],

        'deferred' => [
            'driver' => 'deferred',
        ],

        'background' => [
            'driver' => 'background',
        ],

        'failover' => [
            'driver' => 'failover',
            'connections' => [
                'database',
                'deferred',
            ],
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Job Batching
    |--------------------------------------------------------------------------
    |
    | The following options configure the database and table that store job
    | batching information. These options can be updated to any database
    | connection and table which has been defined by your application.
    |
    */

    'batching' => [
        'database' => env('DB_CONNECTION', 'sqlite'),
        'table' => 'job_batches',
    ],

    /*
    |--------------------------------------------------------------------------
    | Failed Queue Jobs
    |--------------------------------------------------------------------------
    |
    | These options configure the behavior of failed queue job logging so you
    | can control how and where failed jobs are stored. Laravel ships with
    | support for storing failed jobs in a simple file or in a database.
    |
    | Supported drivers: "database-uuids", "dynamodb", "file", "null"
    |
    */

    'failed' => [
        'driver' => env('QUEUE_FAILED_DRIVER', 'database-uuids'),
        'database' => env('DB_CONNECTION', 'sqlite'),
        'table' => 'failed_jobs',
    ],

];
```

---

## config\services.php

```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'evolution' => [
        'url' => env('EVOLUTION_API_URL', 'http://evolution-api:8080'),
        'key' => env('EVOLUTION_API_KEY'),
        'instance' => env('EVOLUTION_INSTANCE_NAME', 'test'),
    ],

];
```

---

## config\session.php

```php
<?php

use Illuminate\Support\Str;

return [

    /*
    |--------------------------------------------------------------------------
    | Default Session Driver
    |--------------------------------------------------------------------------
    |
    | This option determines the default session driver that is utilized for
    | incoming requests. Laravel supports a variety of storage options to
    | persist session data. Database storage is a great default choice.
    |
    | Supported: "file", "cookie", "database", "memcached",
    |            "redis", "dynamodb", "array"
    |
    */

    'driver' => env('SESSION_DRIVER', 'database'),

    /*
    |--------------------------------------------------------------------------
    | Session Lifetime
    |--------------------------------------------------------------------------
    |
    | Here you may specify the number of minutes that you wish the session
    | to be allowed to remain idle before it expires. If you want them
    | to expire immediately when the browser is closed then you may
    | indicate that via the expire_on_close configuration option.
    |
    */

    'lifetime' => (int) env('SESSION_LIFETIME', 120),

    'expire_on_close' => env('SESSION_EXPIRE_ON_CLOSE', false),

    /*
    |--------------------------------------------------------------------------
    | Session Encryption
    |--------------------------------------------------------------------------
    |
    | This option allows you to easily specify that all of your session data
    | should be encrypted before it's stored. All encryption is performed
    | automatically by Laravel and you may use the session like normal.
    |
    */

    'encrypt' => env('SESSION_ENCRYPT', false),

    /*
    |--------------------------------------------------------------------------
    | Session File Location
    |--------------------------------------------------------------------------
    |
    | When utilizing the "file" session driver, the session files are placed
    | on disk. The default storage location is defined here; however, you
    | are free to provide another location where they should be stored.
    |
    */

    'files' => storage_path('framework/sessions'),

    /*
    |--------------------------------------------------------------------------
    | Session Database Connection
    |--------------------------------------------------------------------------
    |
    | When using the "database" or "redis" session drivers, you may specify a
    | connection that should be used to manage these sessions. This should
    | correspond to a connection in your database configuration options.
    |
    */

    'connection' => env('SESSION_CONNECTION'),

    /*
    |--------------------------------------------------------------------------
    | Session Database Table
    |--------------------------------------------------------------------------
    |
    | When using the "database" session driver, you may specify the table to
    | be used to store sessions. Of course, a sensible default is defined
    | for you; however, you're welcome to change this to another table.
    |
    */

    'table' => env('SESSION_TABLE', 'sessions'),

    /*
    |--------------------------------------------------------------------------
    | Session Cache Store
    |--------------------------------------------------------------------------
    |
    | When using one of the framework's cache driven session backends, you may
    | define the cache store which should be used to store the session data
    | between requests. This must match one of your defined cache stores.
    |
    | Affects: "dynamodb", "memcached", "redis"
    |
    */

    'store' => env('SESSION_STORE'),

    /*
    |--------------------------------------------------------------------------
    | Session Sweeping Lottery
    |--------------------------------------------------------------------------
    |
    | Some session drivers must manually sweep their storage location to get
    | rid of old sessions from storage. Here are the chances that it will
    | happen on a given request. By default, the odds are 2 out of 100.
    |
    */

    'lottery' => [2, 100],

    /*
    |--------------------------------------------------------------------------
    | Session Cookie Name
    |--------------------------------------------------------------------------
    |
    | Here you may change the name of the session cookie that is created by
    | the framework. Typically, you should not need to change this value
    | since doing so does not grant a meaningful security improvement.
    |
    */

    'cookie' => env(
        'SESSION_COOKIE',
        Str::slug((string) env('APP_NAME', 'laravel')).'-session'
    ),

    /*
    |--------------------------------------------------------------------------
    | Session Cookie Path
    |--------------------------------------------------------------------------
    |
    | The session cookie path determines the path for which the cookie will
    | be regarded as available. Typically, this will be the root path of
    | your application, but you're free to change this when necessary.
    |
    */

    'path' => env('SESSION_PATH', '/'),

    /*
    |--------------------------------------------------------------------------
    | Session Cookie Domain
    |--------------------------------------------------------------------------
    |
    | This value determines the domain and subdomains the session cookie is
    | available to. By default, the cookie will be available to the root
    | domain without subdomains. Typically, this shouldn't be changed.
    |
    */

    'domain' => env('SESSION_DOMAIN'),

    /*
    |--------------------------------------------------------------------------
    | HTTPS Only Cookies
    |--------------------------------------------------------------------------
    |
    | By setting this option to true, session cookies will only be sent back
    | to the server if the browser has a HTTPS connection. This will keep
    | the cookie from being sent to you when it can't be done securely.
    |
    */

    'secure' => env('SESSION_SECURE_COOKIE'),

    /*
    |--------------------------------------------------------------------------
    | HTTP Access Only
    |--------------------------------------------------------------------------
    |
    | Setting this value to true will prevent JavaScript from accessing the
    | value of the cookie and the cookie will only be accessible through
    | the HTTP protocol. It's unlikely you should disable this option.
    |
    */

    'http_only' => env('SESSION_HTTP_ONLY', true),

    /*
    |--------------------------------------------------------------------------
    | Same-Site Cookies
    |--------------------------------------------------------------------------
    |
    | This option determines how your cookies behave when cross-site requests
    | take place, and can be used to mitigate CSRF attacks. By default, we
    | will set this value to "lax" to permit secure cross-site requests.
    |
    | See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value
    |
    | Supported: "lax", "strict", "none", null
    |
    */

    'same_site' => env('SESSION_SAME_SITE', 'lax'),

    /*
    |--------------------------------------------------------------------------
    | Partitioned Cookies
    |--------------------------------------------------------------------------
    |
    | Setting this value to true will tie the cookie to the top-level site for
    | a cross-site context. Partitioned cookies are accepted by the browser
    | when flagged "secure" and the Same-Site attribute is set to "none".
    |
    */

    'partitioned' => env('SESSION_PARTITIONED_COOKIE', false),

];
```

---

## database\factories\UserFactory.php

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
```

---

## database\migrations\0001_01_01_000000_create_users_table.php

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('email', 150)->nullable()->unique();
            $table->string('phone', 20)->nullable()->unique();
            $table->string('role', 30)->default('customer');
            $table->text('address')->nullable();
            $table->string('avatar')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('is_active')->default(true);
            $table->json('meta')->nullable();
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
```

---

## database\migrations\0001_01_01_000001_create_cache_table.php

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cache', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->mediumText('value');
            $table->integer('expiration')->index();
        });

        Schema::create('cache_locks', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->string('owner');
            $table->integer('expiration')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cache');
        Schema::dropIfExists('cache_locks');
    }
};
```

---

## database\migrations\0001_01_01_000002_create_jobs_table.php

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('queue')->index();
            $table->longText('payload');
            $table->unsignedTinyInteger('attempts');
            $table->unsignedInteger('reserved_at')->nullable();
            $table->unsignedInteger('available_at');
            $table->unsignedInteger('created_at');
        });

        Schema::create('job_batches', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->integer('total_jobs');
            $table->integer('pending_jobs');
            $table->integer('failed_jobs');
            $table->longText('failed_job_ids');
            $table->mediumText('options')->nullable();
            $table->integer('cancelled_at')->nullable();
            $table->integer('created_at');
            $table->integer('finished_at')->nullable();
        });

        Schema::create('failed_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->text('connection');
            $table->text('queue');
            $table->longText('payload');
            $table->longText('exception');
            $table->timestamp('failed_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('job_batches');
        Schema::dropIfExists('failed_jobs');
    }
};
```

---

## database\migrations\2026_02_10_073159_create_customers_table.php

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key', 100)->unique();
            $table->text('value');
            $table->string('type', 20)->default('string');
            $table->string('label', 150);
            $table->string('group', 50)->nullable();
            $table->timestamps();
        });

        Schema::create('menu_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('slug', 100)->unique();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->json('meta')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_categories');
        Schema::dropIfExists('settings');
    }
};
```

---

## database\migrations\2026_02_10_073606_create_menus_table.php

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('menu_categories')->cascadeOnDelete();
            $table->string('name', 150);
            $table->string('slug', 150)->unique();
            $table->text('description')->nullable();
            $table->decimal('price', 12, 2);
            $table->string('image')->nullable();
            $table->integer('stock')->default(0);
            $table->integer('low_stock_threshold')->nullable();
            $table->boolean('is_available')->default(true);
            $table->boolean('is_for_dine_in')->default(true);
            $table->boolean('is_for_catering')->default(true);
            $table->integer('sort_order')->default(0);
            $table->json('meta')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};
```

---

## database\migrations\2026_02_10_073748_create_dine_in_tables_table.php

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dine_in_tables', function (Blueprint $table) {
            $table->id();
            $table->string('table_number', 10)->unique();
            $table->integer('capacity');
            $table->string('status', 20)->default('kosong');
            $table->timestamp('locked_at')->nullable();
            $table->unsignedBigInteger('locked_by_order_id')->nullable()->index();
            $table->string('qr_code_path')->nullable();
            $table->string('location_label', 100)->nullable();
            $table->string('notes')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dine_in_tables');
    }
};
```

---

## database\migrations\2026_02_10_073900_create_orders_table.php

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('unique_code', 30)->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('order_type', 30)->default('dine_in');
            $table->foreignId('dine_in_table_id')->nullable()->constrained('dine_in_tables')->nullOnDelete();
            $table->decimal('subtotal', 12, 2)->default(0);
            $table->decimal('tax_rate', 5, 4)->default(0);
            $table->decimal('tax_amount', 12, 2)->default(0);
            $table->decimal('total_price', 12, 2)->default(0);
            $table->string('payment_status', 20)->default('unpaid');
            $table->string('status', 30)->default('pending');
            $table->text('notes')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->timestamp('arrived_at')->nullable();
            $table->timestamp('preparing_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->string('snap_token')->nullable();
            $table->json('meta')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('dine_in_tables', function (Blueprint $table) {
            $table->foreign('locked_by_order_id')->references('id')->on('orders')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dine_in_tables', function (Blueprint $table) {
            $table->dropForeign(['locked_by_order_id']);
        });

        Schema::dropIfExists('orders');
    }
};
```

---

## database\migrations\2026_02_10_074008_create_order_items_table.php

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
    
            $table->foreignId('order_id')
                  ->constrained()
                  ->cascadeOnDelete();
    
            $table->foreignId('menu_id')->nullable()->constrained('menus')->nullOnDelete();
            $table->string('menu_name', 150);
            $table->integer('qty');
            $table->decimal('price', 12, 2);
            $table->decimal('subtotal', 12, 2);
            $table->string('notes')->nullable();
            $table->json('meta')->nullable();
    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
```

---

## database\migrations\2026_02_10_074056_create_caterings_table.php

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('caterings', function (Blueprint $table) {
            $table->id();
            $table->string('unique_code', 30)->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->date('event_date');
            $table->time('event_time')->nullable();
            $table->text('delivery_address');
            $table->decimal('delivery_fee', 12, 2)->default(0);
            $table->decimal('delivery_distance_km', 6, 2)->nullable();
            $table->string('delivery_zone', 100)->nullable();
            $table->integer('guest_count')->nullable();
            $table->decimal('subtotal', 12, 2)->default(0);
            $table->decimal('tax_rate', 5, 4)->default(0);
            $table->decimal('tax_amount', 12, 2)->default(0);
            $table->decimal('total_price', 12, 2)->default(0);
            $table->decimal('dp_percentage', 5, 4)->default(0.5);
            $table->decimal('dp_amount', 12, 2)->nullable();
            $table->decimal('remaining_amount', 12, 2)->nullable();
            $table->string('payment_type', 20)->default('dp');
            $table->string('payment_status', 20)->default('unpaid');
            $table->string('status', 30)->default('pending');
            $table->text('notes')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->json('meta')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('caterings');
    }
};
```

---

## database\migrations\2026_02_10_074151_create_catering_items_table.php

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('catering_items', function (Blueprint $table) {
            $table->id();
    
            $table->foreignId('catering_id')
                  ->constrained()
                  ->cascadeOnDelete();
    
            $table->foreignId('menu_id')->nullable()->constrained('menus')->nullOnDelete();
            $table->string('menu_name', 150);
            $table->integer('qty');
            $table->decimal('price', 12, 2);
            $table->decimal('subtotal', 12, 2);
            $table->string('notes')->nullable();
            $table->json('meta')->nullable();
    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catering_items');
    }
};
```

---

## database\migrations\2026_02_10_074200_create_mvp_operations_tables.php

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('unique_code', 30)->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('table_id')->nullable()->constrained('dine_in_tables')->nullOnDelete();
            $table->foreignId('order_id')->nullable()->constrained()->nullOnDelete();
            $table->date('reserved_date');
            $table->time('reserved_time');
            $table->integer('guest_count');
            $table->string('status', 30)->default('pending');
            $table->text('notes')->nullable();
            $table->timestamp('auto_cancel_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->string('cancellation_reason')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->morphs('payable');
            $table->string('transaction_id', 100)->unique();
            $table->string('payment_method', 50)->default('cash');
            $table->string('payment_type', 20)->default('full');
            $table->decimal('amount', 12, 2);
            $table->string('status', 20)->default('pending');
            $table->json('gateway_response')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('expired_at')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();
        });

        Schema::create('stock_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_id')->constrained('menus')->cascadeOnDelete();
            $table->foreignId('changed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('change_type', 30);
            $table->integer('qty_before');
            $table->integer('qty_change');
            $table->integer('qty_after');
            $table->string('reason')->nullable();
            $table->nullableMorphs('reference');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->string('status', 20)->default('open');
            $table->timestamp('last_message_at')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sender_id')->constrained('users')->cascadeOnDelete();
            $table->text('message');
            $table->string('channel', 20)->default('whatsapp');
            $table->string('direction', 10)->default('inbound');
            $table->string('external_id', 100)->nullable();
            $table->boolean('is_read')->default(false);
            $table->timestamp('read_at')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();
        });

        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('type', 100);
            $table->string('title');
            $table->text('body');
            $table->string('channel', 20)->default('in_app');
            $table->string('status', 20)->default('pending');
            $table->nullableMorphs('notifiable');
            $table->timestamp('read_at')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->string('failed_reason')->nullable();
            $table->timestamps();
        });

        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->morphs('rateable');
            $table->tinyInteger('stars');
            $table->text('comment')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ratings');
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('conversations');
        Schema::dropIfExists('stock_logs');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('reservations');
    }
};
```

---

## database\seeders\DatabaseSeeder.php

```php
<?php

namespace Database\Seeders;

use App\Models\DineInTable;
use App\Models\Menu;
use App\Models\MenuCategory;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        collect([
            ['key' => 'tax_rate', 'value' => '0.11', 'type' => 'float', 'label' => 'PPN', 'group' => 'payment'],
            ['key' => 'auto_cancel_minutes', 'value' => '30', 'type' => 'integer', 'label' => 'Auto-cancel reservasi', 'group' => 'reservation'],
            ['key' => 'low_stock_threshold', 'value' => '5', 'type' => 'integer', 'label' => 'Batas stok rendah', 'group' => 'stock'],
            ['key' => 'dp_percentage', 'value' => '0.50', 'type' => 'float', 'label' => 'DP catering', 'group' => 'payment'],
            ['key' => 'delivery_fee_per_km', 'value' => '5000', 'type' => 'integer', 'label' => 'Ongkir per km', 'group' => 'catering'],
        ])->each(fn ($setting) => Setting::updateOrCreate(['key' => $setting['key']], $setting));

        User::updateOrCreate(
            ['email' => 'admin@rmkembar.test'],
            ['name' => 'Admin RM Kembar', 'phone' => '6281111111111', 'role' => 'admin', 'password' => 'password', 'is_active' => true]
        );

        User::updateOrCreate(
            ['email' => 'owner@rmkembar.test'],
            ['name' => 'Owner RM Kembar', 'phone' => '6281222222222', 'role' => 'owner', 'password' => 'password', 'is_active' => true]
        );

        User::updateOrCreate(
            ['email' => 'kitchen@rmkembar.test'],
            ['name' => 'Kitchen RM Kembar', 'phone' => '6281333333333', 'role' => 'kitchen', 'password' => 'password', 'is_active' => true]
        );

        $categories = collect([
            ['name' => 'Ayam', 'slug' => 'ayam', 'sort_order' => 1],
            ['name' => 'Nasi & Lainnya', 'slug' => 'nasi-lainnya', 'sort_order' => 2],
            ['name' => 'Minuman', 'slug' => 'minuman', 'sort_order' => 3],
        ])->mapWithKeys(fn ($category) => [
            $category['slug'] => MenuCategory::updateOrCreate(['slug' => $category['slug']], $category),
        ]);

        collect([
            ['category' => 'ayam', 'name' => 'Ayam Bakar Kembar', 'slug' => 'ayam-bakar-kembar', 'description' => 'Ayam bakar bumbu manis gurih dengan sambal dan lalapan.', 'price' => 28000, 'stock' => 25, 'sort_order' => 1],
            ['category' => 'ayam', 'name' => 'Ayam Goreng Serundeng', 'slug' => 'ayam-goreng-serundeng', 'description' => 'Ayam goreng renyah dengan taburan serundeng.', 'price' => 26000, 'stock' => 20, 'sort_order' => 2],
            ['category' => 'nasi-lainnya', 'name' => 'Nasi Putih', 'slug' => 'nasi-putih', 'description' => 'Nasi putih hangat.', 'price' => 6000, 'stock' => 60, 'sort_order' => 3],
            ['category' => 'nasi-lainnya', 'name' => 'Paket Kembar Hemat', 'slug' => 'paket-kembar-hemat', 'description' => 'Nasi, ayam, tahu tempe, sambal, dan es teh.', 'price' => 36000, 'stock' => 18, 'sort_order' => 4],
            ['category' => 'minuman', 'name' => 'Es Teh Manis', 'slug' => 'es-teh-manis', 'description' => 'Teh manis dingin.', 'price' => 7000, 'stock' => 40, 'sort_order' => 5],
            ['category' => 'minuman', 'name' => 'Es Jeruk', 'slug' => 'es-jeruk', 'description' => 'Jeruk peras segar dengan es.', 'price' => 10000, 'stock' => 30, 'sort_order' => 6],
        ])->each(function ($menu) use ($categories) {
            Menu::updateOrCreate(
                ['slug' => $menu['slug']],
                [
                    'category_id' => $categories[$menu['category']]->id,
                    'name' => $menu['name'],
                    'description' => $menu['description'],
                    'price' => $menu['price'],
                    'stock' => $menu['stock'],
                    'low_stock_threshold' => 5,
                    'is_available' => true,
                    'is_for_dine_in' => true,
                    'is_for_catering' => true,
                    'sort_order' => $menu['sort_order'],
                ]
            );
        });

        foreach (range(1, 10) as $number) {
            DineInTable::updateOrCreate(
                ['table_number' => (string) $number],
                ['capacity' => $number <= 4 ? 4 : 6, 'status' => 'kosong', 'location_label' => $number <= 6 ? 'Indoor' : 'Outdoor']
            );
        }
    }
}
```

---

## public\index.php

```php
<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
```

---

## resources\css\app.css

```css
@import 'tailwindcss';

@source '../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php';
@source '../../storage/framework/views/*.php';
@source '../**/*.blade.php';
@source '../**/*.js';

@theme {
    --font-sans: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol', 'Noto Color Emoji';
}
```

---

## resources\js\app.js

```javascript
import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    title: (title) => (title ? `${title} - RM Kembar` : 'RM Kembar'),
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(createElement(App, props));
    },
    progress: {
        color: '#b91c1c',
    },
});
```

---

## resources\js\bootstrap.js

```javascript
import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import './echo';
```

---

## resources\js\Components\navbar.jsx

```jsx
import React from "react";

export default function Navbar() {
    return (
        <nav className="w-full bg-[#140028] text-white px-16 py-5 flex items-center justify-between">

            {/* LEFT - LOGO */}
            <div className="flex items-center gap-4">

                <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="w-16 h-16 object-contain"
                />

                <div className="leading-none">
                    <p className="text-[13px] italic font-light">
                        Warung Makan
                    </p>

                    <h1 className="text-5xl font-serif">
                        Kembar
                    </h1>
                </div>
            </div>

            {/* CENTER MENU */}
            <div className="flex items-center gap-16 text-3xl font-semibold">

                <a
                    href="#"
                    className="hover:text-red-400 transition duration-200"
                >
                    Beranda
                </a>

                <a
                    href="#"
                    className="hover:text-red-400 transition duration-200"
                >
                    Dine-In
                </a>

                <a
                    href="#"
                    className="hover:text-red-400 transition duration-200"
                >
                    Catering
                </a>

                <a
                    href="#"
                    className="hover:text-red-400 transition duration-200"
                >
                    Location
                </a>

                <a
                    href="#"
                    className="hover:text-red-400 transition duration-200"
                >
                    About Us
                </a>
            </div>

            {/* RIGHT USER */}
            <div className="flex items-center gap-3">

                <span className="text-3xl font-semibold">
                    User
                </span>

                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                        src="/images/user.png"
                        alt="User"
                        className="w-full h-full object-cover"
                    />
                </div>

            </div>
        </nav>
    );
}
```

---

## resources\js\echo.js

```javascript
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const reverbKey = import.meta.env.VITE_REVERB_APP_KEY;

if (reverbKey && reverbKey !== 'dummy-reverb-key' && reverbKey !== 'dummy-key') {
    window.Echo = new Echo({
        broadcaster: 'reverb',
        key: reverbKey,
        wsHost: import.meta.env.VITE_REVERB_HOST ?? '127.0.0.1',
        wsPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
        wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
        forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'http') === 'https',
        enabledTransports: ['ws', 'wss'],
    });
} else {
    console.warn("Laravel Echo/Reverb is disabled: VITE_REVERB_APP_KEY is not configured.");
}
```

---

## resources\js\Layouts\AdminLayout.jsx

```jsx
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const { flash, errors } = usePage().props;

    return (
        <div className="min-h-screen bg-zinc-100 text-zinc-950 md:grid md:grid-cols-[240px_1fr]">
            <aside className="border-r border-zinc-200 bg-white p-4">
                <Link className="text-xl font-black" href="/admin/dashboard">RM Kembar</Link>
                <nav className="mt-6 grid gap-1 text-sm font-medium">
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/admin/dashboard">Dashboard</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/admin/pesanan">Pesanan</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/admin/reservasi">Reservasi</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/admin/menu">Menu</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/admin/kategori">Kategori Menu</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/admin/stok-meja">Stok & Meja</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/admin/pengguna">Pengguna</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/admin/laporan">Laporan</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/admin/pengaturan">Pengaturan</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/kitchen">Kitchen</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/">Beranda</Link>
                </nav>
                <Link method="post" as="button" href="/logout" className="mt-6 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold hover:bg-zinc-100">Keluar</Link>
            </aside>
            <main className="p-4 md:p-6">
                {(flash?.status || Object.keys(errors || {}).length > 0) && (
                    <div className="mb-4">
                        {flash?.status && <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{flash.status}</div>}
                        {Object.keys(errors || {}).length > 0 && <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{Object.values(errors)[0]}</div>}
                    </div>
                )}
                {children}
            </main>

                


        </div>
    );
}
```

---

## resources\js\Layouts\AppLayout.jsx

```jsx
import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ChefHat, Phone, Mail, MapPin, Menu as MenuIcon, X } from 'lucide-react';

export function money(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(Number(value || 0));
}

export function statusText(value) {
    return String(value || '-').replaceAll('_', ' ');
}

export default function AppLayout({ children }) {
    const { auth, flash, errors } = usePage().props;
    const user = auth?.user;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-950 overflow-x-hidden">
            <header className="sticky top-0 z-20 bg-[#140028] text-white shadow-md">

<div className="mx-auto flex items-center justify-between px-6 md:px-10 py-5 relative">

    {/* LEFT LOGO */}
    <div className="flex items-center gap-3 md:gap-4">

        <img
            src="/images/logo.png"
            alt="Logo"
            className="h-16 w-16 object-contain"
        />

        <div className="leading-none">
            <p className="text-xs italic font-light">
                Rumah Makan
            </p>

            <h1 className="text-2xl md:text-4xl font-serif">
                Kembar
            </h1>
        </div>
    </div>

    {/* CENTER MENU */}
    <nav className="hidden md:flex items-center gap-14 text-2xl font-semibold">

        <Link
            href="/"
            className="hover:text-red-400 transition"
        >
            Beranda
        </Link>

        <Link
            href="/menu"
            className="hover:text-red-400 transition"
        >
            Dine-In
        </Link>

        <Link
            href="/catering"
            className="hover:text-red-400 transition"
        >
            Catering
        </Link>

        <Link
            href="/about"
            className="hover:text-red-400 transition"
        >
            About Us
        </Link>
    </nav>

    {/* RIGHT USER */}
    <div className="hidden md:flex items-center gap-4">

        {user ? (
            <>
                <span className="text-2xl font-semibold">
                    {user.name}
                </span>

                <div className="h-14 w-14 rounded-full bg-gray-200 overflow-hidden">
                    <img
                        src="/images/user.png"
                        alt="User"
                        className="h-full w-full object-cover"
                    />
                </div>
            </>
        ) : (
            <>
                <Link
                    href="/login"
                    className="text-xl font-semibold hover:text-red-400"
                >
                    Masuk
                </Link>

                <Link
                    href="/register"
                    className="rounded-full bg-red-600 px-5 py-2 text-lg font-semibold hover:bg-red-700"
                >
                    Daftar
                </Link>
            </>
        )}

    </div>

    {/* MOBILE MENU BUTTON */}
    <div className="md:hidden flex items-center">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white hover:text-red-400">
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
    </div>

    {/* MOBILE MENU PANEL */}
    {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#140028] border-t border-purple-900 shadow-lg py-4 px-6 flex flex-col gap-4 z-50">
            <Link href="/" className="text-xl font-semibold hover:text-red-400" onClick={() => setIsMobileMenuOpen(false)}>Beranda</Link>
            <Link href="/menu" className="text-xl font-semibold hover:text-red-400" onClick={() => setIsMobileMenuOpen(false)}>Dine-In</Link>
            <Link href="/catering" className="text-xl font-semibold hover:text-red-400" onClick={() => setIsMobileMenuOpen(false)}>Catering</Link>
            <Link href="/about" className="text-xl font-semibold hover:text-red-400" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <hr className="border-purple-800" />
            {user ? (
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                        <img src="/images/user.png" alt="User" className="h-full w-full object-cover" />
                    </div>
                    <span className="text-xl font-semibold">{user.name}</span>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    <Link href="/login" className="text-xl font-semibold hover:text-red-400" onClick={() => setIsMobileMenuOpen(false)}>Masuk</Link>
                    <Link href="/register" className="w-full text-center rounded-full bg-red-600 px-5 py-2 text-lg font-semibold hover:bg-red-700" onClick={() => setIsMobileMenuOpen(false)}>Daftar</Link>
                </div>
            )}
        </div>
    )}

</div>

</header>

            {(flash?.status || Object.keys(errors || {}).length > 0) && (
                <div className="mx-auto max-w-6xl px-4 pt-4">
                    {flash?.status && <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{flash.status}</div>}
                    {Object.keys(errors || {}).length > 0 && (
                        <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{Object.values(errors)[0]}</div>
                    )}
                </div>
            )}

            <main>{children}</main>

            

            <footer className="bg-[#12002F] text-white">
          <div className="max-w-7xl mx-auto px-8 py-16">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-grey-500 to-white-500 rounded-lg flex items-center justify-center">
                    <img src="/images/logo.png" alt="" />
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="tracking-wide">Warung Makan</div>
                    <div className="tracking-wide -mt-1">Kembar</div>
                  </div>
                </div>
                <p className="text-purple-300 text-sm">
                  Authentic Indonesian cuisine with a modern touch
                </p>
              </div>
  
              <div>
                <h4 className="text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2 text-purple-300">
                  <li><a href="/" className="hover:text-white transition-colors">Beranda</a></li>
                  <li><a href="/menu" className="hover:text-white transition-colors">Dine-In</a></li>
                  <li><a href="/catering" className="hover:text-white transition-colors">Catering</a></li>
                  <li><a href="/about" className="hover:text-white transition-colors">Location</a></li>
                </ul>
              </div>
  
              <div>
                <h4 className="text-lg mb-4">Contact</h4>
                <ul className="space-y-3 text-purple-300">
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+62 21 1234 5678</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>info@warungkembar.com</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Jakarta Pusat</span>
                  </li>
                </ul>
              </div>
  
              <div>
                <h4 className="text-lg mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  
                  {/* bagian social media dah pokoknya */}
                  
                </div>
              </div>
            </div>
  
            <div className="border-t border-purple-800 pt-8 text-center text-purple-300 text-sm">
              <p>&copy; 2026 Warung Makan Kembar. All rights reserved.</p>
            </div>
          </div>
        </footer>
        
        
        </div>

        
            


    );
}
```

---

## resources\js\Layouts\footer.jsx

```jsx
(file kosong)
```

---

## resources\js\Pages\Admin\Categories.jsx

```jsx
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Categories({ categories }) {
    return (
        <AdminLayout>
            <Head title="Kategori Menu" />
            <h1 className="text-2xl font-bold">Manajemen Kategori Menu</h1>
            <CategoryForm />
            <section className="mt-5 space-y-3">
                {categories.map((category) => <CategoryForm key={category.id} category={category} />)}
            </section>
        </AdminLayout>
    );
}

function CategoryForm({ category }) {
    const isEdit = Boolean(category);
    const { data, setData, post, put, processing, reset, errors } = useForm(isEdit ? {
        name: category.name,
        sort_order: category.sort_order || 0,
    } : { name: '', sort_order: 0 });

    function submit(e) {
        e.preventDefault();
        isEdit 
            ? put(`/admin/kategori/${category.id}`, { preserveScroll: true }) 
            : post('/admin/kategori', { preserveScroll: true, onSuccess: () => reset() });
    }

    return (
        <form className={`rounded-md border border-zinc-200 bg-white p-4 ${isEdit ? '' : 'mt-5'}`} onSubmit={submit}>
            <div className="mb-3 flex justify-between gap-3">
                <h2 className="font-bold">{isEdit ? category.name : 'Tambah Kategori'}</h2>
            </div>
            
            {errors.message && (
                <div className="mb-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">
                    {errors.message}
                </div>
            )}

            <div className="grid gap-3 md:grid-cols-[1fr_100px_auto]">
                <div>
                    <input className="w-full rounded-md border border-zinc-300 px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Nama Kategori" required />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>
                <div>
                    <input className="w-full rounded-md border border-zinc-300 px-3 py-2" type="number" value={data.sort_order} onChange={(e) => setData('sort_order', e.target.value)} placeholder="Urutan" />
                    {errors.sort_order && <p className="mt-1 text-xs text-red-600">{errors.sort_order}</p>}
                </div>
                
                <div className="flex gap-2">
                    <button disabled={processing} className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">
                        {isEdit ? 'Update' : 'Simpan'}
                    </button>
                    {isEdit && (
                        <button type="button" onClick={() => {
                            if (confirm('Yakin ingin menghapus kategori ini?')) {
                                router.delete(`/admin/kategori/${category.id}`, { preserveScroll: true });
                            }
                        }} className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">
                            Hapus
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}
```

---

## resources\js\Pages\Admin\Dashboard.jsx

```jsx
import { Head } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { money, statusText } from '../../Layouts/AppLayout';

export default function Dashboard({ ordersToday, revenueToday, activeOrders, occupiedTables, lowStockMenus, recentOrders }) {
    return (
        <AdminLayout>
            <Head title="Dashboard Admin" />
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <Stat label="Pesanan hari ini" value={ordersToday} />
                <Stat label="Revenue hari ini" value={money(revenueToday)} />
                <Stat label="Pesanan aktif" value={activeOrders} />
                <Stat label="Meja dipakai" value={occupiedTables} />
            </div>
            <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_360px]">
                <section className="rounded-md border border-zinc-200 bg-white">
                    <div className="border-b border-zinc-200 p-4"><h2 className="font-bold">Pesanan terbaru</h2></div>
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-50 text-zinc-600"><tr><th className="p-3">Kode</th><th className="p-3">Customer</th><th className="p-3">Meja</th><th className="p-3">Status</th><th className="p-3 text-right">Total</th></tr></thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-t border-zinc-100">
                                        <td className="p-3 font-semibold text-red-700">{order.unique_code}</td>
                                        <td className="p-3">{order.user?.name}</td>
                                        <td className="p-3">{order.table?.table_number || '-'}</td>
                                        <td className="p-3">{statusText(order.status)}</td>
                                        <td className="p-3 text-right">{money(order.total_price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                <section className="rounded-md border border-zinc-200 bg-white p-4">
                    <h2 className="font-bold">Stok rendah</h2>
                    <div className="mt-3 space-y-2">
                        {lowStockMenus.length === 0 ? <p className="text-sm text-zinc-600">Stok aman.</p> : lowStockMenus.map((menu) => (
                            <div key={menu.id} className="flex justify-between rounded-md bg-zinc-50 p-3 text-sm"><span>{menu.name}</span><span className="font-bold">{menu.stock}</span></div>
                        ))}
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}

function Stat({ label, value }) {
    return <div className="rounded-md border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-600">{label}</p><p className="mt-1 text-3xl font-bold">{value}</p></div>;
}
```

---

## resources\js\Pages\Admin\Menu.jsx

```jsx
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { money } from '../../Layouts/AppLayout';

const blank = { category_id: '', name: '', description: '', price: '', stock: 0, low_stock_threshold: 5, sort_order: 0, is_available: true, is_for_dine_in: true, is_for_catering: true };

export default function Menu({ menus, categories }) {
    return (
        <AdminLayout>
            <Head title="Menu" />
            <h1 className="text-2xl font-bold">Manajemen Menu</h1>
            <MenuForm categories={categories} />
            <section className="mt-5 space-y-3">
                {menus.map((menu) => <MenuForm key={menu.id} menu={menu} categories={categories} />)}
            </section>
        </AdminLayout>
    );
}

function MenuForm({ menu, categories }) {
    const isEdit = Boolean(menu);
    const { data, setData, post, processing, reset } = useForm(isEdit ? {
        category_id: menu.category_id,
        name: menu.name,
        description: menu.description || '',
        price: menu.price,
        stock: menu.stock,
        low_stock_threshold: menu.low_stock_threshold || 5,
        sort_order: menu.sort_order || 0,
        is_available: menu.is_available,
        is_for_dine_in: menu.is_for_dine_in,
        is_for_catering: menu.is_for_catering,
        image: null,
        _method: 'put',
    } : { ...blank, category_id: categories[0]?.id || '', image: null });

    function submit(e) {
        e.preventDefault();
        isEdit 
            ? post(`/admin/menu/${menu.id}`, { preserveScroll: true, forceFormData: true }) 
            : post('/admin/menu', { preserveScroll: true, forceFormData: true, onSuccess: () => reset() });
    }

    return (
        <form className={`rounded-md border border-zinc-200 bg-white p-4 ${isEdit ? '' : 'mt-5'}`} onSubmit={submit} encType="multipart/form-data">
            <div className="mb-3 flex justify-between gap-3">
                <h2 className="font-bold">{isEdit ? menu.name : 'Tambah menu'}</h2>
                {isEdit && <span className="text-sm font-semibold text-red-700">{money(menu.price)}</span>}
            </div>
            {isEdit && menu.image && (
                <div className="mb-4">
                    <img src={menu.image} alt={menu.name} className="h-32 w-32 object-cover rounded-md shadow-sm" />
                </div>
            )}
            <div className="grid gap-3 md:grid-cols-4">
                <select className="rounded-md border border-zinc-300 px-3 py-2" value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} required>
                    {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Nama menu" required />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" min="0" value={data.price} onChange={(e) => setData('price', e.target.value)} placeholder="Harga" required />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" min="0" value={data.stock} onChange={(e) => setData('stock', e.target.value)} placeholder="Stok" required />
                <textarea className="rounded-md border border-zinc-300 px-3 py-2 md:col-span-2" value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Deskripsi" />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" min="0" value={data.low_stock_threshold} onChange={(e) => setData('low_stock_threshold', e.target.value)} placeholder="Batas stok rendah" />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" value={data.sort_order} onChange={(e) => setData('sort_order', e.target.value)} placeholder="Urutan" />
                
                <div className="md:col-span-2">
                    <label className="block text-sm text-zinc-600 mb-1">Gambar Menu</label>
                    <input className="w-full text-sm text-zinc-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200" type="file" accept="image/*" onChange={(e) => setData('image', e.target.files[0])} />
                </div>
                <div className="md:col-span-2 flex flex-col justify-center gap-2">
                    {['is_available', 'is_for_dine_in', 'is_for_catering'].map((key) => <label key={key} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(data[key])} onChange={(e) => setData(key, e.target.checked)} /> {key.replace('is_', '').replaceAll('_', ' ')}</label>)}
                </div>
                
                <div className="flex gap-2 md:col-span-4 mt-2">
                    <button disabled={processing} className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">{isEdit ? 'Update' : 'Simpan Menu'}</button>
                    {isEdit && <button type="button" onClick={() => router.delete(`/admin/menu/${menu.id}`, { preserveScroll: true })} className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700">Hapus</button>}
                </div>
            </div>
        </form>
    );
}
```

---

## resources\js\Pages\Admin\Orders.jsx

```jsx
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { money, statusText } from '../../Layouts/AppLayout';

export default function Orders({ orders, filters }) {
    function transition(order, action) {
        router.post(`/admin/pesanan/${order.id}/${action}`, action === 'cancel' ? { cancellation_reason: 'Dibatalkan admin' } : {}, { preserveScroll: true });
    }

    function filter(e) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        router.get('/admin/pesanan', Object.fromEntries(form.entries()), { preserveState: true });
    }

    return (
        <AdminLayout>
            <Head title="Pesanan" />
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">Pesanan</h1>
            </div>
            <form className="mt-5 grid gap-3 rounded-md border border-zinc-200 bg-white p-4 sm:grid-cols-[1fr_220px_auto]" onSubmit={filter}>
                <input className="rounded-md border border-zinc-300 px-3 py-2" name="q" defaultValue={filters?.q || ''} placeholder="Cari kode, nama, atau WhatsApp" />
                <select className="rounded-md border border-zinc-300 px-3 py-2 text-sm" name="status" defaultValue={filters?.status || ''}>
                    <option value="">Semua status</option>
                    {['pending', 'paid_waiting', 'on_site', 'preparing', 'completed', 'cancelled'].map((status) => <option key={status} value={status}>{statusText(status)}</option>)}
                </select>
                <button className="rounded-md bg-zinc-900 px-4 py-2 font-semibold text-white">Cari</button>
            </form>
            <div className="mt-5 space-y-4">
                {orders.data.map((order) => (
                    <article key={order.id} className="rounded-md border border-zinc-200 bg-white p-4">
                        <div className="flex flex-wrap justify-between gap-3">
                            <div>
                                <h2 className="font-bold text-red-700">{order.unique_code}</h2>
                                <p className="text-sm text-zinc-600">{order.user?.name} - Meja {order.table?.table_number || '-'} - {statusText(order.status)}</p>
                            </div>
                            <p className="font-bold">{money(order.total_price)}</p>
                        </div>
                        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                            {order.items.map((item) => <div key={item.id} className="rounded-md bg-zinc-50 p-3"><p className="font-semibold">{item.qty} x {item.menu_name}</p>{item.notes && <p className="text-zinc-600">{item.notes}</p>}</div>)}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {Object.entries({ paid: 'Validasi Bayar', arrive: 'Tiba', prepare: 'Masak', complete: 'Selesai' }).map(([action, label]) => (
                                <button key={action} onClick={() => transition(order, action)} className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-700">{label}</button>
                            ))}
                            <button onClick={() => transition(order, 'cancel')} className="rounded-md border border-red-300 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">Batal</button>
                        </div>
                    </article>
                ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
                {orders.links?.map((link, index) => (
                    <Link key={index} href={link.url || '#'} preserveScroll className={`rounded-md border px-3 py-2 text-sm ${link.active ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                ))}
            </div>
        </AdminLayout>
    );
}
```

---

## resources\js\Pages\Admin\Reports.jsx

```jsx
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { money } from '../../Layouts/AppLayout';

export default function Reports({ filters, summary, dailyRevenue, categoryRevenue }) {
    function filter(e) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        router.get('/admin/laporan', Object.fromEntries(form.entries()), { preserveState: true });
    }

    const exportUrl = `/admin/laporan/export?from=${filters.from}&to=${filters.to}`;

    return (
        <AdminLayout>
            <Head title="Laporan" />
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">Laporan Penjualan</h1>
                <div className="flex gap-2">
                    <a className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700" href={`${exportUrl}&type=excel`}>Export Excel</a>
                    <a className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700" href={`${exportUrl}&type=pdf`}>Export PDF</a>
                </div>
            </div>
            <form className="mt-5 grid gap-3 rounded-md border border-zinc-200 bg-white p-4 sm:grid-cols-[1fr_1fr_auto]" onSubmit={filter}>
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="date" name="from" defaultValue={filters.from} />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="date" name="to" defaultValue={filters.to} />
                <button className="rounded-md bg-red-700 px-4 py-2 font-semibold text-white">Filter</button>
            </form>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Stat label="Transaksi paid" value={summary.orders} />
                <Stat label="Revenue" value={money(summary.revenue)} />
                <Stat label="Rata-rata transaksi" value={money(summary.averageOrderValue)} />
            </div>
            <div className="mt-6 grid gap-5 xl:grid-cols-2">
                <ReportTable title="Revenue harian" rows={dailyRevenue} columns={[['date', 'Tanggal'], ['orders', 'Transaksi'], ['revenue', 'Revenue']]} />
                <ReportTable title="Revenue kategori" rows={categoryRevenue} columns={[['category', 'Kategori'], ['qty', 'Qty'], ['revenue', 'Revenue']]} />
            </div>
        </AdminLayout>
    );
}

function Stat({ label, value }) {
    return <div className="rounded-md border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-600">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>;
}

function ReportTable({ title, rows, columns }) {
    return (
        <section className="rounded-md border border-zinc-200 bg-white">
            <div className="border-b border-zinc-200 p-4"><h2 className="font-bold">{title}</h2></div>
            <div className="overflow-x-auto w-full">
                <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 text-zinc-600">
                        <tr>{columns.map(([, label]) => <th key={label} className="p-3">{label}</th>)}</tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr><td className="p-3 text-zinc-600" colSpan={columns.length}>Belum ada data.</td></tr>
                        ) : rows.map((row, index) => (
                            <tr key={index} className="border-t border-zinc-100">
                                {columns.map(([key]) => <td key={key} className="p-3">{key === 'revenue' ? money(row[key]) : row[key]}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
```

---

## resources\js\Pages\Admin\Reservations.jsx

```jsx
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Reservations({ reservations, tables }) {
    return (
        <AdminLayout>
            <Head title="Manajemen Reservasi" />
            <h1 className="text-2xl font-bold">Manajemen Reservasi</h1>
            
            <div className="mt-5 grid gap-4">
                {reservations.length === 0 ? (
                    <div className="rounded-md border border-zinc-200 bg-white p-6 text-center text-zinc-500">
                        Belum ada reservasi.
                    </div>
                ) : (
                    reservations.map((reservation) => (
                        <ReservationCard key={reservation.id} reservation={reservation} tables={tables} />
                    ))
                )}
            </div>
        </AdminLayout>
    );
}

function ReservationCard({ reservation, tables }) {
    const { data, setData, put, processing } = useForm({
        status: reservation.status,
        table_id: reservation.table_id || '',
    });

    function submit(e) {
        e.preventDefault();
        put(`/admin/reservasi/${reservation.id}`, { preserveScroll: true });
    }

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-blue-100 text-blue-800',
        completed: 'bg-emerald-100 text-emerald-800',
        cancelled: 'bg-red-100 text-red-800',
    };

    return (
        <form className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm" onSubmit={submit}>
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-100 pb-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold">Reservasi #{reservation.id}</h2>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${statusColors[reservation.status] || 'bg-zinc-100'}`}>
                            {reservation.status}
                        </span>
                    </div>
                    <p className="mt-1 font-medium text-zinc-800">{reservation.user?.name} ({reservation.user?.phone})</p>
                    <p className="text-sm text-zinc-600">Waktu: {new Date(reservation.reservation_time).toLocaleString('id-ID')}</p>
                    <p className="text-sm text-zinc-600">Pax: {reservation.guest_count} orang</p>
                </div>
            </div>
            
            <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-semibold text-zinc-700">Tugaskan Meja</label>
                    <select 
                        className="w-full rounded-md border border-zinc-300 px-3 py-2 disabled:bg-zinc-100" 
                        value={data.table_id} 
                        onChange={(e) => setData('table_id', e.target.value)}
                        disabled={reservation.status === 'cancelled' || reservation.status === 'completed'}
                    >
                        <option value="">-- Belum ada meja --</option>
                        {tables.map(table => (
                            <option key={table.id} value={table.id}>
                                Meja {table.table_number} ({table.capacity} pax) - {table.location_label}
                            </option>
                        ))}
                        {reservation.table && !tables.find(t => t.id === reservation.table_id) && (
                            <option value={reservation.table_id}>Meja {reservation.table.table_number} (Saat ini)</option>
                        )}
                    </select>
                </div>
                <div>
                    <label className="mb-1 block text-sm font-semibold text-zinc-700">Status</label>
                    <select 
                        className="w-full rounded-md border border-zinc-300 px-3 py-2 disabled:bg-zinc-100" 
                        value={data.status} 
                        onChange={(e) => setData('status', e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {reservation.notes && (
                <div className="mt-4 rounded-md bg-zinc-50 p-3 text-sm text-zinc-700 border border-zinc-200">
                    <strong>Catatan:</strong> {reservation.notes}
                </div>
            )}

            <div className="mt-4 flex justify-end">
                <button 
                    type="submit" 
                    disabled={processing} 
                    className="rounded-md bg-zinc-900 px-6 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:bg-zinc-400"
                >
                    Update Reservasi
                </button>
            </div>
        </form>
    );
}
```

---

## resources\js\Pages\Admin\Settings.jsx

```jsx
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Settings({ settings }) {
    const initial = Object.values(settings || {}).flat().reduce((values, setting) => ({ ...values, [setting.key]: setting.value }), {});
    const { data, setData, put, processing } = useForm({ settings: initial });

    function submit(e) {
        e.preventDefault();
        put('/admin/pengaturan', { preserveScroll: true });
    }

    return (
        <AdminLayout>
            <Head title="Pengaturan" />
            <h1 className="text-2xl font-bold">Pengaturan Sistem</h1>
            <form className="mt-5 space-y-5" onSubmit={submit}>
                {Object.entries(settings || {}).map(([group, groupSettings]) => (
                    <section key={group || 'general'} className="rounded-md border border-zinc-200 bg-white p-4">
                        <h2 className="font-bold capitalize">{group || 'general'}</h2>
                        <div className="mt-3 grid gap-3 md:grid-cols-2">
                            {groupSettings.map((setting) => (
                                <label key={setting.key} className="block text-sm font-medium">
                                    {setting.label}
                                    <input
                                        className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
                                        value={data.settings?.[setting.key] ?? ''}
                                        onChange={(e) => setData('settings', { ...data.settings, [setting.key]: e.target.value })}
                                    />
                                    <span className="mt-1 block text-xs text-zinc-500">{setting.key} - {setting.type}</span>
                                </label>
                            ))}
                        </div>
                    </section>
                ))}
                <button disabled={processing} className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">Simpan Pengaturan</button>
            </form>
        </AdminLayout>
    );
}
```

---

## resources\js\Pages\Admin\Tables.jsx

```jsx
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Tables({ tables }) {
    const { data, setData, post, processing, reset } = useForm({ table_number: '', capacity: '', location_label: '', notes: '' });

    function submit(e) {
        e.preventDefault();
        post('/admin/stok-meja', { preserveScroll: true, onSuccess: () => reset() });
    }

    return (
        <AdminLayout>
            <Head title="Stok & Meja" />
            <h1 className="text-2xl font-bold">Manajemen Meja</h1>
            <form className="mt-5 grid gap-3 rounded-md border border-zinc-200 bg-white p-4 md:grid-cols-5" onSubmit={submit}>
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.table_number} onChange={(e) => setData('table_number', e.target.value)} placeholder="Nomor meja" required />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" min="1" value={data.capacity} onChange={(e) => setData('capacity', e.target.value)} placeholder="Kapasitas" required />
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.location_label} onChange={(e) => setData('location_label', e.target.value)} placeholder="Lokasi" />
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.notes} onChange={(e) => setData('notes', e.target.value)} placeholder="Catatan" />
                <button disabled={processing} className="rounded-md bg-red-700 px-4 py-2 font-semibold text-white">Tambah</button>
            </form>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {tables.map((table) => <TableCard key={table.id} table={table} />)}
            </div>
        </AdminLayout>
    );
}

function TableCard({ table }) {
    const { data, setData, put, processing } = useForm({
        capacity: table.capacity,
        status: table.status,
        location_label: table.location_label || '',
        notes: table.notes || '',
    });

    function submit(e) {
        e.preventDefault();
        put(`/admin/stok-meja/${table.id}`, { preserveScroll: true });
    }

    return (
        <form className="rounded-md border border-zinc-200 bg-white p-4" onSubmit={submit}>
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="font-bold">Meja {table.table_number}</h2>
                    <p className="text-sm text-zinc-600">{table.location_label}</p>
                </div>
                <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-semibold">{table.status}</span>
            </div>
            <div className="mt-3 grid gap-2">
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" min="1" value={data.capacity} onChange={(e) => setData('capacity', e.target.value)} />
                <select className="rounded-md border border-zinc-300 px-3 py-2" value={data.status} onChange={(e) => setData('status', e.target.value)}>
                    {['kosong', 'locked', 'terisi', 'reserved'].map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.location_label} onChange={(e) => setData('location_label', e.target.value)} />
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.notes} onChange={(e) => setData('notes', e.target.value)} />
            </div>
            <a className="mt-3 block break-all rounded-md bg-zinc-50 p-2 text-xs font-semibold text-red-700" href={table.order_url} target="_blank" rel="noreferrer">
                {table.order_url}
            </a>
            <div className="mt-4 flex flex-col items-center border border-dashed border-zinc-300 p-4 rounded-md bg-zinc-50">
                <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(table.order_url)}`} 
                    alt={`QR Code Meja ${table.table_number}`}
                    className="w-32 h-32 mb-2"
                    crossOrigin="anonymous"
                />
                <button 
                    type="button" 
                    onClick={() => {
                        fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(table.order_url)}`)
                            .then(res => res.blob())
                            .then(blob => {
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.style.display = 'none';
                                a.href = url;
                                a.download = `QR_Meja_${table.table_number}.png`;
                                document.body.appendChild(a);
                                a.click();
                                window.URL.revokeObjectURL(url);
                            })
                            .catch(err => alert("Gagal mengunduh QR code"));
                    }}
                    className="text-xs font-semibold text-zinc-600 hover:text-red-700 underline"
                >
                    Download QR Code
                </button>
            </div>
            <button disabled={processing} className="mt-3 w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800">Update Meja</button>
        </form>
    );
}
```

---

## resources\js\Pages\Admin\Users.jsx

```jsx
import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

const blank = { name: '', email: '', phone: '', role: 'customer', address: '', password: '', is_active: true };

export default function Users({ users, filters, roles }) {
    return (
        <AdminLayout>
            <Head title="Pengguna" />
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">Manajemen Pengguna</h1>
                <select className="rounded-md border border-zinc-300 px-3 py-2 text-sm" value={filters?.role || ''} onChange={(e) => router.get('/admin/pengguna', { role: e.target.value }, { preserveState: true })}>
                    <option value="">Semua role</option>
                    {roles.map((role) => <option key={role} value={role}>{role}</option>)}
                </select>
            </div>
            <UserForm roles={roles} />
            <section className="mt-5 space-y-3">
                {users.data.map((user) => <UserForm key={user.id} user={user} roles={roles} />)}
            </section>
            <div className="mt-5 flex flex-wrap gap-2">
                {users.links?.map((link, index) => (
                    <Link key={index} href={link.url || '#'} preserveScroll className={`rounded-md border px-3 py-2 text-sm ${link.active ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                ))}
            </div>
        </AdminLayout>
    );
}

function UserForm({ user, roles }) {
    const isEdit = Boolean(user);
    const { data, setData, post, put, processing, reset } = useForm(isEdit ? {
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'customer',
        address: user.address || '',
        password: '',
        is_active: Boolean(user.is_active),
    } : blank);

    function submit(e) {
        e.preventDefault();
        isEdit ? put(`/admin/pengguna/${user.id}`, { preserveScroll: true }) : post('/admin/pengguna', { preserveScroll: true, onSuccess: () => reset() });
    }

    return (
        <form className={`rounded-md border border-zinc-200 bg-white p-4 ${isEdit ? '' : 'mt-5'}`} onSubmit={submit}>
            <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="font-bold">{isEdit ? user.name : 'Tambah pengguna'}</h2>
                {isEdit && <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-semibold">{user.role}</span>}
            </div>
            <div className="grid gap-3 md:grid-cols-4">
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Nama" required />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Email" />
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="WhatsApp" />
                <select className="rounded-md border border-zinc-300 px-3 py-2" value={data.role} onChange={(e) => setData('role', e.target.value)}>
                    {roles.map((role) => <option key={role} value={role}>{role}</option>)}
                </select>
                <input className="rounded-md border border-zinc-300 px-3 py-2 md:col-span-2" value={data.address} onChange={(e) => setData('address', e.target.value)} placeholder="Alamat" />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder={isEdit ? 'Password baru' : 'Password'} required={!isEdit} />
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} /> Aktif</label>
                <div className="flex gap-2 md:col-span-4">
                    <button disabled={processing} className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">{isEdit ? 'Update' : 'Simpan Pengguna'}</button>
                    {isEdit && <button type="button" onClick={() => router.delete(`/admin/pengguna/${user.id}`, { preserveScroll: true })} className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700">Hapus</button>}
                </div>
            </div>
        </form>
    );
}
```

---

## resources\js\Pages\Auth\Login.jsx

```jsx
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Login() {
    const { data, setData, post, processing } = useForm({ email: '', password: '', remember: false });

    function submit(e) {
        e.preventDefault();
        post('/login');
    }

    return (
        <AppLayout>
            <Head title="Masuk" />
            <section className="mx-auto max-w-md px-4 py-12">
                <h1 className="text-3xl font-bold">Masuk</h1>
                <form className="mt-6 space-y-4 rounded-md border border-zinc-200 bg-white p-5" onSubmit={submit}>
                    <label className="block text-sm font-medium">Email
                        <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                    </label>
                    <label className="block text-sm font-medium">Password
                        <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} required />
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                        <input className="rounded border-zinc-300" type="checkbox" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} /> Ingat saya
                    </label>
                    <button disabled={processing} className="w-full rounded-md bg-red-700 px-4 py-2.5 font-semibold text-white hover:bg-red-800 disabled:bg-zinc-400">Masuk</button>
                    <p className="text-center text-sm text-zinc-600">Belum punya akun? <Link className="font-semibold text-red-700" href="/register">Daftar</Link></p>
                </form>
            </section>
        </AppLayout>
    );
}
```

---

## resources\js\Pages\Auth\Register.jsx

```jsx
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Register() {
    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/register');
    }

    return (
        <AppLayout>
            <Head title="Daftar" />
            <section className="mx-auto max-w-md px-4 py-12">
                <h1 className="text-3xl font-bold">Daftar Akun</h1>
                <form className="mt-6 space-y-4 rounded-md border border-zinc-200 bg-white p-5" onSubmit={submit}>
                    <label className="block text-sm font-medium">Nama
                        <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} required minLength="3" maxLength="100" pattern="^[a-zA-Z\s\.\,\'\-]+$" title="Nama hanya boleh berisi huruf dan spasi." />
                    </label>
                    <label className="block text-sm font-medium">Email
                        <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                    </label>
                    <label className="block text-sm font-medium">Nomor WhatsApp
                        <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} required minLength="9" maxLength="20" pattern="^\+?[0-9\s\-\(\)]+$" title="Nomor telepon hanya boleh berisi angka, spasi, atau karakter +-()" />
                    </label>
                    <label className="block text-sm font-medium">Alamat
                        <textarea className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" rows="3" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                    </label>
                    <label className="block text-sm font-medium">Password
                        <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} required minLength="8" />
                    </label>
                    <label className="block text-sm font-medium">Konfirmasi Password
                        <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} required minLength="8" />
                    </label>
                    <button disabled={processing} className="w-full rounded-md bg-red-700 px-4 py-2.5 font-semibold text-white hover:bg-red-800 disabled:bg-zinc-400">Daftar</button>
                </form>
            </section>
        </AppLayout>
    );
}
```

---

## resources\js\Pages\Catering\Catering.jsx

```jsx
import { useState } from 'react';
import { User, ChefHat, Calendar, Clock, Plus, Minus, Trash2 } from 'lucide-react';
import React from "react";
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout, { money } from '../../Layouts/AppLayout';

export default function Catering({ cateringMenus }) {
  const [currentPage, setCurrentPage] = useState('packages'); // 'packages', 'catering'
  const [currentStep, setCurrentStep] = useState(1);
  
  const { data, setData, post, processing, errors } = useForm({
    eventName: '',
    date: '',
    time: '',
    place: '',
    contacts: [{ name: '', phone: '', email: '' }],
    menuItems: [],
    specialRequest: ''
  });

  // Simple heuristic: if category name has 'paket', it's a package
  const packages = cateringMenus.filter(m => m.category?.name?.toLowerCase().includes('paket') || m.name.toLowerCase().includes('paket'));
  const aLaCarte = cateringMenus.filter(m => !m.category?.name?.toLowerCase().includes('paket') && !m.name.toLowerCase().includes('paket'));

  const addContact = () => {
    setData('contacts', [...data.contacts, { name: '', phone: '', email: '' }]);
  };

  const updateContact = (index, field, value) => {
    const newContacts = [...data.contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setData('contacts', newContacts);
  };

  const updateQuantity = (menu, delta) => {
    const existing = data.menuItems.find(item => item.id === menu.id);
    let newItems = [...data.menuItems];
    
    if (existing) {
      newItems = newItems.map(item => {
        if (item.id === menu.id) {
          return { ...item, quantity: Math.max(0, item.quantity + delta) };
        }
        return item;
      }).filter(item => item.quantity > 0);
    } else if (delta > 0) {
      newItems.push({ ...menu, quantity: delta });
    }
    
    setData('menuItems', newItems);
  };

  const getQuantity = (menuId) => {
    const item = data.menuItems.find(item => item.id === menuId);
    return item ? item.quantity : 0;
  };

  const subtotal = data.menuItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      post(route('catering.store'), {
        preserveScroll: true,
      });
    }
  };

  return (
    <AppLayout>
    <Head title="Catering" />
    <div className="size-full bg-[#e5e5e5] overflow-auto min-h-screen">
      
      {/* Catering Packages Page */}
      {currentPage === 'packages' && (
        <div className="p-12 max-w-7xl mx-auto">
          <h1 className="text-5xl text-center text-[#b91c1c] mb-12 font-bold">Pilih Paket Catering</h1>

          {packages.length === 0 && (
            <div className="text-center text-gray-500">Tidak ada paket tersedia saat ini. Silakan lanjut ke custom catering.</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
                <div className="h-48 bg-gray-200">
                  <img src={pkg.image || "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop"} alt={pkg.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{pkg.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 flex-1">{pkg.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-red-600">{money(pkg.price)}</span>
                    <button
                      onClick={() => {
                        updateQuantity(pkg, 1);
                        setCurrentPage('catering');
                      }}
                      className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => setCurrentPage('catering')}
              className="bg-white text-red-600 border-2 border-red-600 px-8 py-3 rounded-full hover:bg-red-50 font-bold"
            >
              Custom Pesanan Lainnya
            </button>
          </div>
        </div>
      )}

      {/* Catering Flow */}
      {currentPage === 'catering' && (
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
          <h1 className="text-4xl text-center mb-8 font-bold text-gray-800">Catering</h1>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center w-full max-w-3xl">
                {/* Steps 1 to 4 */}
                {[1, 2, 3, 4].map((step, index) => (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md transition-colors ${currentStep >= step ? 'bg-red-600 text-white' : 'bg-white text-gray-400'}`}>
                        {step}
                      </div>
                      <span className={`mt-2 text-sm font-medium ${currentStep === step ? 'text-red-600' : 'text-gray-500'}`}>
                        {['Event Details', 'Menu Request', 'My Basket', 'Summary'][index]}
                      </span>
                    </div>
                    {index < 3 && (
                      <div className={`h-1 flex-1 transition-colors ${currentStep > step ? 'bg-red-600' : 'bg-gray-300'}`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Event Details */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-8 gap-y-6">
                  <label className="text-left pt-3 font-bold text-gray-700">Nama Acara</label>
                  <div>
                    <input
                      type="text"
                      placeholder="Contoh: Acara Pernikahan / Rapat Kantor"
                      value={data.eventName}
                      onChange={(e) => setData('eventName', e.target.value)}
                      className="p-4 border-2 border-gray-300 rounded-lg w-full focus:border-red-500 focus:ring-red-500"
                      required
                      minLength="3"
                      maxLength="255"
                      pattern="^[a-zA-Z0-9\s\.\,\'\-]+$"
                      title="Nama acara hanya boleh berisi huruf, angka, dan spasi."
                    />
                    {errors.eventName && <p className="text-red-500 text-sm mt-1">{errors.eventName}</p>}
                  </div>

                  <div className="hidden md:block"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <input 
                        type="date" 
                        value={data.date} 
                        onChange={(e) => setData('date', e.target.value)} 
                        className="p-4 border-2 border-gray-300 rounded-lg w-full pr-12 focus:border-red-500 focus:ring-red-500" 
                        required 
                      />
                      {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                    </div>
                    <div className="relative">
                      <input 
                        type="time" 
                        value={data.time} 
                        onChange={(e) => setData('time', e.target.value)} 
                        className="p-4 border-2 border-gray-300 rounded-lg w-full pr-12 focus:border-red-500 focus:ring-red-500" 
                        required 
                      />
                      {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                    </div>
                  </div>

                  <label className="text-left pt-3 font-bold text-gray-700">Tempat Acara</label>
                  <div>
                    <textarea
                      placeholder="Alamat lengkap pengiriman catering"
                      value={data.place}
                      onChange={(e) => setData('place', e.target.value)}
                      className="p-4 border-2 border-gray-300 rounded-lg w-full focus:border-red-500 focus:ring-red-500 min-h-[100px]"
                      required
                      minLength="5"
                      maxLength="1000"
                    />
                    {errors.place && <p className="text-red-500 text-sm mt-1">{errors.place}</p>}
                  </div>

                  <div className="col-span-1 md:col-span-2 border-t border-gray-200 my-4"></div>

                  <label className="text-left pt-3 font-bold text-gray-700">Kontak Person 1*</label>
                  <div className="space-y-6">
                    {data.contacts.map((contact, index) => (
                      <div key={index} className="space-y-4 bg-gray-50 p-4 rounded-xl relative">
                        {index > 0 && (
                          <button type="button" onClick={() => setData('contacts', data.contacts.filter((_, i) => i !== index))} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                            <Trash2 size={20} />
                          </button>
                        )}
                        {index > 0 && <h4 className="font-bold mb-2">Kontak Person {index + 1}</h4>}
                        <div>
                          <label className="block text-sm mb-1 text-gray-600">Nama</label>
                          <input
                            type="text"
                            placeholder="Nama PIC"
                            value={contact.name}
                            onChange={(e) => updateContact(index, 'name', e.target.value)}
                            className="p-3 border-2 border-gray-300 rounded-lg w-full focus:border-red-500"
                            required
                            minLength="3"
                            maxLength="100"
                            pattern="^[a-zA-Z\s\.\,\'\-]+$"
                            title="Nama hanya boleh berisi huruf dan spasi."
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1 text-gray-600">Nomor Telepon (WhatsApp)</label>
                          <input
                            type="tel"
                            placeholder="08123456789"
                            value={contact.phone}
                            onChange={(e) => updateContact(index, 'phone', e.target.value)}
                            className="p-3 border-2 border-gray-300 rounded-lg w-full focus:border-red-500"
                            required
                            minLength="9"
                            maxLength="20"
                            pattern="^\+?[0-9\s\-\(\)]+$"
                            title="Nomor telepon hanya boleh berisi angka, spasi, atau karakter +-()"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1 text-gray-600">Email (Opsional)</label>
                          <input
                            type="email"
                            placeholder="email@example.com"
                            value={contact.email}
                            onChange={(e) => updateContact(index, 'email', e.target.value)}
                            className="p-3 border-2 border-gray-300 rounded-lg w-full focus:border-red-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <label className="text-left pt-3 font-bold text-gray-700">Tambah Kontak?</label>
                  <div>
                    <button
                      type="button"
                      onClick={addContact}
                      className="bg-[#f59e0b] text-white px-6 py-3 rounded-full hover:bg-[#d97706] transition font-bold"
                    >
                      + Kontak Person
                    </button>
                  </div>

                  <div className="hidden md:block"></div>
                  <button
                    type="button"
                    onClick={() => {
                        // Basic validation before next
                        if (data.eventName && data.date && data.place && data.contacts[0].name && data.contacts[0].phone) {
                            setCurrentStep(2);
                        } else {
                            alert("Harap lengkapi semua form wajib di halaman ini.");
                        }
                    }}
                    className="bg-red-600 text-white py-4 rounded-full hover:bg-red-700 mt-8 font-bold transition w-full"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Menu Request */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Pilih Menu Catering</h2>
                {errors.menuItems && <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">{errors.menuItems}</div>}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {cateringMenus.map((item) => (
                    <div key={item.id} className={`bg-white rounded-2xl shadow-md overflow-hidden border-2 transition ${getQuantity(item.id) > 0 ? 'border-red-500' : 'border-transparent'}`}>
                      <div className="h-40 bg-gray-200">
                        <img src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-5 text-center flex flex-col h-[180px]">
                        <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                        <p className="font-bold text-red-600 mb-4 mt-auto">{money(item.price)}</p>
                        
                        <div className="flex items-center justify-center gap-4">
                          <button type="button" onClick={() => updateQuantity(item, -1)} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition">
                            <Minus className="w-5 h-5" />
                          </button>
                          <div className="font-bold text-xl w-12 text-center">{getQuantity(item.id)}</div>
                          <button type="button" onClick={() => updateQuantity(item, 1)} className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition">
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm">
                  <label className="block font-bold text-gray-700 mb-3">Catatan Khusus / Special Request</label>
                  <textarea
                    placeholder="Contoh: Kurangi rasa pedas, packing khusus, dsb."
                    value={data.specialRequest}
                    onChange={(e) => setData('specialRequest', e.target.value)}
                    className="p-4 border-2 border-gray-300 rounded-lg w-full min-h-[120px] focus:border-red-500"
                  ></textarea>
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={() => setCurrentStep(1)} className="flex-1 border-2 border-red-600 text-red-600 font-bold py-4 rounded-full hover:bg-red-50 transition">
                    Kembali
                  </button>
                  <button type="button" onClick={() => {
                      if (data.menuItems.length === 0) {
                          alert("Pilih minimal 1 menu untuk melanjutkan.");
                          return;
                      }
                      setCurrentStep(3);
                  }} className="flex-1 bg-red-600 text-white font-bold py-4 rounded-full hover:bg-red-700 transition">
                    Selanjutnya
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: My Basket */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-8 border-b pb-4">Ringkasan Pesanan</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-8 gap-y-6">
                  <label className="text-left font-bold text-gray-600 md:pt-3">Nama Acara</label>
                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">{data.eventName}</div>

                  <div className="hidden md:block"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex justify-between">
                      <span>{data.date}</span>
                      <Calendar className="text-gray-500" size={20} />
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex justify-between">
                      <span>{data.time || '-'}</span>
                      <Clock className="text-gray-500" size={20} />
                    </div>
                  </div>

                  <label className="text-left font-bold text-gray-600 md:pt-3">Tempat Acara</label>
                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 whitespace-pre-wrap">{data.place}</div>

                  <label className="text-left font-bold text-gray-600 md:pt-3">Kontak Utama</label>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="font-bold">{data.contacts[0].name}</div>
                        <div className="text-gray-600">{data.contacts[0].phone}</div>
                        <div className="text-gray-600">{data.contacts[0].email}</div>
                    </div>
                  </div>

                  <div className="hidden md:block"></div>
                  <div className="text-right">
                    <button type="button" onClick={() => setCurrentStep(1)} className="text-red-600 font-bold hover:underline">Ubah Detail</button>
                  </div>

                  <label className="text-left font-bold text-gray-600 md:pt-3">Daftar Menu</label>
                  <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                    <div className="flex justify-between mb-4 pb-4 border-b-2 border-gray-300 font-bold">
                      <span>Item</span>
                      <span>Total</span>
                    </div>
                    {data.menuItems.map(item => (
                        <div key={item.id} className="flex justify-between mb-3 text-gray-700">
                            <div>
                                <span className="font-bold">{item.quantity}x</span> {item.name}
                                <div className="text-sm text-gray-500 ml-6">@ {money(item.price)}</div>
                            </div>
                            <span className="font-bold">{money(item.price * item.quantity)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between pt-4 border-t-2 border-gray-300 font-bold text-lg mt-4">
                      <span>Subtotal</span>
                      <span>{money(subtotal)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">*Harga belum termasuk pajak dan ongkos kirim.</p>
                  </div>
                  
                  <div className="hidden md:block"></div>
                  <div className="text-right">
                    <button type="button" onClick={() => setCurrentStep(2)} className="text-red-600 font-bold hover:underline">Ubah Menu</button>
                  </div>

                  {data.specialRequest && (
                    <>
                        <label className="text-left font-bold text-gray-600 md:pt-3">Catatan</label>
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 whitespace-pre-wrap">{data.specialRequest}</div>
                    </>
                  )}

                  <div className="col-span-1 md:col-span-2 flex gap-4 mt-8">
                    <button type="button" onClick={() => setCurrentStep(2)} className="flex-1 border-2 border-red-600 text-red-600 font-bold py-4 rounded-full hover:bg-red-50 transition">
                      Kembali
                    </button>
                    <button type="submit" disabled={processing} className="flex-1 bg-red-600 text-white font-bold py-4 rounded-full hover:bg-red-700 transition flex items-center justify-center gap-2">
                      {processing ? 'Memproses...' : 'Kirim Pesanan'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Summary (Rendered via page reload with success flash, but kept just in case) */}
            {currentStep === 4 && (
              <div className="bg-white shadow-sm rounded-2xl p-16 text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">Terima Kasih Atas Pesanan Anda</h1>
                <p className="text-xl text-gray-600 mb-8">Tim kami akan segera menghubungi Anda untuk konfirmasi pesanan catering.</p>
                <div className="mb-8 flex justify-center">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                </div>
                <Link href={route('home')} className="inline-block bg-red-600 text-white font-bold px-12 py-4 rounded-full hover:bg-red-700 transition">
                  Kembali ke Beranda
                </Link>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
    </AppLayout>
  );
}
```

---

## resources\js\Pages\Customer\Checkout.jsx

```jsx
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout, { money } from '../../Layouts/AppLayout';

export default function Checkout({ cart, subtotal, taxRate, taxAmount, total, table, paymentMethods }) {
    const user = usePage().props.auth?.user;
    const items = Object.values(cart || {});
    const { data, setData, post, processing } = useForm({
        name: '',
        phone: '',
        email: '',
        address: '',
        payment_method: Object.keys(paymentMethods || {})[0] || 'cash',
        notes: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/checkout');
    }

    return (
        <AppLayout>
            <Head title="Checkout" />
            <section className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
                <form className="rounded-md border border-zinc-200 bg-white p-5" onSubmit={submit}>
                    <h1 className="text-2xl font-bold">Checkout</h1>
                    {table && <p className="mt-1 text-sm text-zinc-600">Meja {table.table_number} akan dikunci setelah pesanan dibuat.</p>}
                    {!user && (
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <label className="block text-sm font-medium">Nama
                                <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} required minLength="3" maxLength="100" pattern="^[a-zA-Z\s\.\,\'\-]+$" title="Nama hanya boleh berisi huruf dan spasi." />
                            </label>
                            <label className="block text-sm font-medium">Nomor WhatsApp
                                <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} required minLength="9" maxLength="20" pattern="^\+?[0-9\s\-\(\)]+$" title="Nomor telepon hanya boleh berisi angka, spasi, atau karakter +-()" />
                            </label>
                            <label className="block text-sm font-medium">Email
                                <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            </label>
                            <label className="block text-sm font-medium sm:col-span-2">Alamat
                                <textarea className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" rows="3" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                            </label>
                        </div>
                    )}
                    <div className="mt-5 grid gap-4">
                        <label className="block text-sm font-medium">Metode pembayaran
                            <select className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" value={data.payment_method} onChange={(e) => setData('payment_method', e.target.value)} required>
                                {Object.entries(paymentMethods || {}).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                            </select>
                        </label>
                        <label className="block text-sm font-medium">Catatan pesanan
                            <textarea className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" rows="3" value={data.notes} onChange={(e) => setData('notes', e.target.value)} />
                        </label>
                    </div>
                    <button disabled={processing} className="mt-5 w-full rounded-md bg-red-700 px-4 py-3 font-semibold text-white hover:bg-red-800 disabled:bg-zinc-400">Buat Pesanan</button>
                </form>
                <aside className="h-fit rounded-md border border-zinc-200 bg-white p-5">
                    <h2 className="text-xl font-bold">Ringkasan</h2>
                    <div className="mt-4 space-y-3">
                        {items.map((item) => (
                            <div key={item.menu_id} className="flex justify-between gap-3 text-sm">
                                <span>{item.qty} x {item.name}</span>
                                <span>{money(Number(item.qty) * Number(item.price))}</span>
                            </div>
                        ))}
                    </div>
                    <dl className="mt-4 space-y-2 border-t border-zinc-200 pt-4 text-sm">
                        <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
                        <div className="flex justify-between"><dt>PPN {Number(taxRate) * 100}%</dt><dd>{money(taxAmount)}</dd></div>
                        <div className="flex justify-between text-lg font-bold"><dt>Total</dt><dd>{money(total)}</dd></div>
                    </dl>
                </aside>
            </section>
        </AppLayout>
    );
}
```

---

## resources\js\Pages\Customer\History.jsx

```jsx
import { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout, { money, statusText } from '../../Layouts/AppLayout';
import { Star } from 'lucide-react';

export default function History({ orders }) {
    const [ratingOrder, setRatingOrder] = useState(null);
    const { data, setData, post, processing, reset, errors } = useForm({
        stars: 5,
        comment: '',
    });

    const submitRating = (e) => {
        e.preventDefault();
        post(`/akun/pesanan/${ratingOrder.id}/rating`, {
            preserveScroll: true,
            onSuccess: () => {
                setRatingOrder(null);
                reset();
            }
        });
    };

    return (
        <AppLayout>
            <Head title="Riwayat Pesanan" />
            <section className="mx-auto max-w-5xl px-4 py-8">
                <h1 className="text-3xl font-bold">Riwayat Pesanan</h1>
                <div className="mt-5 space-y-3">
                    {orders.data.length === 0 ? (
                        <p className="rounded-md border border-zinc-200 bg-white p-4 text-zinc-600">Belum ada pesanan.</p>
                    ) : orders.data.map((order) => (
                        <article key={order.id} className="rounded-md border border-zinc-200 bg-white p-4">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <Link className="font-bold text-red-700" href={`/order/confirm/${order.unique_code}`}>{order.unique_code}</Link>
                                <p className="text-sm text-zinc-600">{statusText(order.status)}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold">{money(order.total_price)}</p>
                                {order.status === 'pending' && order.payment_status !== 'paid' && (
                                    <button
                                        className="mt-2 rounded-md border border-red-300 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50"
                                        onClick={() => router.post(`/akun/pesanan/${order.id}/cancel`, {}, { preserveScroll: true })}
                                    >
                                        Batalkan
                                    </button>
                                )}
                                {order.status === 'completed' && !order.rating && (
                                    <button
                                        className="mt-2 rounded-md border border-yellow-500 bg-yellow-50 px-3 py-1.5 text-sm font-semibold text-yellow-700 hover:bg-yellow-100 flex items-center gap-1"
                                        onClick={() => setRatingOrder(order)}
                                    >
                                        <Star size={16} /> Beri Ulasan
                                    </button>
                                )}
                                {order.rating && (
                                    <div className="mt-2 flex items-center justify-end gap-1 text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} className={i < order.rating.stars ? 'fill-current' : 'text-zinc-300'} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Rating Form Inline */}
                        {ratingOrder?.id === order.id && (
                            <form onSubmit={submitRating} className="mt-4 border-t border-zinc-100 pt-4">
                                <h4 className="font-bold mb-2">Beri Ulasan Pesanan</h4>
                                {errors.rating && <p className="text-red-600 text-sm mb-2">{errors.rating}</p>}
                                <div className="mb-3 flex gap-2">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => setData('stars', num)}
                                            className={`${data.stars >= num ? 'text-yellow-500 fill-current' : 'text-zinc-300'} hover:scale-110 transition-transform`}
                                        >
                                            <Star size={24} className={data.stars >= num ? 'fill-current' : ''} />
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    className="w-full rounded-md border border-zinc-300 p-2 text-sm focus:border-red-500 focus:ring-red-500 mb-2"
                                    placeholder="Tulis ulasan Anda (opsional)..."
                                    value={data.comment}
                                    onChange={e => setData('comment', e.target.value)}
                                ></textarea>
                                <div className="flex gap-2">
                                    <button type="submit" disabled={processing} className="rounded-md bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800">Kirim</button>
                                    <button type="button" onClick={() => { setRatingOrder(null); reset(); }} className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold hover:bg-zinc-50">Batal</button>
                                </div>
                            </form>
                        )}
                    </article>
                ))}
                </div>
            </section>
        </AppLayout>
    );
}
```

---

## resources\js\Pages\Customer\Menu.jsx

```jsx
import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout, { money } from '../../Layouts/AppLayout';

export default function Menu({ menus, categories, cart, selectedTable, filters }) {
    const items = Object.values(cart || {});
    const subtotal = items.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);

    function filter(e) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        router.get('/menu', Object.fromEntries(form.entries()), { preserveState: true });
    }

    return (
        <AppLayout>
            <Head title="Menu Dine-In" />
            <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 pb-24 lg:grid-cols-[1fr_360px] lg:pb-8">
                <div>
                    <div className="mb-5">
                        <h1 className="text-3xl font-bold">Menu Dine-In</h1>
                        <p className="mt-1 text-sm text-zinc-600">
                            {selectedTable ? `Meja ${selectedTable.table_number} - Status ${selectedTable.status}` : 'Pilih menu, lalu meja akan dikunci saat checkout.'}
                        </p>
                    </div>
                    <form className="mb-5 grid gap-3 rounded-md border border-zinc-200 bg-white p-4 sm:grid-cols-[1fr_180px_auto]" onSubmit={filter}>
                        <input className="w-full min-w-0 rounded-md border border-zinc-300 px-3 py-2" name="q" defaultValue={filters?.q || ''} placeholder="Cari menu" />
                        <select className="w-full min-w-0 rounded-md border border-zinc-300 px-3 py-2" name="category" defaultValue={filters?.category || ''}>
                            <option value="">Semua kategori</option>
                            {categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}
                        </select>
                        <button className="w-full whitespace-nowrap rounded-md bg-zinc-900 px-4 py-2 font-semibold text-white sm:w-auto">Filter</button>
                    </form>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {menus.map((menu) => <MenuCard key={menu.id} menu={menu} selectedTable={selectedTable} />)}
                    </div>
                </div>
                <aside className="h-fit rounded-md border border-zinc-200 bg-white p-4 lg:sticky lg:top-20">
                    <h2 className="text-xl font-bold">Keranjang</h2>
                    {items.length === 0 ? (
                        <p className="mt-3 text-sm text-zinc-600">Belum ada item.</p>
                    ) : (
                        <>
                            <div className="mt-4 space-y-3">
                                {items.map((item) => (
                                    <div key={item.menu_id} className="border-b border-zinc-100 pb-3">
                                        <div className="flex justify-between gap-3">
                                            <div>
                                                <p className="font-semibold">{item.name}</p>
                                                <p className="text-sm text-zinc-600">{item.qty} x {money(item.price)}</p>
                                                {item.notes && <p className="mt-1 text-xs text-zinc-500">{item.notes}</p>}
                                            </div>
                                            <Link method="delete" as="button" href={`/cart/items/${item.menu_id}`} className="text-sm font-semibold text-red-700">Hapus</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex justify-between font-bold">
                                <span>Subtotal</span>
                                <span>{money(subtotal)}</span>
                            </div>
                            <Link className="mt-4 block rounded-md bg-red-700 px-4 py-3 text-center font-semibold text-white hover:bg-red-800" href="/checkout">Checkout</Link>
                        </>
                    )}
                </aside>
            </section>

            {/* Mobile Fixed Cart Bar */}
            {items.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-zinc-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden">
                    <div>
                        <p className="text-sm text-zinc-600">{items.reduce((sum, i) => sum + Number(i.qty), 0)} items</p>
                        <p className="font-bold text-red-700">{money(subtotal)}</p>
                    </div>
                    <Link href="/checkout" className="rounded-md bg-red-700 px-6 py-2 font-semibold text-white hover:bg-red-800">
                        Checkout
                    </Link>
                </div>
            )}
        </AppLayout>
    );
}

function MenuCard({ menu, selectedTable }) {
    const { data, setData, post, processing } = useForm({
        menu_id: menu.id,
        qty: 1,
        notes: '',
        table_id: selectedTable?.id || '',
    });
    const unavailable = !menu.is_available || Number(menu.stock) < 1;

    function submit(e) {
        e.preventDefault();
        post('/cart/items', { preserveScroll: true });
    }

    return (
        <article className="rounded-md border border-zinc-200 bg-white p-4">
            {menu.image && (
                <div className="mb-4 aspect-video w-full overflow-hidden rounded-md bg-zinc-100">
                    <img src={menu.image} alt={menu.name} className="h-full w-full object-cover" />
                </div>
            )}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase text-zinc-500">{menu.category?.name}</p>
                    <h2 className="mt-1 font-bold">{menu.name}</h2>
                    <p className="mt-2 text-sm text-zinc-600">{menu.description}</p>
                </div>
                <p className="whitespace-nowrap font-bold text-red-700">{money(menu.price)}</p>
            </div>
            <div className="mt-4 text-sm">
                <span className={unavailable ? 'text-red-700' : 'text-emerald-700'}>{unavailable ? 'Habis' : `Stok ${menu.stock}`}</span>
            </div>
            <form className="mt-3 grid gap-2" onSubmit={submit}>
                <div className="grid grid-cols-[80px_1fr] gap-2">
                    <input className="w-full min-w-0 rounded-md border border-zinc-300 px-3 py-2" type="number" min="1" max={Math.max(1, Number(menu.stock))} value={data.qty} onChange={(e) => setData('qty', e.target.value)} />
                    <input className="w-full min-w-0 rounded-md border border-zinc-300 px-3 py-2" value={data.notes} onChange={(e) => setData('notes', e.target.value)} placeholder="Catatan item" />
                </div>
                <button disabled={unavailable || processing} className="w-full rounded-md bg-red-700 px-4 py-2 font-semibold text-white disabled:bg-zinc-300">Tambah</button>
            </form>
        </article>
    );
}
```

---

## resources\js\Pages\Debug.jsx

```jsx
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Debug({ routes }) {
    const { flash, errors } = usePage().props;
    const { data, setData, post: postWA, processing: waProcessing } = useForm({
        phone: '6281234567890',
        message: 'Tes Notifikasi WA dari Debug Page!'
    });

    const { post: postReservation, processing: resProcessing } = useForm();
    const { post: postOrder, processing: orderProcessing } = useForm();

    return (
        <AppLayout>
            <Head title="Debug Panel" />
            <div className="mx-auto max-w-4xl px-4 py-8">
                <h1 className="text-3xl font-black mb-6">RM Kembar Debug Panel</h1>
                
                {(flash?.status || Object.keys(errors || {}).length > 0) && (
                    <div className="mb-6">
                        {flash?.status && <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">{flash.status}</div>}
                        {Object.keys(errors || {}).length > 0 && <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-900">{Object.values(errors)[0]}</div>}
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                    
                    {/* WhatsApp Feature */}
                    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-4">1. Test WhatsApp API</h2>
                        <form onSubmit={(e) => { e.preventDefault(); postWA('/debug/wa'); }} className="grid gap-3">
                            <div>
                                <label className="text-xs font-semibold text-zinc-600">Nomor (62...)</label>
                                <input className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" value={data.phone} onChange={e => setData('phone', e.target.value)} required />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-zinc-600">Pesan</label>
                                <textarea className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" value={data.message} onChange={e => setData('message', e.target.value)} required />
                            </div>
                            <button disabled={waProcessing} className="w-full rounded-md bg-zinc-900 px-4 py-2 font-bold text-white hover:bg-zinc-800">
                                Send WA Notification
                            </button>
                        </form>
                    </section>

                    {/* Quick Data Seeding */}
                    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-4">2. Seed Dummy Data</h2>
                        <div className="grid gap-3">
                            <button 
                                disabled={resProcessing}
                                onClick={() => postReservation('/debug/reservation')}
                                className="w-full rounded-md border border-zinc-300 bg-zinc-50 px-4 py-3 font-semibold hover:bg-zinc-100"
                            >
                                Seed Dummy Reservation 📅
                            </button>
                            <p className="text-xs text-zinc-500 mb-2">Makes a pending reservation you can confirm in Admin.</p>

                            <button 
                                disabled={orderProcessing}
                                onClick={() => postOrder('/debug/order')}
                                className="w-full rounded-md border border-zinc-300 bg-zinc-50 px-4 py-3 font-semibold hover:bg-zinc-100"
                            >
                                Seed Paid Order 🍔
                            </button>
                            <p className="text-xs text-zinc-500">Makes a paid order that should instantly trigger Kitchen WebSockets.</p>
                        </div>
                    </section>

                    {/* Quick Admin Links */}
                    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm md:col-span-2">
                        <h2 className="text-xl font-bold mb-4">3. Quick Links to New Features</h2>
                        <div className="flex flex-wrap gap-3">
                            <Link href={routes.admin_menu} className="rounded-md bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800">Admin Menu (Image Upload)</Link>
                            <Link href={routes.admin_categories} className="rounded-md bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800">Admin Categories (CRUD)</Link>
                            <Link href={routes.admin_reservations} className="rounded-md bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800">Admin Reservations</Link>
                            <Link href={routes.kitchen} className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-bold text-zinc-900 hover:bg-yellow-500">Kitchen Display</Link>
                        </div>
                    </section>

                </div>
            </div>
        </AppLayout>
    );
}
```

---

## resources\js\Pages\Home.jsx

```jsx
import { Head, Link } from '@inertiajs/react';
import AppLayout, { money } from '../Layouts/AppLayout';

export default function Home({ availableTables, totalTables, featuredMenus }) {
    return (
        <AppLayout>
            <Head title="Beranda" />
            <section className="bg-white">
                <div className="mx-auto grid min-h-[70vh] max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.1fr_.9fr] md:items-center">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase text-red-700">Buka setiap hari 10.00-21.00</p>
                        <h1 className="max-w-2xl text-4xl font-black leading-tight text-zinc-950 md:text-6xl">RM Kembar</h1>
                        <p className="mt-4 max-w-xl text-lg text-zinc-700">Pesan dari meja lewat QR, reservasi kedatangan, dan pantau status pesanan dari satu tempat.</p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link className="rounded-md bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800" href="/menu">Pesan Dine-In</Link>
                            <Link className="rounded-md border border-zinc-300 px-5 py-3 font-semibold hover:bg-zinc-100" href="/reservasi">Reservasi Meja</Link>
                        </div>
                        <dl className="mt-8 grid max-w-lg grid-cols-2 gap-3">
                            <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
                                <dt className="text-sm text-zinc-600">Meja kosong</dt>
                                <dd className="mt-1 text-3xl font-bold">{availableTables}/{totalTables}</dd>
                            </div>
                            <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
                                <dt className="text-sm text-zinc-600">WhatsApp</dt>
                                <dd className="mt-1 text-lg font-bold">0812-0000-0000</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="overflow-hidden rounded-md border border-zinc-200 bg-zinc-900">
                        <img className="h-full min-h-80 w-full object-cover opacity-90" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80" alt="Hidangan rumah makan" />
                    </div>
                </div>
            </section>
            <section className="mx-auto max-w-6xl px-4 py-10">
                <div className="mb-5 flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Menu tersedia</h2>
                        <p className="text-sm text-zinc-600">Stok dan ketersediaan mengikuti data admin.</p>
                    </div>
                    <Link className="text-sm font-semibold text-red-700" href="/menu">Lihat semua</Link>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredMenus.map((menu) => (
                        <article key={menu.id} className="rounded-md border border-zinc-200 bg-white p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase text-zinc-500">{menu.category?.name}</p>
                                    <h3 className="mt-1 font-bold">{menu.name}</h3>
                                </div>
                                <p className="font-bold text-red-700">{money(menu.price)}</p>
                            </div>
                            <p className="mt-2 text-sm text-zinc-600">{menu.description}</p>
                        </article>
                    ))}
                </div>
            </section>
        </AppLayout>
    );
}
```

---

## resources\js\Pages\Info\AboutUs.jsx

```jsx
import React from "react";
import { Head, Link, router } from '@inertiajs/react';
import AppLayout, { money, statusText } from '../../Layouts/AppLayout';

import {
    Leaf,
    ChefHat,
    Zap,
    Heart,
    UtensilsCrossed,
    DollarSign,
    Award,
    Users,
    Star,
    User,
    MapPin,
    Plus,
    Minus,
    Clock,
    Phone,
    Mail,
  } from "lucide-react";

  
  export default function App() {
    const features = [
      {
        icon: Leaf,
        title: "Fresh Ingredients",
        description: "Daily sourced premium local ingredients for authentic taste"
      },
      {
        icon: ChefHat,
        title: "Professional Chefs",
        description: "Expert chefs with decades of culinary experience"
      },
      {
        icon: Zap,
        title: "Fast Service",
        description: "Quick and efficient service without compromising quality"
      },
      {
        icon: Heart,
        title: "Comfortable Place",
        description: "Cozy ambiance perfect for family gatherings"
      },
      {
        icon: UtensilsCrossed,
        title: "Premium Catering",
        description: "Professional catering services for all occasions"
      },
      {
        icon: DollarSign,
        title: "Affordable Prices",
        description: "Quality Indonesian cuisine at reasonable prices"
      }
    ];
  
    const stats = [
      {
        number: "10+",
        label: "Years Experience",
        icon: Award
      },
      {
        number: "5000+",
        label: "Happy Customers",
        icon: Users
      },
      {
        number: "120+",
        label: "Menu Variants",
        icon: UtensilsCrossed
      },
      {
        number: "4.9",
        label: "Customer Rating",
        icon: Star
      }
    ];
  
    const team = [
      {
        name: "Chef Budi Santoso",
        role: "Head Chef",
        image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=400&fit=crop",
        description: "20+ years experience in Indonesian cuisine"
      },
      {
        name: "Siti Nurhaliza",
        role: "Restaurant Manager",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        description: "Ensuring excellent customer service daily"
      },
      {
        name: "Ahmad Ridwan",
        role: "Catering Coordinator",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        description: "Specializing in large-scale event catering"
      }
    ];
  
    const gallery = [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&h=400&fit=crop"
    ];
  
    return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 overflow-auto">
        {/* Dark Purple Navbar */}
  
        {/* Hero Section */}
        <section className="relative h-[500px] bg-gradient-to-r from-[#050B1A] to-[#10213D] overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <img
              src="/images/rumahSaya.png"
              alt="Restaurant Banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-6xl mb-6">About Warung Makan Kembar</h1>
            <p className="text-xl mb-8 max-w-2xl">
              Authentic Indonesian Cuisine • Family Tradition Since 1985 • Premium Dining Experience
            </p>
            <Link href="/menu" className="bg-gradient-to-r from-purple-500 to-blue-500 px-10 py-4 rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Explore Our Menu
            </Link>
          </div>
        </section>
  
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-16">
  
          {/* Restaurant Story Section */}
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1707105064020-308d7441ac94?w=800&h=600&fit=crop"
                  alt="Restaurant Interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-5xl text-gray-800 mb-6">Our Story</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Founded in 1985 by twin siblings who shared a passion for Indonesian culinary heritage,
                  Warung Makan Kembar has been serving authentic traditional dishes for over 40 years.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Our commitment to quality, authenticity, and the warmth of Indonesian hospitality has
                  made us a beloved destination for those seeking genuine Indonesian flavors.
                </p>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                  <h3 className="text-2xl text-gray-800 mb-3">Our Vision & Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To preserve authentic Indonesian cuisine while providing exceptional dining experiences
                    that make every guest feel like family.
                  </p>
                </div>
              </div>
            </div>
          </section>
  
          {/* Why Choose Us Section */}
          <section className="mb-20">
            <h2 className="text-5xl text-center text-gray-800 mb-4">Why Choose Us</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">What makes us special</p>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-5">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </section>
  
          {/* Statistics Section */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center text-white">
                      <Icon className="w-12 h-12 mx-auto mb-4 opacity-90" />
                      <div className="text-5xl mb-2">{stat.number}</div>
                      <div className="text-lg opacity-90">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
  
          {/* Team Section */}
          <section className="mb-20">
            <h2 className="text-5xl text-center text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">The people behind our success</p>
            <div className="grid md:grid-cols-3 gap-10">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl text-gray-800 mb-2">{member.name}</h3>
                    <p className="text-purple-600 mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
  
          {/* Gallery Section */}
          <section className="mb-20">
            <h2 className="text-5xl text-center text-gray-800 mb-4">Gallery</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Explore our culinary creations</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {gallery.map((image, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 h-64"
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
  
          {/* Location Section */}
          <section className="mb-20">
            <h2 className="text-5xl text-center text-gray-800 mb-4">Our Location</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Visit us today</p>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="relative bg-gray-200 h-96">
                  {/* Map Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
                      backgroundSize: '30px 30px'
                    }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                      <MapPin className="w-16 h-16 text-purple-600 fill-purple-600" />
                    </div>
                    <div className="absolute right-4 top-4 bg-white rounded-lg shadow-md">
                      <button className="block p-2 hover:bg-gray-50 border-b">
                        <Plus className="w-5 h-5" />
                      </button>
                      <button className="block p-2 hover:bg-gray-50">
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <h3 className="text-3xl text-gray-800 mb-6">Visit Us</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-800">Jl. Sudirman No. 123</p>
                        <p className="text-gray-600">Jakarta Pusat, DKI Jakarta 10110</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-6 h-6 text-purple-600" />
                      <p className="text-gray-800">Open Daily: 10:00 AM - 10:00 PM</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-6 h-6 text-purple-600" />
                      <p className="text-gray-800">+62 21 1234 5678</p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Warung+Makan+Kembar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <MapPin className="w-5 h-5" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
  

      </div>
      </AppLayout>
    );
  }
```

---

## resources\js\Pages\Info\Location.jsx

```jsx
(file kosong)
```

---

## resources\js\Pages\Kitchen\Index.jsx

```jsx
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { statusText } from '../../Layouts/AppLayout';

export default function Index({ orders }) {
    useEffect(() => {
        let channel;
        if (window.Echo) {
            channel = window.Echo.channel('kitchen.orders')
                .listen('KitchenOrderUpdated', (e) => {
                    router.reload({ only: ['orders'] });
                });
        }
        
        // Fallback polling (every 15s just in case WS drops)
        const id = window.setInterval(() => router.reload({ only: ['orders'] }), 15000);
        
        return () => {
            window.clearInterval(id);
            if (channel) {
                window.Echo.leaveChannel('kitchen.orders');
            }
        };
    }, []);

    return (
        <AdminLayout>
            <Head title="Kitchen Display" />
            <h1 className="text-2xl font-bold">Kitchen Display</h1>
            <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {orders.length === 0 ? (
                    <p className="rounded-md border border-zinc-200 bg-white p-4 text-zinc-600">Belum ada pesanan aktif untuk dapur.</p>
                ) : orders.map((order) => (
                    <article key={order.id} className="rounded-md border border-zinc-200 bg-white p-4">
                        <div className="flex justify-between gap-3">
                            <div>
                                <h2 className="font-bold text-red-700">{order.unique_code}</h2>
                                <p className="text-sm text-zinc-600">Meja {order.table?.table_number || '-'} - {statusText(order.status)}</p>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            {order.items.map((item) => (
                                <div key={item.id} className="rounded-md bg-zinc-50 p-3">
                                    <p className="font-semibold">{item.qty} x {item.menu_name}</p>
                                    {item.notes && <p className="text-sm text-zinc-600">{item.notes}</p>}
                                </div>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </AdminLayout>
    );
}
```

---

## resources\js\Pages\Orders\Confirm.jsx

```jsx
import { Head, router } from '@inertiajs/react';
import AppLayout, { money, statusText } from '../../Layouts/AppLayout';

export default function Confirm({ order }) {
    return (
        <AppLayout>
            <Head title="Konfirmasi Pesanan" />
            <section className="mx-auto max-w-3xl px-4 py-10">
                <div className="rounded-md border border-zinc-200 bg-white p-6">
                    <p className="text-sm font-semibold uppercase text-emerald-700">Pesanan dibuat</p>
                    <h1 className="mt-2 text-3xl font-bold">{order.unique_code}</h1>
                    <p className="mt-2 text-zinc-600">Tunjukkan kode ini ke kasir untuk validasi pembayaran dan kedatangan.</p>
                    <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-md bg-zinc-50 p-4"><dt className="text-sm text-zinc-600">Status</dt><dd className="font-bold">{statusText(order.status)}</dd></div>
                        <div className="rounded-md bg-zinc-50 p-4"><dt className="text-sm text-zinc-600">Pembayaran</dt><dd className="font-bold">{order.payment_status}</dd></div>
                        <div className="rounded-md bg-zinc-50 p-4"><dt className="text-sm text-zinc-600">Meja</dt><dd className="font-bold">{order.table?.table_number || '-'}</dd></div>
                        <div className="rounded-md bg-zinc-50 p-4"><dt className="text-sm text-zinc-600">Total</dt><dd className="font-bold">{money(order.total_price)}</dd></div>
                    </dl>
                    <div className="mt-6">
                        <h2 className="font-bold">Item</h2>
                        <div className="mt-3 space-y-2">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between gap-3 text-sm">
                                    <span>{item.qty} x {item.menu_name}</span>
                                    <span>{money(item.subtotal)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {order.payment_status === 'unpaid' && (
                        <div className="mt-8 text-center border-t border-zinc-200 pt-6 space-y-4 flex flex-col items-center">
                            {order.snap_token && (
                                <button
                                    onClick={() => {
                                        if (window.snap) {
                                            window.snap.pay(order.snap_token, {
                                                onSuccess: function(result){
                                                    window.location.reload();
                                                },
                                                onPending: function(result){
                                                    window.location.reload();
                                                },
                                                onError: function(result){
                                                    alert("Pembayaran gagal atau dibatalkan.");
                                                }
                                            });
                                        } else {
                                            alert("Payment gateway is loading, please try again in a moment.");
                                        }
                                    }}
                                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition"
                                >
                                    Bayar Sekarang
                                </button>
                            )}

                            <button
                                onClick={() => router.post(`/debug/simulate-payment/${order.unique_code}`)}
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition"
                            >
                                [Debug] Simulasi Pembayaran Sukses
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
```

---

## resources\js\Pages\Reservations\Create.jsx

```jsx
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Create({ availableTables }) {
    const user = usePage().props.auth?.user;
    const { data, setData, post, processing } = useForm({
        name: '',
        phone: '',
        reserved_date: '',
        reserved_time: '',
        guest_count: 1,
        notes: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/reservasi');
    }

    return (
        <AppLayout>
            <Head title="Reservasi" />
            <section className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[1fr_320px]">
                <form className="rounded-md border border-zinc-200 bg-white p-5" onSubmit={submit}>
                    <h1 className="text-2xl font-bold">Reservasi Meja</h1>
                    <p className="mt-1 text-sm text-zinc-600">Admin mengonfirmasi meja saat kedatangan. Reservasi otomatis batal 30 menit setelah jadwal jika belum hadir.</p>
                    {!user && (
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <label className="block text-sm font-medium">Nama
                                <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} required minLength="3" maxLength="100" pattern="^[a-zA-Z\s\.\,\'\-]+$" title="Nama hanya boleh berisi huruf dan spasi." />
                            </label>
                            <label className="block text-sm font-medium">Nomor WhatsApp
                                <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} required minLength="9" maxLength="20" pattern="^\+?[0-9\s\-\(\)]+$" title="Nomor telepon hanya boleh berisi angka, spasi, atau karakter +-()" />
                            </label>
                        </div>
                    )}
                    <div className="mt-5 grid gap-4 sm:grid-cols-3">
                        <label className="block text-sm font-medium">Tanggal
                            <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="date" value={data.reserved_date} onChange={(e) => setData('reserved_date', e.target.value)} required />
                        </label>
                        <label className="block text-sm font-medium">Jam
                            <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="time" value={data.reserved_time} onChange={(e) => setData('reserved_time', e.target.value)} required />
                        </label>
                        <label className="block text-sm font-medium">Tamu
                            <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="number" min="1" value={data.guest_count} onChange={(e) => setData('guest_count', e.target.value)} required />
                        </label>
                    </div>
                    <label className="mt-4 block text-sm font-medium">Catatan
                        <textarea className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" rows="3" value={data.notes} onChange={(e) => setData('notes', e.target.value)} />
                    </label>
                    <button disabled={processing} className="mt-5 rounded-md bg-red-700 px-4 py-3 font-semibold text-white hover:bg-red-800 disabled:bg-zinc-400">Buat Reservasi</button>
                </form>
                <aside className="h-fit rounded-md border border-zinc-200 bg-white p-5">
                    <h2 className="font-bold">Meja kosong saat ini</h2>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                        {availableTables.map((table) => (
                            <div key={table.id} className="rounded-md border border-zinc-200 p-3 text-sm">
                                <p className="font-bold">Meja {table.table_number}</p>
                                <p className="text-zinc-600">{table.capacity} kursi</p>
                            </div>
                        ))}
                    </div>
                </aside>
            </section>
        </AppLayout>
    );
}
```

---

## resources\views\app.blade.php

```php
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title inertia>{{ config('app.name', 'RM Kembar') }}</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @inertiaHead
    <script type="text/javascript" src="{{ env('MIDTRANS_IS_PRODUCTION') ? 'https://app.midtrans.com/snap/snap.js' : 'https://app.sandbox.midtrans.com/snap/snap.js' }}" data-client-key="{{ env('MIDTRANS_CLIENT_KEY') }}"></script>
</head>
<body class="bg-zinc-50 text-zinc-950 antialiased">
    @inertia
</body>
</html>
```

---

## resources\views\reports\sales.blade.php

```php
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Penjualan RM Kembar</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 6px; text-align: left; }
        th { background-color: #f2f2f2; }
        h1, h3 { text-align: center; }
        .total { text-align: right; font-weight: bold; margin-top: 20px; font-size: 14px; }
    </style>
</head>
<body>
    <h1>RM Kembar</h1>
    <h3>Laporan Penjualan</h3>
    <p>Periode: {{ $from->format('d M Y') }} - {{ $to->format('d M Y') }}</p>
    
    <table>
        <thead>
            <tr>
                <th>Kode</th>
                <th>Tanggal</th>
                <th>Customer</th>
                <th>Meja</th>
                <th>Status</th>
                <th>Pembayaran</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($orders as $order)
            <tr>
                <td>{{ $order->unique_code }}</td>
                <td>{{ $order->created_at->format('Y-m-d H:i') }}</td>
                <td>{{ $order->user?->name ?? 'Guest' }}</td>
                <td>{{ $order->table?->table_number ?? '-' }}</td>
                <td>{{ $order->status }}</td>
                <td>{{ $order->payment_status }}</td>
                <td>Rp {{ number_format($order->total_price, 0, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="total">
        Total Pendapatan: Rp {{ number_format($total_revenue, 0, ',', '.') }}
    </div>
</body>
</html>
```

---

## resources\views\welcome.blade.php

```php
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <!-- Styles / Scripts -->
        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @vite(['resources/css/app.css', 'resources/js/app.js'])
        @else
            <style>
                /*! tailwindcss v4.0.7 | MIT License | https://tailwindcss.com */@layer theme{:root,:host{--font-sans:'Instrument Sans',ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-serif:ui-serif,Georgia,Cambria,"Times New Roman",Times,serif;--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-red-50:oklch(.971 .013 17.38);--color-red-100:oklch(.936 .032 17.717);--color-red-200:oklch(.885 .062 18.334);--color-red-300:oklch(.808 .114 19.571);--color-red-400:oklch(.704 .191 22.216);--color-red-500:oklch(.637 .237 25.331);--color-red-600:oklch(.577 .245 27.325);--color-red-700:oklch(.505 .213 27.518);--color-red-800:oklch(.444 .177 26.899);--color-red-900:oklch(.396 .141 25.723);--color-red-950:oklch(.258 .092 26.042);--color-orange-50:oklch(.98 .016 73.684);--color-orange-100:oklch(.954 .038 75.164);--color-orange-200:oklch(.901 .076 70.697);--color-orange-300:oklch(.837 .128 66.29);--color-orange-400:oklch(.75 .183 55.934);--color-orange-500:oklch(.705 .213 47.604);--color-orange-600:oklch(.646 .222 41.116);--color-orange-700:oklch(.553 .195 38.402);--color-orange-800:oklch(.47 .157 37.304);--color-orange-900:oklch(.408 .123 38.172);--color-orange-950:oklch(.266 .079 36.259);--color-amber-50:oklch(.987 .022 95.277);--color-amber-100:oklch(.962 .059 95.617);--color-amber-200:oklch(.924 .12 95.746);--color-amber-300:oklch(.879 .169 91.605);--color-amber-400:oklch(.828 .189 84.429);--color-amber-500:oklch(.769 .188 70.08);--color-amber-600:oklch(.666 .179 58.318);--color-amber-700:oklch(.555 .163 48.998);--color-amber-800:oklch(.473 .137 46.201);--color-amber-900:oklch(.414 .112 45.904);--color-amber-950:oklch(.279 .077 45.635);--color-yellow-50:oklch(.987 .026 102.212);--color-yellow-100:oklch(.973 .071 103.193);--color-yellow-200:oklch(.945 .129 101.54);--color-yellow-300:oklch(.905 .182 98.111);--color-yellow-400:oklch(.852 .199 91.936);--color-yellow-500:oklch(.795 .184 86.047);--color-yellow-600:oklch(.681 .162 75.834);--color-yellow-700:oklch(.554 .135 66.442);--color-yellow-800:oklch(.476 .114 61.907);--color-yellow-900:oklch(.421 .095 57.708);--color-yellow-950:oklch(.286 .066 53.813);--color-lime-50:oklch(.986 .031 120.757);--color-lime-100:oklch(.967 .067 122.328);--color-lime-200:oklch(.938 .127 124.321);--color-lime-300:oklch(.897 .196 126.665);--color-lime-400:oklch(.841 .238 128.85);--color-lime-500:oklch(.768 .233 130.85);--color-lime-600:oklch(.648 .2 131.684);--color-lime-700:oklch(.532 .157 131.589);--color-lime-800:oklch(.453 .124 130.933);--color-lime-900:oklch(.405 .101 131.063);--color-lime-950:oklch(.274 .072 132.109);--color-green-50:oklch(.982 .018 155.826);--color-green-100:oklch(.962 .044 156.743);--color-green-200:oklch(.925 .084 155.995);--color-green-300:oklch(.871 .15 154.449);--color-green-400:oklch(.792 .209 151.711);--color-green-500:oklch(.723 .219 149.579);--color-green-600:oklch(.627 .194 149.214);--color-green-700:oklch(.527 .154 150.069);--color-green-800:oklch(.448 .119 151.328);--color-green-900:oklch(.393 .095 152.535);--color-green-950:oklch(.266 .065 152.934);--color-emerald-50:oklch(.979 .021 166.113);--color-emerald-100:oklch(.95 .052 163.051);--color-emerald-200:oklch(.905 .093 164.15);--color-emerald-300:oklch(.845 .143 164.978);--color-emerald-400:oklch(.765 .177 163.223);--color-emerald-500:oklch(.696 .17 162.48);--color-emerald-600:oklch(.596 .145 163.225);--color-emerald-700:oklch(.508 .118 165.612);--color-emerald-800:oklch(.432 .095 166.913);--color-emerald-900:oklch(.378 .077 168.94);--color-emerald-950:oklch(.262 .051 172.552);--color-teal-50:oklch(.984 .014 180.72);--color-teal-100:oklch(.953 .051 180.801);--color-teal-200:oklch(.91 .096 180.426);--color-teal-300:oklch(.855 .138 181.071);--color-teal-400:oklch(.777 .152 181.912);--color-teal-500:oklch(.704 .14 182.503);--color-teal-600:oklch(.6 .118 184.704);--color-teal-700:oklch(.511 .096 186.391);--color-teal-800:oklch(.437 .078 188.216);--color-teal-900:oklch(.386 .063 188.416);--color-teal-950:oklch(.277 .046 192.524);--color-cyan-50:oklch(.984 .019 200.873);--color-cyan-100:oklch(.956 .045 203.388);--color-cyan-200:oklch(.917 .08 205.041);--color-cyan-300:oklch(.865 .127 207.078);--color-cyan-400:oklch(.789 .154 211.53);--color-cyan-500:oklch(.715 .143 215.221);--color-cyan-600:oklch(.609 .126 221.723);--color-cyan-700:oklch(.52 .105 223.128);--color-cyan-800:oklch(.45 .085 224.283);--color-cyan-900:oklch(.398 .07 227.392);--color-cyan-950:oklch(.302 .056 229.695);--color-sky-50:oklch(.977 .013 236.62);--color-sky-100:oklch(.951 .026 236.824);--color-sky-200:oklch(.901 .058 230.902);--color-sky-300:oklch(.828 .111 230.318);--color-sky-400:oklch(.746 .16 232.661);--color-sky-500:oklch(.685 .169 237.323);--color-sky-600:oklch(.588 .158 241.966);--color-sky-700:oklch(.5 .134 242.749);--color-sky-800:oklch(.443 .11 240.79);--color-sky-900:oklch(.391 .09 240.876);--color-sky-950:oklch(.293 .066 243.157);--color-blue-50:oklch(.97 .014 254.604);--color-blue-100:oklch(.932 .032 255.585);--color-blue-200:oklch(.882 .059 254.128);--color-blue-300:oklch(.809 .105 251.813);--color-blue-400:oklch(.707 .165 254.624);--color-blue-500:oklch(.623 .214 259.815);--color-blue-600:oklch(.546 .245 262.881);--color-blue-700:oklch(.488 .243 264.376);--color-blue-800:oklch(.424 .199 265.638);--color-blue-900:oklch(.379 .146 265.522);--color-blue-950:oklch(.282 .091 267.935);--color-indigo-50:oklch(.962 .018 272.314);--color-indigo-100:oklch(.93 .034 272.788);--color-indigo-200:oklch(.87 .065 274.039);--color-indigo-300:oklch(.785 .115 274.713);--color-indigo-400:oklch(.673 .182 276.935);--color-indigo-500:oklch(.585 .233 277.117);--color-indigo-600:oklch(.511 .262 276.966);--color-indigo-700:oklch(.457 .24 277.023);--color-indigo-800:oklch(.398 .195 277.366);--color-indigo-900:oklch(.359 .144 278.697);--color-indigo-950:oklch(.257 .09 281.288);--color-violet-50:oklch(.969 .016 293.756);--color-violet-100:oklch(.943 .029 294.588);--color-violet-200:oklch(.894 .057 293.283);--color-violet-300:oklch(.811 .111 293.571);--color-violet-400:oklch(.702 .183 293.541);--color-violet-500:oklch(.606 .25 292.717);--color-violet-600:oklch(.541 .281 293.009);--color-violet-700:oklch(.491 .27 292.581);--color-violet-800:oklch(.432 .232 292.759);--color-violet-900:oklch(.38 .189 293.745);--color-violet-950:oklch(.283 .141 291.089);--color-purple-50:oklch(.977 .014 308.299);--color-purple-100:oklch(.946 .033 307.174);--color-purple-200:oklch(.902 .063 306.703);--color-purple-300:oklch(.827 .119 306.383);--color-purple-400:oklch(.714 .203 305.504);--color-purple-500:oklch(.627 .265 303.9);--color-purple-600:oklch(.558 .288 302.321);--color-purple-700:oklch(.496 .265 301.924);--color-purple-800:oklch(.438 .218 303.724);--color-purple-900:oklch(.381 .176 304.987);--color-purple-950:oklch(.291 .149 302.717);--color-fuchsia-50:oklch(.977 .017 320.058);--color-fuchsia-100:oklch(.952 .037 318.852);--color-fuchsia-200:oklch(.903 .076 319.62);--color-fuchsia-300:oklch(.833 .145 321.434);--color-fuchsia-400:oklch(.74 .238 322.16);--color-fuchsia-500:oklch(.667 .295 322.15);--color-fuchsia-600:oklch(.591 .293 322.896);--color-fuchsia-700:oklch(.518 .253 323.949);--color-fuchsia-800:oklch(.452 .211 324.591);--color-fuchsia-900:oklch(.401 .17 325.612);--color-fuchsia-950:oklch(.293 .136 325.661);--color-pink-50:oklch(.971 .014 343.198);--color-pink-100:oklch(.948 .028 342.258);--color-pink-200:oklch(.899 .061 343.231);--color-pink-300:oklch(.823 .12 346.018);--color-pink-400:oklch(.718 .202 349.761);--color-pink-500:oklch(.656 .241 354.308);--color-pink-600:oklch(.592 .249 .584);--color-pink-700:oklch(.525 .223 3.958);--color-pink-800:oklch(.459 .187 3.815);--color-pink-900:oklch(.408 .153 2.432);--color-pink-950:oklch(.284 .109 3.907);--color-rose-50:oklch(.969 .015 12.422);--color-rose-100:oklch(.941 .03 12.58);--color-rose-200:oklch(.892 .058 10.001);--color-rose-300:oklch(.81 .117 11.638);--color-rose-400:oklch(.712 .194 13.428);--color-rose-500:oklch(.645 .246 16.439);--color-rose-600:oklch(.586 .253 17.585);--color-rose-700:oklch(.514 .222 16.935);--color-rose-800:oklch(.455 .188 13.697);--color-rose-900:oklch(.41 .159 10.272);--color-rose-950:oklch(.271 .105 12.094);--color-slate-50:oklch(.984 .003 247.858);--color-slate-100:oklch(.968 .007 247.896);--color-slate-200:oklch(.929 .013 255.508);--color-slate-300:oklch(.869 .022 252.894);--color-slate-400:oklch(.704 .04 256.788);--color-slate-500:oklch(.554 .046 257.417);--color-slate-600:oklch(.446 .043 257.281);--color-slate-700:oklch(.372 .044 257.287);--color-slate-800:oklch(.279 .041 260.031);--color-slate-900:oklch(.208 .042 265.755);--color-slate-950:oklch(.129 .042 264.695);--color-gray-50:oklch(.985 .002 247.839);--color-gray-100:oklch(.967 .003 264.542);--color-gray-200:oklch(.928 .006 264.531);--color-gray-300:oklch(.872 .01 258.338);--color-gray-400:oklch(.707 .022 261.325);--color-gray-500:oklch(.551 .027 264.364);--color-gray-600:oklch(.446 .03 256.802);--color-gray-700:oklch(.373 .034 259.733);--color-gray-800:oklch(.278 .033 256.848);--color-gray-900:oklch(.21 .034 264.665);--color-gray-950:oklch(.13 .028 261.692);--color-zinc-50:oklch(.985 0 0);--color-zinc-100:oklch(.967 .001 286.375);--color-zinc-200:oklch(.92 .004 286.32);--color-zinc-300:oklch(.871 .006 286.286);--color-zinc-400:oklch(.705 .015 286.067);--color-zinc-500:oklch(.552 .016 285.938);--color-zinc-600:oklch(.442 .017 285.786);--color-zinc-700:oklch(.37 .013 285.805);--color-zinc-800:oklch(.274 .006 286.033);--color-zinc-900:oklch(.21 .006 285.885);--color-zinc-950:oklch(.141 .005 285.823);--color-neutral-50:oklch(.985 0 0);--color-neutral-100:oklch(.97 0 0);--color-neutral-200:oklch(.922 0 0);--color-neutral-300:oklch(.87 0 0);--color-neutral-400:oklch(.708 0 0);--color-neutral-500:oklch(.556 0 0);--color-neutral-600:oklch(.439 0 0);--color-neutral-700:oklch(.371 0 0);--color-neutral-800:oklch(.269 0 0);--color-neutral-900:oklch(.205 0 0);--color-neutral-950:oklch(.145 0 0);--color-stone-50:oklch(.985 .001 106.423);--color-stone-100:oklch(.97 .001 106.424);--color-stone-200:oklch(.923 .003 48.717);--color-stone-300:oklch(.869 .005 56.366);--color-stone-400:oklch(.709 .01 56.259);--color-stone-500:oklch(.553 .013 58.071);--color-stone-600:oklch(.444 .011 73.639);--color-stone-700:oklch(.374 .01 67.558);--color-stone-800:oklch(.268 .007 34.298);--color-stone-900:oklch(.216 .006 56.043);--color-stone-950:oklch(.147 .004 49.25);--color-black:#000;--color-white:#fff;--spacing:.25rem;--breakpoint-sm:40rem;--breakpoint-md:48rem;--breakpoint-lg:64rem;--breakpoint-xl:80rem;--breakpoint-2xl:96rem;--container-3xs:16rem;--container-2xs:18rem;--container-xs:20rem;--container-sm:24rem;--container-md:28rem;--container-lg:32rem;--container-xl:36rem;--container-2xl:42rem;--container-3xl:48rem;--container-4xl:56rem;--container-5xl:64rem;--container-6xl:72rem;--container-7xl:80rem;--text-xs:.75rem;--text-xs--line-height:calc(1/.75);--text-sm:.875rem;--text-sm--line-height:calc(1.25/.875);--text-base:1rem;--text-base--line-height: 1.5 ;--text-lg:1.125rem;--text-lg--line-height:calc(1.75/1.125);--text-xl:1.25rem;--text-xl--line-height:calc(1.75/1.25);--text-2xl:1.5rem;--text-2xl--line-height:calc(2/1.5);--text-3xl:1.875rem;--text-3xl--line-height: 1.2 ;--text-4xl:2.25rem;--text-4xl--line-height:calc(2.5/2.25);--text-5xl:3rem;--text-5xl--line-height:1;--text-6xl:3.75rem;--text-6xl--line-height:1;--text-7xl:4.5rem;--text-7xl--line-height:1;--text-8xl:6rem;--text-8xl--line-height:1;--text-9xl:8rem;--text-9xl--line-height:1;--font-weight-thin:100;--font-weight-extralight:200;--font-weight-light:300;--font-weight-normal:400;--font-weight-medium:500;--font-weight-semibold:600;--font-weight-bold:700;--font-weight-extrabold:800;--font-weight-black:900;--tracking-tighter:-.05em;--tracking-tight:-.025em;--tracking-normal:0em;--tracking-wide:.025em;--tracking-wider:.05em;--tracking-widest:.1em;--leading-tight:1.25;--leading-snug:1.375;--leading-normal:1.5;--leading-relaxed:1.625;--leading-loose:2;--radius-xs:.125rem;--radius-sm:.25rem;--radius-md:.375rem;--radius-lg:.5rem;--radius-xl:.75rem;--radius-2xl:1rem;--radius-3xl:1.5rem;--radius-4xl:2rem;--shadow-2xs:0 1px #0000000d;--shadow-xs:0 1px 2px 0 #0000000d;--shadow-sm:0 1px 3px 0 #0000001a,0 1px 2px -1px #0000001a;--shadow-md:0 4px 6px -1px #0000001a,0 2px 4px -2px #0000001a;--shadow-lg:0 10px 15px -3px #0000001a,0 4px 6px -4px #0000001a;--shadow-xl:0 20px 25px -5px #0000001a,0 8px 10px -6px #0000001a;--shadow-2xl:0 25px 50px -12px #00000040;--inset-shadow-2xs:inset 0 1px #0000000d;--inset-shadow-xs:inset 0 1px 1px #0000000d;--inset-shadow-sm:inset 0 2px 4px #0000000d;--drop-shadow-xs:0 1px 1px #0000000d;--drop-shadow-sm:0 1px 2px #00000026;--drop-shadow-md:0 3px 3px #0000001f;--drop-shadow-lg:0 4px 4px #00000026;--drop-shadow-xl:0 9px 7px #0000001a;--drop-shadow-2xl:0 25px 25px #00000026;--ease-in:cubic-bezier(.4,0,1,1);--ease-out:cubic-bezier(0,0,.2,1);--ease-in-out:cubic-bezier(.4,0,.2,1);--animate-spin:spin 1s linear infinite;--animate-ping:ping 1s cubic-bezier(0,0,.2,1)infinite;--animate-pulse:pulse 2s cubic-bezier(.4,0,.6,1)infinite;--animate-bounce:bounce 1s infinite;--blur-xs:4px;--blur-sm:8px;--blur-md:12px;--blur-lg:16px;--blur-xl:24px;--blur-2xl:40px;--blur-3xl:64px;--perspective-dramatic:100px;--perspective-near:300px;--perspective-normal:500px;--perspective-midrange:800px;--perspective-distant:1200px;--aspect-video:16/9;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-font-feature-settings:var(--font-sans--font-feature-settings);--default-font-variation-settings:var(--font-sans--font-variation-settings);--default-mono-font-family:var(--font-mono);--default-mono-font-feature-settings:var(--font-mono--font-feature-settings);--default-mono-font-variation-settings:var(--font-mono--font-variation-settings)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}body{line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1;color:color-mix(in oklab,currentColor 50%,transparent)}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){-webkit-appearance:button;-moz-appearance:button;appearance:button}::file-selector-button{-webkit-appearance:button;-moz-appearance:button;appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.absolute{position:absolute}.relative{position:relative}.static{position:static}.inset-0{inset:calc(var(--spacing)*0)}.-mt-\[4\.9rem\]{margin-top:-4.9rem}.-mb-px{margin-bottom:-1px}.mb-1{margin-bottom:calc(var(--spacing)*1)}.mb-2{margin-bottom:calc(var(--spacing)*2)}.mb-4{margin-bottom:calc(var(--spacing)*4)}.mb-6{margin-bottom:calc(var(--spacing)*6)}.-ml-8{margin-left:calc(var(--spacing)*-8)}.flex{display:flex}.hidden{display:none}.inline-block{display:inline-block}.inline-flex{display:inline-flex}.table{display:table}.aspect-\[335\/376\]{aspect-ratio:335/376}.h-1{height:calc(var(--spacing)*1)}.h-1\.5{height:calc(var(--spacing)*1.5)}.h-2{height:calc(var(--spacing)*2)}.h-2\.5{height:calc(var(--spacing)*2.5)}.h-3{height:calc(var(--spacing)*3)}.h-3\.5{height:calc(var(--spacing)*3.5)}.h-14{height:calc(var(--spacing)*14)}.h-14\.5{height:calc(var(--spacing)*14.5)}.min-h-screen{min-height:100vh}.w-1{width:calc(var(--spacing)*1)}.w-1\.5{width:calc(var(--spacing)*1.5)}.w-2{width:calc(var(--spacing)*2)}.w-2\.5{width:calc(var(--spacing)*2.5)}.w-3{width:calc(var(--spacing)*3)}.w-3\.5{width:calc(var(--spacing)*3.5)}.w-\[448px\]{width:448px}.w-full{width:100%}.max-w-\[335px\]{max-width:335px}.max-w-none{max-width:none}.flex-1{flex:1}.shrink-0{flex-shrink:0}.translate-y-0{--tw-translate-y:calc(var(--spacing)*0);translate:var(--tw-translate-x)var(--tw-translate-y)}.transform{transform:var(--tw-rotate-x)var(--tw-rotate-y)var(--tw-rotate-z)var(--tw-skew-x)var(--tw-skew-y)}.flex-col{flex-direction:column}.flex-col-reverse{flex-direction:column-reverse}.items-center{align-items:center}.justify-center{justify-content:center}.justify-end{justify-content:flex-end}.gap-3{gap:calc(var(--spacing)*3)}.gap-4{gap:calc(var(--spacing)*4)}:where(.space-x-1>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--spacing)*1)*var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--spacing)*1)*calc(1 - var(--tw-space-x-reverse)))}.overflow-hidden{overflow:hidden}.rounded-full{border-radius:3.40282e38px}.rounded-sm{border-radius:var(--radius-sm)}.rounded-t-lg{border-top-left-radius:var(--radius-lg);border-top-right-radius:var(--radius-lg)}.rounded-br-lg{border-bottom-right-radius:var(--radius-lg)}.rounded-bl-lg{border-bottom-left-radius:var(--radius-lg)}.border{border-style:var(--tw-border-style);border-width:1px}.border-\[\#19140035\]{border-color:#19140035}.border-\[\#e3e3e0\]{border-color:#e3e3e0}.border-black{border-color:var(--color-black)}.border-transparent{border-color:#0000}.bg-\[\#1b1b18\]{background-color:#1b1b18}.bg-\[\#FDFDFC\]{background-color:#fdfdfc}.bg-\[\#dbdbd7\]{background-color:#dbdbd7}.bg-\[\#fff2f2\]{background-color:#fff2f2}.bg-white{background-color:var(--color-white)}.p-6{padding:calc(var(--spacing)*6)}.px-5{padding-inline:calc(var(--spacing)*5)}.py-1{padding-block:calc(var(--spacing)*1)}.py-1\.5{padding-block:calc(var(--spacing)*1.5)}.py-2{padding-block:calc(var(--spacing)*2)}.pb-12{padding-bottom:calc(var(--spacing)*12)}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-\[13px\]{font-size:13px}.leading-\[20px\]{--tw-leading:20px;line-height:20px}.leading-normal{--tw-leading:var(--leading-normal);line-height:var(--leading-normal)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.text-\[\#1b1b18\]{color:#1b1b18}.text-\[\#706f6c\]{color:#706f6c}.text-\[\#F53003\],.text-\[\#f53003\]{color:#f53003}.text-white{color:var(--color-white)}.underline{text-decoration-line:underline}.underline-offset-4{text-underline-offset:4px}.opacity-100{opacity:1}.shadow-\[0px_0px_1px_0px_rgba\(0\,0\,0\,0\.03\)\,0px_1px_2px_0px_rgba\(0\,0\,0\,0\.06\)\]{--tw-shadow:0px 0px 1px 0px var(--tw-shadow-color,#00000008),0px 1px 2px 0px var(--tw-shadow-color,#0000000f);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-\[inset_0px_0px_0px_1px_rgba\(26\,26\,0\,0\.16\)\]{--tw-shadow:inset 0px 0px 0px 1px var(--tw-shadow-color,#1a1a0029);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.\!filter{filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)!important}.filter{filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.delay-300{transition-delay:.3s}.duration-750{--tw-duration:.75s;transition-duration:.75s}.not-has-\[nav\]\:hidden:not(:has(:is(nav))){display:none}.before\:absolute:before{content:var(--tw-content);position:absolute}.before\:top-0:before{content:var(--tw-content);top:calc(var(--spacing)*0)}.before\:top-1\/2:before{content:var(--tw-content);top:50%}.before\:bottom-0:before{content:var(--tw-content);bottom:calc(var(--spacing)*0)}.before\:bottom-1\/2:before{content:var(--tw-content);bottom:50%}.before\:left-\[0\.4rem\]:before{content:var(--tw-content);left:.4rem}.before\:border-l:before{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:1px}.before\:border-\[\#e3e3e0\]:before{content:var(--tw-content);border-color:#e3e3e0}@media (hover:hover){.hover\:border-\[\#1915014a\]:hover{border-color:#1915014a}.hover\:border-\[\#19140035\]:hover{border-color:#19140035}.hover\:border-black:hover{border-color:var(--color-black)}.hover\:bg-black:hover{background-color:var(--color-black)}}@media (width>=64rem){.lg\:-mt-\[6\.6rem\]{margin-top:-6.6rem}.lg\:mb-0{margin-bottom:calc(var(--spacing)*0)}.lg\:mb-6{margin-bottom:calc(var(--spacing)*6)}.lg\:-ml-px{margin-left:-1px}.lg\:ml-0{margin-left:calc(var(--spacing)*0)}.lg\:block{display:block}.lg\:aspect-auto{aspect-ratio:auto}.lg\:w-\[438px\]{width:438px}.lg\:max-w-4xl{max-width:var(--container-4xl)}.lg\:grow{flex-grow:1}.lg\:flex-row{flex-direction:row}.lg\:justify-center{justify-content:center}.lg\:rounded-t-none{border-top-left-radius:0;border-top-right-radius:0}.lg\:rounded-tl-lg{border-top-left-radius:var(--radius-lg)}.lg\:rounded-r-lg{border-top-right-radius:var(--radius-lg);border-bottom-right-radius:var(--radius-lg)}.lg\:rounded-br-none{border-bottom-right-radius:0}.lg\:p-8{padding:calc(var(--spacing)*8)}.lg\:p-20{padding:calc(var(--spacing)*20)}}@media (prefers-color-scheme:dark){.dark\:block{display:block}.dark\:hidden{display:none}.dark\:border-\[\#3E3E3A\]{border-color:#3e3e3a}.dark\:border-\[\#eeeeec\]{border-color:#eeeeec}.dark\:bg-\[\#0a0a0a\]{background-color:#0a0a0a}.dark\:bg-\[\#1D0002\]{background-color:#1d0002}.dark\:bg-\[\#3E3E3A\]{background-color:#3e3e3a}.dark\:bg-\[\#161615\]{background-color:#161615}.dark\:bg-\[\#eeeeec\]{background-color:#eeeeec}.dark\:text-\[\#1C1C1A\]{color:#1c1c1a}.dark\:text-\[\#A1A09A\]{color:#a1a09a}.dark\:text-\[\#EDEDEC\]{color:#ededec}.dark\:text-\[\#F61500\]{color:#f61500}.dark\:text-\[\#FF4433\]{color:#f43}.dark\:shadow-\[inset_0px_0px_0px_1px_\#fffaed2d\]{--tw-shadow:inset 0px 0px 0px 1px var(--tw-shadow-color,#fffaed2d);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.dark\:before\:border-\[\#3E3E3A\]:before{content:var(--tw-content);border-color:#3e3e3a}@media (hover:hover){.dark\:hover\:border-\[\#3E3E3A\]:hover{border-color:#3e3e3a}.dark\:hover\:border-\[\#62605b\]:hover{border-color:#62605b}.dark\:hover\:border-white:hover{border-color:var(--color-white)}.dark\:hover\:bg-white:hover{background-color:var(--color-white)}}}@starting-style{.starting\:translate-y-4{--tw-translate-y:calc(var(--spacing)*4);translate:var(--tw-translate-x)var(--tw-translate-y)}}@starting-style{.starting\:translate-y-6{--tw-translate-y:calc(var(--spacing)*6);translate:var(--tw-translate-x)var(--tw-translate-y)}}@starting-style{.starting\:opacity-0{opacity:0}}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes ping{75%,to{opacity:0;transform:scale(2)}}@keyframes pulse{50%{opacity:.5}}@keyframes bounce{0%,to{animation-timing-function:cubic-bezier(.8,0,1,1);transform:translateY(-25%)}50%{animation-timing-function:cubic-bezier(0,0,.2,1);transform:none}}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false;initial-value:rotateX(0)}@property --tw-rotate-y{syntax:"*";inherits:false;initial-value:rotateY(0)}@property --tw-rotate-z{syntax:"*";inherits:false;initial-value:rotateZ(0)}@property --tw-skew-x{syntax:"*";inherits:false;initial-value:skewX(0)}@property --tw-skew-y{syntax:"*";inherits:false;initial-value:skewY(0)}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}
            </style>
        @endif
    </head>
    <body class="bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] flex p-6 lg:p-8 items-center lg:justify-center min-h-screen flex-col">
        <header class="w-full lg:max-w-4xl max-w-[335px] text-sm mb-6 not-has-[nav]:hidden">
            @if (Route::has('login'))
                <nav class="flex items-center justify-end gap-4">
                    @auth
                        <a
                            href="{{ url('/dashboard') }}"
                            class="inline-block px-5 py-1.5 dark:text-[#EDEDEC] border-[#19140035] hover:border-[#1915014a] border text-[#1b1b18] dark:border-[#3E3E3A] dark:hover:border-[#62605b] rounded-sm text-sm leading-normal"
                        >
                            Dashboard
                        </a>
                    @else
                        <a
                            href="{{ route('login') }}"
                            class="inline-block px-5 py-1.5 dark:text-[#EDEDEC] text-[#1b1b18] border border-transparent hover:border-[#19140035] dark:hover:border-[#3E3E3A] rounded-sm text-sm leading-normal"
                        >
                            Log in
                        </a>

                        @if (Route::has('register'))
                            <a
                                href="{{ route('register') }}"
                                class="inline-block px-5 py-1.5 dark:text-[#EDEDEC] border-[#19140035] hover:border-[#1915014a] border text-[#1b1b18] dark:border-[#3E3E3A] dark:hover:border-[#62605b] rounded-sm text-sm leading-normal">
                                Register
                            </a>
                        @endif
                    @endauth
                </nav>
            @endif
        </header>
        <div class="flex items-center justify-center w-full transition-opacity opacity-100 duration-750 lg:grow starting:opacity-0">
            <main class="flex max-w-[335px] w-full flex-col-reverse lg:max-w-4xl lg:flex-row">
                <div class="text-[13px] leading-[20px] flex-1 p-6 pb-12 lg:p-20 bg-white dark:bg-[#161615] dark:text-[#EDEDEC] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d] rounded-bl-lg rounded-br-lg lg:rounded-tl-lg lg:rounded-br-none">
                    <h1 class="mb-1 font-medium">Let's get started</h1>
                    <p class="mb-2 text-[#706f6c] dark:text-[#A1A09A]">Laravel has an incredibly rich ecosystem. <br>We suggest starting with the following.</p>
                    <ul class="flex flex-col mb-4 lg:mb-6">
                        <li class="flex items-center gap-4 py-2 relative before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A] before:top-1/2 before:bottom-0 before:left-[0.4rem] before:absolute">
                            <span class="relative py-1 bg-white dark:bg-[#161615]">
                                <span class="flex items-center justify-center rounded-full bg-[#FDFDFC] dark:bg-[#161615] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] w-3.5 h-3.5 border dark:border-[#3E3E3A] border-[#e3e3e0]">
                                    <span class="rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A] w-1.5 h-1.5"></span>
                                </span>
                            </span>
                            <span>
                                Read the
                                <a href="https://laravel.com/docs" target="_blank" class="inline-flex items-center space-x-1 font-medium underline underline-offset-4 text-[#f53003] dark:text-[#FF4433] ml-1">
                                    <span>Documentation</span>
                                    <svg
                                        width="10"
                                        height="11"
                                        viewBox="0 0 10 11"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-2.5 h-2.5"
                                    >
                                        <path
                                            d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
                                            stroke="currentColor"
                                            stroke-linecap="square"
                                        />
                                    </svg>
                                </a>
                            </span>
                        </li>
                        <li class="flex items-center gap-4 py-2 relative before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A] before:bottom-1/2 before:top-0 before:left-[0.4rem] before:absolute">
                            <span class="relative py-1 bg-white dark:bg-[#161615]">
                                <span class="flex items-center justify-center rounded-full bg-[#FDFDFC] dark:bg-[#161615] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] w-3.5 h-3.5 border dark:border-[#3E3E3A] border-[#e3e3e0]">
                                    <span class="rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A] w-1.5 h-1.5"></span>
                                </span>
                            </span>
                            <span>
                                Watch video tutorials at
                                <a href="https://laracasts.com" target="_blank" class="inline-flex items-center space-x-1 font-medium underline underline-offset-4 text-[#f53003] dark:text-[#FF4433] ml-1">
                                    <span>Laracasts</span>
                                    <svg
                                        width="10"
                                        height="11"
                                        viewBox="0 0 10 11"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-2.5 h-2.5"
                                    >
                                        <path
                                            d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
                                            stroke="currentColor"
                                            stroke-linecap="square"
                                        />
                                    </svg>
                                </a>
                            </span>
                        </li>
                    </ul>
                    <ul class="flex gap-3 text-sm leading-normal">
                        <li>
                            <a href="https://cloud.laravel.com" target="_blank" class="inline-block dark:bg-[#eeeeec] dark:border-[#eeeeec] dark:text-[#1C1C1A] dark:hover:bg-white dark:hover:border-white hover:bg-black hover:border-black px-5 py-1.5 bg-[#1b1b18] rounded-sm border border-black text-white text-sm leading-normal">
                                Deploy now
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="bg-[#fff2f2] dark:bg-[#1D0002] relative lg:-ml-px -mb-px lg:mb-0 rounded-t-lg lg:rounded-t-none lg:rounded-r-lg aspect-[335/376] lg:aspect-auto w-full lg:w-[438px] shrink-0 overflow-hidden">
                    {{-- Laravel Logo --}}
                    <svg class="w-full text-[#F53003] dark:text-[#F61500] transition-all translate-y-0 opacity-100 max-w-none duration-750 starting:opacity-0 starting:translate-y-6" viewBox="0 0 438 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.2036 -3H0V102.197H49.5189V86.7187H17.2036V-3Z" fill="currentColor" />
                        <path d="M110.256 41.6337C108.061 38.1275 104.945 35.3731 100.905 33.3681C96.8667 31.3647 92.8016 30.3618 88.7131 30.3618C83.4247 30.3618 78.5885 31.3389 74.201 33.2923C69.8111 35.2456 66.0474 37.928 62.9059 41.3333C59.7643 44.7401 57.3198 48.6726 55.5754 53.1293C53.8287 57.589 52.9572 62.274 52.9572 67.1813C52.9572 72.1925 53.8287 76.8995 55.5754 81.3069C57.3191 85.7173 59.7636 89.6241 62.9059 93.0293C66.0474 96.4361 69.8119 99.1155 74.201 101.069C78.5885 103.022 83.4247 103.999 88.7131 103.999C92.8016 103.999 96.8667 102.997 100.905 100.994C104.945 98.9911 108.061 96.2359 110.256 92.7282V102.195H126.563V32.1642H110.256V41.6337ZM108.76 75.7472C107.762 78.4531 106.366 80.8078 104.572 82.8112C102.776 84.8161 100.606 86.4183 98.0637 87.6206C95.5202 88.823 92.7004 89.4238 89.6103 89.4238C86.5178 89.4238 83.7252 88.823 81.2324 87.6206C78.7388 86.4183 76.5949 84.8161 74.7998 82.8112C73.004 80.8078 71.6319 78.4531 70.6856 75.7472C69.7356 73.0421 69.2644 70.1868 69.2644 67.1821C69.2644 64.1758 69.7356 61.3205 70.6856 58.6154C71.6319 55.9102 73.004 53.5571 74.7998 51.5522C76.5949 49.5495 78.738 47.9451 81.2324 46.7427C83.7252 45.5404 86.5178 44.9396 89.6103 44.9396C92.7012 44.9396 95.5202 45.5404 98.0637 46.7427C100.606 47.9451 102.776 49.5487 104.572 51.5522C106.367 53.5571 107.762 55.9102 108.76 58.6154C109.756 61.3205 110.256 64.1758 110.256 67.1821C110.256 70.1868 109.756 73.0421 108.76 75.7472Z" fill="currentColor" />
                        <path d="M242.805 41.6337C240.611 38.1275 237.494 35.3731 233.455 33.3681C229.416 31.3647 225.351 30.3618 221.262 30.3618C215.974 30.3618 211.138 31.3389 206.75 33.2923C202.36 35.2456 198.597 37.928 195.455 41.3333C192.314 44.7401 189.869 48.6726 188.125 53.1293C186.378 57.589 185.507 62.274 185.507 67.1813C185.507 72.1925 186.378 76.8995 188.125 81.3069C189.868 85.7173 192.313 89.6241 195.455 93.0293C198.597 96.4361 202.361 99.1155 206.75 101.069C211.138 103.022 215.974 103.999 221.262 103.999C225.351 103.999 229.416 102.997 233.455 100.994C237.494 98.9911 240.611 96.2359 242.805 92.7282V102.195H259.112V32.1642H242.805V41.6337ZM241.31 75.7472C240.312 78.4531 238.916 80.8078 237.122 82.8112C235.326 84.8161 233.156 86.4183 230.614 87.6206C228.07 88.823 225.251 89.4238 222.16 89.4238C219.068 89.4238 216.275 88.823 213.782 87.6206C211.289 86.4183 209.145 84.8161 207.35 82.8112C205.554 80.8078 204.182 78.4531 203.236 75.7472C202.286 73.0421 201.814 70.1868 201.814 67.1821C201.814 64.1758 202.286 61.3205 203.236 58.6154C204.182 55.9102 205.554 53.5571 207.35 51.5522C209.145 49.5495 211.288 47.9451 213.782 46.7427C216.275 45.5404 219.068 44.9396 222.16 44.9396C225.251 44.9396 228.07 45.5404 230.614 46.7427C233.156 47.9451 235.326 49.5487 237.122 51.5522C238.917 53.5571 240.312 55.9102 241.31 58.6154C242.306 61.3205 242.806 64.1758 242.806 67.1821C242.805 70.1868 242.305 73.0421 241.31 75.7472Z" fill="currentColor" />
                        <path d="M438 -3H421.694V102.197H438V-3Z" fill="currentColor" />
                        <path d="M139.43 102.197H155.735V48.2834H183.712V32.1665H139.43V102.197Z" fill="currentColor" />
                        <path d="M324.49 32.1665L303.995 85.794L283.498 32.1665H266.983L293.748 102.197H314.242L341.006 32.1665H324.49Z" fill="currentColor" />
                        <path d="M376.571 30.3656C356.603 30.3656 340.797 46.8497 340.797 67.1828C340.797 89.6597 356.094 104 378.661 104C391.29 104 399.354 99.1488 409.206 88.5848L398.189 80.0226C398.183 80.031 389.874 90.9895 377.468 90.9895C363.048 90.9895 356.977 79.3111 356.977 73.269H411.075C413.917 50.1328 398.775 30.3656 376.571 30.3656ZM357.02 61.0967C357.145 59.7487 359.023 43.3761 376.442 43.3761C393.861 43.3761 395.978 59.7464 396.099 61.0967H357.02Z" fill="currentColor" />
                    </svg>

                    {{-- Light Mode 12 SVG --}}
                    <svg class="w-[448px] max-w-none relative -mt-[4.9rem] -ml-8 lg:ml-0 lg:-mt-[6.6rem] dark:hidden" viewBox="0 0 440 376" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g class="transition-all delay-300 translate-y-0 opacity-100 duration-750 starting:opacity-0 starting:translate-y-4">
                            <path d="M188.263 355.73L188.595 355.73C195.441 348.845 205.766 339.761 219.569 328.477C232.93 317.193 242.978 308.205 249.714 301.511C256.34 294.626 260.867 287.358 263.296 279.708C265.725 272.058 264.565 264.121 259.816 255.896C254.516 246.716 247.062 239.352 237.454 233.805C227.957 228.067 217.908 225.198 207.307 225.198C196.927 225.197 190.136 227.97 186.934 233.516C183.621 238.872 184.726 246.331 190.247 255.894L125.647 255.891C116.371 239.825 112.395 225.481 113.72 212.858C115.265 200.235 121.559 190.481 132.602 183.596C143.754 176.52 158.607 172.982 177.159 172.983C196.594 172.984 215.863 176.523 234.968 183.6C253.961 190.486 271.299 200.241 286.98 212.864C302.661 225.488 315.14 239.833 324.416 255.899C333.03 270.817 336.841 283.918 335.847 295.203C335.075 306.487 331.376 316.336 324.75 324.751C318.346 333.167 308.408 343.494 294.936 355.734L377.094 355.737L405.917 405.656L217.087 405.649L188.263 355.73Z" fill="black" />
                            <path d="M9.11884 226.339L-13.7396 226.338L-42.7286 176.132L43.0733 176.135L175.595 405.649L112.651 405.647L9.11884 226.339Z" fill="black" />
                            <path d="M188.263 355.73L188.595 355.73C195.441 348.845 205.766 339.761 219.569 328.477C232.93 317.193 242.978 308.205 249.714 301.511C256.34 294.626 260.867 287.358 263.296 279.708C265.725 272.058 264.565 264.121 259.816 255.896C254.516 246.716 247.062 239.352 237.454 233.805C227.957 228.067 217.908 225.198 207.307 225.198C196.927 225.197 190.136 227.97 186.934 233.516C183.621 238.872 184.726 246.331 190.247 255.894L125.647 255.891C116.371 239.825 112.395 225.481 113.72 212.858C115.265 200.235 121.559 190.481 132.602 183.596C143.754 176.52 158.607 172.982 177.159 172.983C196.594 172.984 215.863 176.523 234.968 183.6C253.961 190.486 271.299 200.241 286.98 212.864C302.661 225.488 315.14 239.833 324.416 255.899C333.03 270.817 336.841 283.918 335.847 295.203C335.075 306.487 331.376 316.336 324.75 324.751C318.346 333.167 308.408 343.494 294.936 355.734L377.094 355.737L405.917 405.656L217.087 405.649L188.263 355.73Z" stroke="#1B1B18" stroke-width="1" />
                            <path d="M9.11884 226.339L-13.7396 226.338L-42.7286 176.132L43.0733 176.135L175.595 405.649L112.651 405.647L9.11884 226.339Z" stroke="#1B1B18" stroke-width="1" />
                            <path d="M204.592 327.449L204.923 327.449C211.769 320.564 222.094 311.479 235.897 300.196C249.258 288.912 259.306 279.923 266.042 273.23C272.668 266.345 277.195 259.077 279.624 251.427C282.053 243.777 280.893 235.839 276.145 227.615C270.844 218.435 263.39 211.071 253.782 205.524C244.285 199.786 234.236 196.917 223.635 196.916C213.255 196.916 206.464 199.689 203.262 205.235C199.949 210.59 201.054 218.049 206.575 227.612L141.975 227.61C132.699 211.544 128.723 197.2 130.048 184.577C131.593 171.954 137.887 162.2 148.93 155.315C160.083 148.239 174.935 144.701 193.487 144.702C212.922 144.703 232.192 148.242 251.296 155.319C270.289 162.205 287.627 171.96 303.308 184.583C318.989 197.207 331.468 211.552 340.745 227.618C349.358 242.536 353.169 255.637 352.175 266.921C351.403 278.205 347.704 288.055 341.078 296.47C334.674 304.885 324.736 315.213 311.264 327.453L393.422 327.456L422.246 377.375L233.415 377.368L204.592 327.449Z" fill="#F8B803" />
                            <path d="M25.447 198.058L2.58852 198.057L-26.4005 147.851L59.4015 147.854L191.923 377.368L128.979 377.365L25.447 198.058Z" fill="#F8B803" />
                            <path d="M204.592 327.449L204.923 327.449C211.769 320.564 222.094 311.479 235.897 300.196C249.258 288.912 259.306 279.923 266.042 273.23C272.668 266.345 277.195 259.077 279.624 251.427C282.053 243.777 280.893 235.839 276.145 227.615C270.844 218.435 263.39 211.071 253.782 205.524C244.285 199.786 234.236 196.917 223.635 196.916C213.255 196.916 206.464 199.689 203.262 205.235C199.949 210.59 201.054 218.049 206.575 227.612L141.975 227.61C132.699 211.544 128.723 197.2 130.048 184.577C131.593 171.954 137.887 162.2 148.93 155.315C160.083 148.239 174.935 144.701 193.487 144.702C212.922 144.703 232.192 148.242 251.296 155.319C270.289 162.205 287.627 171.96 303.308 184.583C318.989 197.207 331.468 211.552 340.745 227.618C349.358 242.536 353.169 255.637 352.175 266.921C351.403 278.205 347.704 288.055 341.078 296.47C334.674 304.885 324.736 315.213 311.264 327.453L393.422 327.456L422.246 377.375L233.415 377.368L204.592 327.449Z" stroke="#1B1B18" stroke-width="1" />
                            <path d="M25.447 198.058L2.58852 198.057L-26.4005 147.851L59.4015 147.854L191.923 377.368L128.979 377.365L25.447 198.058Z" stroke="#1B1B18" stroke-width="1" />
                        </g>
                        <g style="mix-blend-mode: hard-light" class="transition-all delay-300 translate-y-0 opacity-100 duration-750 starting:opacity-0 starting:translate-y-4">
                            <path d="M217.342 305.363L217.673 305.363C224.519 298.478 234.844 289.393 248.647 278.11C262.008 266.826 272.056 257.837 278.792 251.144C285.418 244.259 289.945 236.991 292.374 229.341C294.803 221.691 293.643 213.753 288.895 205.529C283.594 196.349 276.14 188.985 266.532 183.438C257.035 177.7 246.986 174.831 236.385 174.83C226.005 174.83 219.214 177.603 216.012 183.149C212.699 188.504 213.804 195.963 219.325 205.527L154.725 205.524C145.449 189.458 141.473 175.114 142.798 162.491C144.343 149.868 150.637 140.114 161.68 133.229C172.833 126.153 187.685 122.615 206.237 122.616C225.672 122.617 244.942 126.156 264.046 133.233C283.039 140.119 300.377 149.874 316.058 162.497C331.739 175.121 344.218 189.466 353.495 205.532C362.108 220.45 365.919 233.551 364.925 244.835C364.153 256.12 360.454 265.969 353.828 274.384C347.424 282.799 337.486 293.127 324.014 305.367L406.172 305.37L434.996 355.289L246.165 355.282L217.342 305.363Z" fill="#F0ACB8" />
                            <path d="M38.197 175.972L15.3385 175.971L-13.6505 125.765L72.1515 125.768L204.673 355.282L141.729 355.279L38.197 175.972Z" fill="#F0ACB8" />
                            <path d="M217.342 305.363L217.673 305.363C224.519 298.478 234.844 289.393 248.647 278.11C262.008 266.826 272.056 257.837 278.792 251.144C285.418 244.259 289.945 236.991 292.374 229.341C294.803 221.691 293.643 213.753 288.895 205.529C283.594 196.349 276.14 188.985 266.532 183.438C257.035 177.7 246.986 174.831 236.385 174.83C226.005 174.83 219.214 177.603 216.012 183.149C212.699 188.504 213.804 195.963 219.325 205.527L154.725 205.524C145.449 189.458 141.473 175.114 142.798 162.491C144.343 149.868 150.637 140.114 161.68 133.229C172.833 126.153 187.685 122.615 206.237 122.616C225.672 122.617 244.942 126.156 264.046 133.233C283.039 140.119 300.377 149.874 316.058 162.497C331.739 175.121 344.218 189.466 353.495 205.532C362.108 220.45 365.919 233.551 364.925 244.835C364.153 256.12 360.454 265.969 353.828 274.384C347.424 282.799 337.486 293.127 324.014 305.367L406.172 305.37L434.996 355.289L246.165 355.282L217.342 305.363Z" stroke="#1B1B18" stroke-width="1" />
                            <path d="M38.197 175.972L15.3385 175.971L-13.6505 125.765L72.1515 125.768L204.673 355.282L141.729 355.279L38.197 175.972Z" stroke="#1B1B18" stroke-width="1" />
                        </g>
                        <g style="mix-blend-mode: plus-darker" class="transition-all delay-300 translate-y-0 opacity-100 duration-750 starting:opacity-0 starting:translate-y-4">
                            <path d="M230.951 281.792L231.282 281.793C238.128 274.907 248.453 265.823 262.256 254.539C275.617 243.256 285.666 234.267 292.402 227.573C299.027 220.688 303.554 213.421 305.983 205.771C308.412 198.12 307.253 190.183 302.504 181.959C297.203 172.778 289.749 165.415 280.142 159.868C270.645 154.13 260.596 151.26 249.995 151.26C239.615 151.26 232.823 154.033 229.621 159.579C226.309 164.934 227.413 172.393 232.935 181.956L168.335 181.954C159.058 165.888 155.082 151.543 156.407 138.92C157.953 126.298 164.247 116.544 175.289 109.659C186.442 102.583 201.294 99.045 219.846 99.0457C239.281 99.0464 258.551 102.585 277.655 109.663C296.649 116.549 313.986 126.303 329.667 138.927C345.349 151.551 357.827 165.895 367.104 181.961C375.718 196.88 379.528 209.981 378.535 221.265C377.762 232.549 374.063 242.399 367.438 250.814C361.033 259.229 351.095 269.557 337.624 281.796L419.782 281.8L448.605 331.719L259.774 331.712L230.951 281.792Z" fill="#F3BEC7" />
                            <path d="M51.8063 152.402L28.9479 152.401L-0.0411453 102.195L85.7608 102.198L218.282 331.711L155.339 331.709L51.8063 152.402Z" fill="#F3BEC7" />
                            <path d="M230.951 281.792L231.282 281.793C238.128 274.907 248.453 265.823 262.256 254.539C275.617 243.256 285.666 234.267 292.402 227.573C299.027 220.688 303.554 213.421 305.983 205.771C308.412 198.12 307.253 190.183 302.504 181.959C297.203 172.778 289.749 165.415 280.142 159.868C270.645 154.13 260.596 151.26 249.995 151.26C239.615 151.26 232.823 154.033 229.621 159.579C226.309 164.934 227.413 172.393 232.935 181.956L168.335 181.954C159.058 165.888 155.082 151.543 156.407 138.92C157.953 126.298 164.247 116.544 175.289 109.659C186.442 102.583 201.294 99.045 219.846 99.0457C239.281 99.0464 258.551 102.585 277.655 109.663C296.649 116.549 313.986 126.303 329.667 138.927C345.349 151.551 357.827 165.895 367.104 181.961C375.718 196.88 379.528 209.981 378.535 221.265C377.762 232.549 374.063 242.399 367.438 250.814C361.033 259.229 351.095 269.557 337.624 281.796L419.782 281.8L448.605 331.719L259.774 331.712L230.951 281.792Z" stroke="#1B1B18" stroke-width="1" />
                            <path d="M51.8063 152.402L28.9479 152.401L-0.0411453 102.195L85.7608 102.198L218.282 331.711L155.339 331.709L51.8063 152.402Z" stroke="#1B1B18" stroke-width="1" />
                        </g>
                        <g class="transition-all delay-300 translate-y-0 opacity-100 duration-750 starting:opacity-0 starting:translate-y-4">
                            <path d="M188.467 355.363L188.798 355.363C195.644 348.478 205.969 339.393 219.772 328.11C233.133 316.826 243.181 307.837 249.917 301.144C253.696 297.217 256.792 293.166 259.205 288.991C261.024 285.845 262.455 282.628 263.499 279.341C265.928 271.691 264.768 263.753 260.02 255.529C254.719 246.349 247.265 238.985 237.657 233.438C228.16 227.7 218.111 224.831 207.51 224.83C197.13 224.83 190.339 227.603 187.137 233.149C183.824 238.504 184.929 245.963 190.45 255.527L125.851 255.524C116.574 239.458 112.598 225.114 113.923 212.491C114.615 206.836 116.261 201.756 118.859 197.253C122.061 191.704 126.709 187.03 132.805 183.229C143.958 176.153 158.81 172.615 177.362 172.616C196.797 172.617 216.067 176.156 235.171 183.233C254.164 190.119 271.502 199.874 287.183 212.497C302.864 225.121 315.343 239.466 324.62 255.532C333.233 270.45 337.044 283.551 336.05 294.835C335.46 303.459 333.16 311.245 329.151 318.194C327.915 320.337 326.515 322.4 324.953 324.384C318.549 332.799 308.611 343.127 295.139 355.367L377.297 355.37L406.121 405.289L217.29 405.282L188.467 355.363Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M9.32197 225.972L-13.5365 225.971L-42.5255 175.765L43.2765 175.768L175.798 405.282L112.854 405.279L9.32197 225.972Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M345.247 111.915C329.566 99.2919 312.229 89.5371 293.235 82.6512L235.167 183.228C254.161 190.114 271.498 199.869 287.179 212.492L345.247 111.915Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M382.686 154.964C373.41 138.898 360.931 124.553 345.25 111.93L287.182 212.506C302.863 225.13 315.342 239.475 324.618 255.541L382.686 154.964Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M293.243 82.6472C274.139 75.57 254.869 72.031 235.434 72.0303L177.366 172.607C196.801 172.608 216.071 176.147 235.175 183.224L293.243 82.6472Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M394.118 194.257C395.112 182.973 391.301 169.872 382.688 154.953L324.619 255.53C333.233 270.448 337.044 283.55 336.05 294.834L394.118 194.257Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M235.432 72.0311C216.88 72.0304 202.027 75.5681 190.875 82.6442L132.806 183.221C143.959 176.145 158.812 172.607 177.363 172.608L235.432 72.0311Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M265.59 124.25C276.191 124.251 286.24 127.12 295.737 132.858L237.669 233.435C228.172 227.697 218.123 224.828 207.522 224.827L265.59 124.25Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M295.719 132.859C305.326 138.406 312.78 145.77 318.081 154.95L260.013 255.527C254.712 246.347 247.258 238.983 237.651 233.436L295.719 132.859Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M387.218 217.608C391.227 210.66 393.527 202.874 394.117 194.25L336.049 294.827C335.459 303.451 333.159 311.237 329.15 318.185L387.218 217.608Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M245.211 132.577C248.413 127.03 255.204 124.257 265.584 124.258L207.516 224.835C197.136 224.834 190.345 227.607 187.143 233.154L245.211 132.577Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M318.094 154.945C322.842 163.17 324.002 171.107 321.573 178.757L263.505 279.334C265.934 271.684 264.774 263.746 260.026 255.522L318.094 154.945Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M176.925 96.6737C180.127 91.1249 184.776 86.4503 190.871 82.6499L132.803 183.227C126.708 187.027 122.059 191.702 118.857 197.25L176.925 96.6737Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M387.226 217.606C385.989 219.749 384.59 221.813 383.028 223.797L324.96 324.373C326.522 322.39 327.921 320.326 329.157 318.183L387.226 217.606Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M317.269 188.408C319.087 185.262 320.519 182.045 321.562 178.758L263.494 279.335C262.451 282.622 261.019 285.839 259.201 288.985L317.269 188.408Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M245.208 132.573C241.895 137.928 243 145.387 248.522 154.95L190.454 255.527C184.932 245.964 183.827 238.505 187.14 233.15L245.208 132.573Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M176.93 96.6719C174.331 101.175 172.686 106.255 171.993 111.91L113.925 212.487C114.618 206.831 116.263 201.752 118.862 197.249L176.93 96.6719Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M317.266 188.413C314.853 192.589 311.757 196.64 307.978 200.566L249.91 301.143C253.689 297.216 256.785 293.166 259.198 288.99L317.266 188.413Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M464.198 304.708L435.375 254.789L377.307 355.366L406.13 405.285L464.198 304.708Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M353.209 254.787C366.68 242.548 376.618 232.22 383.023 223.805L324.955 324.382C318.55 332.797 308.612 343.124 295.141 355.364L353.209 254.787Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M435.37 254.787L353.212 254.784L295.144 355.361L377.302 355.364L435.37 254.787Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M183.921 154.947L248.521 154.95L190.453 255.527L125.853 255.524L183.921 154.947Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M171.992 111.914C170.668 124.537 174.643 138.881 183.92 154.947L125.852 255.524C116.575 239.458 112.599 225.114 113.924 212.491L171.992 111.914Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M307.987 200.562C301.251 207.256 291.203 216.244 277.842 227.528L219.774 328.105C233.135 316.821 243.183 307.832 249.919 301.139L307.987 200.562Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M15.5469 75.1797L44.5359 125.386L-13.5321 225.963L-42.5212 175.756L15.5469 75.1797Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M277.836 227.536C264.033 238.82 253.708 247.904 246.862 254.789L188.794 355.366C195.64 348.481 205.965 339.397 219.768 328.113L277.836 227.536Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M275.358 304.706L464.189 304.713L406.12 405.29L217.29 405.283L275.358 304.706Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M44.5279 125.39L67.3864 125.39L9.31834 225.967L-13.5401 225.966L44.5279 125.39Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M101.341 75.1911L233.863 304.705L175.795 405.282L43.2733 175.768L101.341 75.1911ZM15.5431 75.19L-42.525 175.767L43.277 175.77L101.345 75.1932L15.5431 75.19Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M246.866 254.784L246.534 254.784L188.466 355.361L188.798 355.361L246.866 254.784Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M246.539 254.781L275.362 304.701L217.294 405.277L188.471 355.358L246.539 254.781Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M67.3906 125.391L170.923 304.698L112.855 405.275L9.32257 225.967L67.3906 125.391Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                            <path d="M170.921 304.699L233.865 304.701L175.797 405.278L112.853 405.276L170.921 304.699Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="bevel" />
                        </g>
                        <g style="mix-blend-mode: hard-light" class="transition-all delay-300 translate-y-0 opacity-100 duration-750 starting:opacity-0 starting:translate-y-4">
                            <path d="M246.544 254.79L246.875 254.79C253.722 247.905 264.046 238.82 277.849 227.537C291.21 216.253 301.259 207.264 307.995 200.57C314.62 193.685 319.147 186.418 321.577 178.768C324.006 171.117 322.846 163.18 318.097 154.956C312.796 145.775 305.342 138.412 295.735 132.865C286.238 127.127 276.189 124.258 265.588 124.257C255.208 124.257 248.416 127.03 245.214 132.576C241.902 137.931 243.006 145.39 248.528 154.953L183.928 154.951C174.652 138.885 170.676 124.541 172 111.918C173.546 99.2946 179.84 89.5408 190.882 82.6559C202.035 75.5798 216.887 72.0421 235.439 72.0428C254.874 72.0435 274.144 75.5825 293.248 82.6598C312.242 89.5457 329.579 99.3005 345.261 111.924C360.942 124.548 373.421 138.892 382.697 154.958C391.311 169.877 395.121 182.978 394.128 194.262C393.355 205.546 389.656 215.396 383.031 223.811C376.627 232.226 366.688 242.554 353.217 254.794L435.375 254.797L464.198 304.716L275.367 304.709L246.544 254.79Z" fill="#F0ACB8" />
                            <path d="M246.544 254.79L246.875 254.79C253.722 247.905 264.046 238.82 277.849 227.537C291.21 216.253 301.259 207.264 307.995 200.57C314.62 193.685 319.147 186.418 321.577 178.768C324.006 171.117 322.846 163.18 318.097 154.956C312.796 145.775 305.342 138.412 295.735 132.865C286.238 127.127 276.189 124.258 265.588 124.257C255.208 124.257 248.416 127.03 245.214 132.576C241.902 137.931 243.006 145.39 248.528 154.953L183.928 154.951C174.652 138.885 170.676 124.541 172 111.918C173.546 99.2946 179.84 89.5408 190.882 82.6559C202.035 75.5798 216.887 72.0421 235.439 72.0428C254.874 72.0435 274.144 75.5825 293.248 82.6598C312.242 89.5457 329.579 99.3005 345.261 111.924C360.942 124.548 373.421 138.892 382.697 154.958C391.311 169.877 395.121 182.978 394.128 194.262C393.355 205.546 389.656 215.396 383.031 223.811C376.627 232.226 366.688 242.554 353.217 254.794L435.375 254.797L464.198 304.716L275.367 304.709L246.544 254.79Z" stroke="#1B1B18" stroke-width="1" stroke-linejoin="round" />
                        </g>
                        <g style="mix-blend-mode: hard-light" class="transition-all delay-300 translate-y-0 opacity-100 duration-750 starting:opacity-0 starting:translate-y-4">
                            <path d="M67.41 125.402L44.5515 125.401L15.5625 75.1953L101.364 75.1985L233.886 304.712L170.942 304.71L67.41 125.402Z" fill="#F0ACB8" />
                            <path d="M67.41 125.402L44.5515 125.401L15.5625 75.1953L101.364 75.1985L233.886 304.712L170.942 304.71L67.41 125.402Z" stroke="#1B1B18" stroke-width="1" />
                        </g>
                    </svg>

                    {{-- Dark Mode 12 SVG --}}
                    <svg class="w-[448px] max-w-none relative -mt-[4.9rem] -ml-8 lg:ml-0 lg:-mt-[6.6rem] hidden dark:block" viewBox="0 0 440 376" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g class="transition-all delay-300 translate-y-0 opacity-100 duration-750 starting:opacity-0 starting:translate-y-4">
                            <path d="M188.263 355.73L188.595 355.73C195.441 348.845 205.766 339.761 219.569 328.477C232.93 317.193 242.978 308.205 249.714 301.511C256.34 294.626 260.867 287.358 263.296 279.708C265.725 272.058 264.565 264.121 259.816 255.896C254.516 246.716 247.062 239.352 237.454 233.805C227.957 228.067 217.908 225.198 207.307 225.198C196.927 225.197 190.136 227.97 186.934 233.516C183.621 238.872 184.726 246.331 190.247 255.894L125.647 255.891C116.371 239.825 112.395 225.481 113.72 212.858C115.265 200.235 121.559 190.481 132.602 183.596C143.754 176.52 158.607 172.982 177.159 172.983C196.594 172.984 215.863 176.523 234.968 183.6C253.961 190.486 271.299 200.241 286.98 212.864C302.661 225.488 315.14 239.833 324.416 255.899C333.03 270.817 336.841 283.918 335.847 295.203C335.075 306.487 331.376 316.336 324.75 324.751C318.346 333.167 308.408 343.494 294.936 355.734L377.094 355.737L405.917 405.656L217.087 405.649L188.263 355.73Z" fill="black"/>
                            <path d="M9.11884 226.339L-13.7396 226.338L-42.7286 176.132L43.0733 176.135L175.595 405.649L112.651 405.647L9.11884 226.339Z" fill="black"/>
                            <path d="M188.263 355.73L188.595 355.73C195.441 348.845 205.766 339.761 219.569 328.477C232.93 317.193 242.978 308.205 249.714 301.511C256.34 294.626 260.867 287.358 263.296 279.708C265.725 272.058 264.565 264.121 259.816 255.896C254.516 246.716 247.062 239.352 237.454 233.805C227.957 228.067 217.908 225.198 207.307 225.198C196.927 225.197 190.136 227.97 186.934 233.516C183.621 238.872 184.726 246.331 190.247 255.894L125.647 255.891C116.371 239.825 112.395 225.481 113.72 212.858C115.265 200.235 121.559 190.481 132.602 183.596C143.754 176.52 158.607 172.982 177.159 172.983C196.594 172.984 215.863 176.523 234.968 183.6C253.961 190.486 271.299 200.241 286.98 212.864C302.661 225.488 315.14 239.833 324.416 255.899C333.03 270.817 336.841 283.918 335.847 295.203C335.075 306.487 331.376 316.336 324.75 324.751C318.346 333.167 308.408 343.494 294.936 355.734L377.094 355.737L405.917 405.656L217.087 405.649L188.263 355.73Z" stroke="#FF750F" stroke-width="1"/>
                            <path d="M9.11884 226.339L-13.7396 226.338L-42.7286 176.132L43.0733 176.135L175.595 405.649L112.651 405.647L9.11884 226.339Z" stroke="#FF750F" stroke-width="1"/>
                            <path d="M204.592 327.449L204.923 327.449C211.769 320.564 222.094 311.479 235.897 300.196C249.258 288.912 259.306 279.923 266.042 273.23C272.668 266.345 277.195 259.077 279.624 251.427C282.053 243.777 280.893 235.839 276.145 227.615C270.844 218.435 263.39 211.071 253.782 205.524C244.285 199.786 234.236 196.917 223.635 196.916C213.255 196.916 206.464 199.689 203.262 205.235C199.949 210.59 201.054 218.049 206.575 227.612L141.975 227.61C132.699 211.544 128.723 197.2 130.048 184.577C131.593 171.954 137.887 162.2 148.93 155.315C160.083 148.239 174.935 144.701 193.487 144.702C212.922 144.703 232.192 148.242 251.296 155.319C270.289 162.205 287.627 171.96 303.308 184.583C318.989 197.207 331.468 211.552 340.745 227.618C349.358 242.536 353.169 255.637 352.175 266.921C351.403 278.205 347.704 288.055 341.078 296.47C334.674 304.885 324.736 315.213 311.264 327.453L393.422 327.456L422.246 377.375L233.415 377.368L204.592 327.449Z" fill="#391800"/>
                            <path d="M25.447 198.058L2.58852 198.057L-26.4005 147.851L59.4015 147.854L191.923 377.368L128.979 377.365L25.447 198.058Z" fill="#391800"/>
                            <path d="M204.592 327.449L204.923 327.449C211.769 320.564 222.094 311.479 235.897 300.196C249.258 288.912 259.306 279.923 266.042 273.23C272.668 266.345 277.195 259.077 279.624 251.427C282.053 243.777 280.893 235.839 276.145 227.615C270.844 218.435 263.39 211.071 253.782 205.524C244.285 199.786 234.236 196.917 223.635 196.916C213.255 196.916 206.464 199.689 203.262 205.235C199.949 210.59 201.054 218.049 206.575 227.612L141.975 227.61C132.699 211.544 128.723 197.2 130.048 184.577C131.593 171.954 137.887 162.2 148.93 155.315C160.083 148.239 174.935 144.701 193.487 144.702C212.922 144.703 232.192 148.242 251.296 155.319C270.289 162.205 287.627 171.96 303.308 184.583C318.989 197.207 331.468 211.552 340.745 227.618C349.358 242.536 353.169 255.637 352.175 266.921C351.403 278.205 347.704 288.055 341.078 296.47C334.674 304.885 324.736 315.213 311.264 327.453L393.422 327.456L422.246 377.375L233.415 377.368L204.592 327.449Z" stroke="#FF750F" stroke-width="1"/>
                            <path d="M25.447 198.058L2.58852 198.057L-26.4005 147.851L59.4015 147.854L191.923 377.368L128.979 377.365L25.447 198.058Z" stroke="#FF750F" stroke-width="1"/>
                        </g>
                        <g class="transition-all delay-300 translate-y-0 opacity-100 duration-750 starting:opacity-0 starting:translate-y-4" style="mix-blend-mode:hard-light">
                            <path d="M217.342 305.363L217.673 305.363C224.519 298.478 234.844 289.393 248.647 278.11C262.008 266.826 272.056 257.837 278.792 251.144C285.418 244.259 289.945 236.991 292.374 229.341C294.803 221.691 293.643 213.753 288.895 205.529C283.594 196.349 276.14 188.985 266.532 183.438C257.035 177.7 246.986 174.831 236.385 174.83C226.005 174.83 219.214 177.603 216.012 183.149C212.699 188.504 213.804 195.963 219.325 205.527L154.725 205.524C145.449 189.458 141.473 175.114 142.798 162.491C144.343 149.868 150.637 140.114 161.68 133.229C172.833 126.153 187.685 122.615 206.237 122.616C225.672 122.617 244.942 126.156 264.046 133.233C283.039 140.119 300.377 149.874 316.058 162.497C331.739 175.121 344.218 189.466 353.495 205.532C362.108 220.45 365.919 233.551 364.925 244.835C364.153 256.12 360.454 265.969 353.828 274.384C347.424 282.799 337.486 293.127 324.014 305.367L406.172 305.37L434.996 355.289L246.165 355.282L217.342 305.363Z" fill="#733000"/>
                            <path d="M38.197 175.972L15.3385 175.971L-13.6505 125.765L72.1515 125.768L204.673 355.282L141.729 355.279L38.197 175.972Z" fill="#733000"/>
                            <path d="M217.342 305.363L217.673 305.363C224.519 298.478 234.844 289.393 248.647 278.11C262.008 266.826 272.056 257.837 278.792 251.144C285.418 244.259 289.945 236.991 292.374 229.341C294.803 221.691 293.643 213.753 288.895 205.529C283.594 196.349 276.14 188.985 266.532 183.438C257.035 177.7 246.986 174.831 236.385 174.83C226.005 174.83 219.214 177.603 216.012 183.149C212.699 188.504 213.804 195.963 219.325 205.527L154.725 205.524C145.449 189.458 141.473 175.114 142.798 162.491C144.343 149.868 150.637 140.114 161.68 133.229C172.833 126.153 187.685 122.615 206.237 122.616C225.672 122.617 244.942 126.156 264.046 133.233C283.039 140.119 300.377 149.874 316.058 162.497C331.739 175.121 344.218 189.466 353.495 205.532C362.108 220.45 365.919 233.551 364.925 244.835C364.153 256.12 360.454 265.969 353.828 274.384C347.424 282.799 337.486 293.127 324.014 305.367L406.172 305.37L434.996 355.289L246.165 355.282L217.342 305.363Z" stroke="#FF750F" stroke-width="1"/>
                            <path d="M38.197 175.972L15.3385 175.971L-13.6505 125.765L72.1515 125.768L204.673 355.282L141.729 355.279L38.197 175.972Z" stroke="#FF750F" stroke-width="1"/>
                        </g>
                        <g class="transition-all delay-300 translate-y-0 opacity-100 duration-750 starting:opacity-0 starting:translate-y-4">
                            <path d="M217.342 305.363L217.673 305.363C224.519 298.478 234.844 289.393 248.647 278.11C262.008 266.826 272.056 257.837 278.792 251.144C285.418 244.259 289.945 236.991 292.374 229.341C294.803 221.691 293.643 213.753 288.895 205.529C283.594 196.349 276.14 188.985 266.532 183.438C257.035 177.7 246.986 174.831 236.385 174.83C226.005 174.83 219.214 177.603 216.012 183.149C212.699 188.504 213.804 195.963 219.325 205.527L154.726 205.524C145.449 189.458 141.473 175.114 142.798 162.491C144.343 149.868 150.637 140.114 161.68 133.229C172.833 126.153 187.685 122.615 206.237 122.616C225.672 122.617 244.942 126.156 264.046 133.233C283.039 140.119 300.377 149.874 316.058 162.497C331.739 175.121 344.218 189.466 353.495 205.532C362.108 220.45 365.919 233.551 364.925 244.835C364.153 256.12 360.454 265.969 353.828 274.384C347.424 282.799 337.486 293.127 324.014 305.367L406.172 305.37L434.996 355.289L246.165 355.282L217.342 305.363Z" stroke="#FF750F" stroke-width="1"/>
                            <path d="M38.197 175.972L15.3385 175.971L-13.6505 125.765L72.1515 125.768L204.673 355.282L141.729 355.279L38.197 175.972Z" stroke="#FF750F" stroke-width="1"/>
                        </g>
                        <g class="transition-all delay-300 translate-y-0 opacity-100 duration-750 starting:opacity-0 starting:translate-y-4">
                            <path d="M188.467 355.363L188.798 355.363C195.644 348.478 205.969 339.393 219.772 328.11C233.133 316.826 243.181 307.837 249.917 301.144C253.696 297.217 256.792 293.166 259.205 288.991C261.024 285.845 262.455 282.628 263.499 279.341C265.928 271.691 264.768 263.753 260.02 255.529C254.719 246.349 247.265 238.985 237.657 233.438C228.16 227.7 218.111 224.831 207.51 224.83C197.13 224.83 190.339 227.603 187.137 233.149C183.824 238.504 184.929 245.963 190.45 255.527L125.851 255.524C116.574 239.458 112.598 225.114 113.923 212.491C114.615 206.836 116.261 201.756 118.859 197.253C122.061 191.704 126.709 187.03 132.805 183.229C143.958 176.153 158.81 172.615 177.362 172.616C196.797 172.617 216.067 176.156 235.171 183.233C254.164 190.119 271.502 199.874 287.183 212.497C302.864 225.121 315.343 239.466 324.62 255.532C333.233 270.45 337.044 283.551 336.05 294.835C335.46 303.459 333.16 311.245 329.151 318.194C327.915 320.337 326.515 322.4 324.953 324.384C318.549 332.799 308.611 343.127 295.139 355.367L377.297 355.37L406.121 405.289L217.29 405.282L188.467 355.363Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M9.32197 225.972L-13.5365 225.971L-42.5255 175.765L43.2765 175.768L175.798 405.282L112.854 405.279L9.32197 225.972Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M345.247 111.915C329.566 99.2919 312.229 89.5371 293.235 82.6512L235.167 183.228C254.161 190.114 271.498 199.869 287.179 212.492L345.247 111.915Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M382.686 154.964C373.41 138.898 360.931 124.553 345.25 111.93L287.182 212.506C302.863 225.13 315.342 239.475 324.618 255.541L382.686 154.964Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M293.243 82.6472C274.139 75.57 254.869 72.031 235.434 72.0303L177.366 172.607C196.801 172.608 216.071 176.147 235.175 183.224L293.243 82.6472Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M394.118 194.257C395.112 182.973 391.301 169.872 382.688 154.953L324.619 255.53C333.233 270.448 337.044 283.55 336.05 294.834L394.118 194.257Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M235.432 72.0311C216.88 72.0304 202.027 75.5681 190.875 82.6442L132.806 183.221C143.959 176.145 158.812 172.607 177.363 172.608L235.432 72.0311Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M265.59 124.25C276.191 124.251 286.24 127.12 295.737 132.858L237.669 233.435C228.172 227.697 218.123 224.828 207.522 224.827L265.59 124.25Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M295.719 132.859C305.326 138.406 312.78 145.77 318.081 154.95L260.013 255.527C254.712 246.347 247.258 238.983 237.651 233.436L295.719 132.859Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M387.218 217.608C391.227 210.66 393.527 202.874 394.117 194.25L336.049 294.827C335.459 303.451 333.159 311.237 329.15 318.185L387.218 217.608Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M245.211 132.577C248.413 127.03 255.204 124.257 265.584 124.258L207.516 224.835C197.136 224.834 190.345 227.607 187.143 233.154L245.211 132.577Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M318.094 154.945C322.842 163.17 324.002 171.107 321.573 178.757L263.505 279.334C265.934 271.684 264.774 263.746 260.026 255.522L318.094 154.945Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M176.925 96.6737C180.127 91.1249 184.776 86.4503 190.871 82.6499L132.803 183.227C126.708 187.027 122.059 191.702 118.857 197.25L176.925 96.6737Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M387.226 217.606C385.989 219.749 384.59 221.813 383.028 223.797L324.96 324.373C326.522 322.39 327.921 320.326 329.157 318.183L387.226 217.606Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M317.269 188.408C319.087 185.262 320.519 182.045 321.562 178.758L263.494 279.335C262.451 282.622 261.019 285.839 259.201 288.985L317.269 188.408Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M245.208 132.573C241.895 137.928 243 145.387 248.522 154.95L190.454 255.527C184.932 245.964 183.827 238.505 187.14 233.15L245.208 132.573Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M176.93 96.6719C174.331 101.175 172.686 106.255 171.993 111.91L113.925 212.487C114.618 206.831 116.263 201.752 118.862 197.249L176.93 96.6719Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M317.266 188.413C314.853 192.589 311.757 196.64 307.978 200.566L249.91 301.143C253.689 297.216 256.785 293.166 259.198 288.99L317.266 188.413Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M464.198 304.708L435.375 254.789L377.307 355.366L406.13 405.285L464.198 304.708Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M353.209 254.787C366.68 242.548 376.618 232.22 383.023 223.805L324.955 324.382C318.55 332.797 308.612 343.124 295.141 355.364L353.209 254.787Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M435.37 254.787L353.212 254.784L295.144 355.361L377.302 355.364L435.37 254.787Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M183.921 154.947L248.521 154.95L190.453 255.527L125.853 255.524L183.921 154.947Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M171.992 111.914C170.668 124.537 174.643 138.881 183.92 154.947L125.852 255.524C116.575 239.458 112.599 225.114 113.924 212.491L171.992 111.914Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M307.987 200.562C301.251 207.256 291.203 216.244 277.842 227.528L219.774 328.105C233.135 316.821 243.183 307.832 249.919 301.139L307.987 200.562Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M15.5469 75.1797L44.5359 125.386L-13.5321 225.963L-42.5212 175.756L15.5469 75.1797Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M277.836 227.536C264.033 238.82 253.708 247.904 246.862 254.789L188.794 355.366C195.64 348.481 205.965 339.397 219.768 328.113L277.836 227.536Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M275.358 304.706L464.189 304.713L406.12 405.29L217.29 405.283L275.358 304.706Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M44.5279 125.39L67.3864 125.39L9.31834 225.967L-13.5401 225.966L44.5279 125.39Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M101.341 75.1911L233.863 304.705L175.795 405.282L43.2733 175.768L101.341 75.1911ZM15.5431 75.19L-42.525 175.767L43.277 175.77L101.345 75.1932L15.5431 75.19Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M246.866 254.784L246.534 254.784L188.466 355.361L188.798 355.361L246.866 254.784Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M246.539 254.781L275.362 304.701L217.294 405.277L188.471 355.358L246.539 254.781Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M67.3906 125.391L170.923 304.698L112.855 405.275L9.32257 225.967L67.3906 125.391Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                            <path d="M170.921 304.699L233.865 304.701L175.797 405.278L112.853 405.276L170.921 304.699Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="bevel"/>
                        </g>
                        <g class="transition-all delay-300 translate-y-0 opacity-100 duration-750 starting:opacity-0 starting:translate-y-4" style="mix-blend-mode:hard-light">
                            <path d="M246.544 254.79L246.875 254.79C253.722 247.905 264.046 238.82 277.849 227.537C291.21 216.253 301.259 207.264 307.995 200.57C314.62 193.685 319.147 186.418 321.577 178.768C324.006 171.117 322.846 163.18 318.097 154.956C312.796 145.775 305.342 138.412 295.735 132.865C286.238 127.127 276.189 124.258 265.588 124.257C255.208 124.257 248.416 127.03 245.214 132.576C241.902 137.931 243.006 145.39 248.528 154.953L183.928 154.951C174.652 138.885 170.676 124.541 172 111.918C173.546 99.2946 179.84 89.5408 190.882 82.6559C202.035 75.5798 216.887 72.0421 235.439 72.0428C254.874 72.0435 274.144 75.5825 293.248 82.6598C312.242 89.5457 329.579 99.3005 345.261 111.924C360.942 124.548 373.421 138.892 382.697 154.958C391.311 169.877 395.121 182.978 394.128 194.262C393.355 205.546 389.656 215.396 383.031 223.811C376.627 232.226 366.688 242.554 353.217 254.794L435.375 254.797L464.198 304.716L275.367 304.709L246.544 254.79Z" fill="#4B0600"/>
                            <path d="M246.544 254.79L246.875 254.79C253.722 247.905 264.046 238.82 277.849 227.537C291.21 216.253 301.259 207.264 307.995 200.57C314.62 193.685 319.147 186.418 321.577 178.768C324.006 171.117 322.846 163.18 318.097 154.956C312.796 145.775 305.342 138.412 295.735 132.865C286.238 127.127 276.189 124.258 265.588 124.257C255.208 124.257 248.416 127.03 245.214 132.576C241.902 137.931 243.006 145.39 248.528 154.953L183.928 154.951C174.652 138.885 170.676 124.541 172 111.918C173.546 99.2946 179.84 89.5408 190.882 82.6559C202.035 75.5798 216.887 72.0421 235.439 72.0428C254.874 72.0435 274.144 75.5825 293.248 82.6598C312.242 89.5457 329.579 99.3005 345.261 111.924C360.942 124.548 373.421 138.892 382.697 154.958C391.311 169.877 395.121 182.978 394.128 194.262C393.355 205.546 389.656 215.396 383.031 223.811C376.627 232.226 366.688 242.554 353.217 254.794L435.375 254.797L464.198 304.716L275.367 304.709L246.544 254.79Z" stroke="#FF750F" stroke-width="1" stroke-linejoin="round"/>
                        </g>
                        <g class="transition-all delay-300 translate-y-0 opacity-100 duration-750 starting:opacity-0 starting:translate-y-4" style="mix-blend-mode:hard-light">
                            <path d="M67.41 125.402L44.5515 125.401L15.5625 75.1953L101.364 75.1985L233.886 304.712L170.942 304.71L67.41 125.402Z" fill="#4B0600"/>
                            <path d="M67.41 125.402L44.5515 125.401L15.5625 75.1953L101.364 75.1985L233.886 304.712L170.942 304.71L67.41 125.402Z" stroke="#FF750F" stroke-width="1"/>
                        </g>
                    </svg>
                    <div class="absolute inset-0 rounded-t-lg lg:rounded-t-none lg:rounded-r-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]"></div>
                </div>
            </main>
        </div>

        @if (Route::has('login'))
            <div class="h-14.5 hidden lg:block"></div>
        @endif
    </body>
</html>
```

---

## routes\channels.php

```php
<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
```

---

## routes\console.php

```php
<?php

use App\Models\Order;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('rmkembar:expire-pending', function () {
    $expiredReservations = 0;
    $expiredOrders = 0;

    Reservation::query()
        ->whereIn('status', ['pending', 'confirmed'])
        ->whereNotNull('auto_cancel_at')
        ->where('auto_cancel_at', '<=', now())
        ->chunkById(100, function ($reservations) use (&$expiredReservations) {
            foreach ($reservations as $reservation) {
                $reservation->update([
                    'status' => 'auto_cancelled',
                    'cancelled_at' => now(),
                    'cancellation_reason' => 'Otomatis batal karena melewati batas waktu kedatangan.',
                ]);

                $expiredReservations++;
            }
        });

    Payment::query()
        ->with('payable')
        ->where('status', 'pending')
        ->whereNotNull('expired_at')
        ->where('expired_at', '<=', now())
        ->chunkById(100, function ($payments) use (&$expiredOrders) {
            foreach ($payments as $payment) {
                DB::transaction(function () use ($payment, &$expiredOrders) {
                    $payment->update(['status' => 'expired']);

                    $order = $payment->payable;
                    if (! $order instanceof Order || ! in_array($order->status, ['pending', 'paid_waiting'], true)) {
                        return;
                    }

                    if ($order->payment_status === 'paid') {
                        return;
                    }

                    $order->update([
                        'status' => 'cancelled',
                        'cancelled_at' => now(),
                        'cancellation_reason' => 'Otomatis batal karena pembayaran kedaluwarsa.',
                    ]);

                    $order->table?->update([
                        'status' => 'kosong',
                        'locked_at' => null,
                        'locked_by_order_id' => null,
                    ]);

                    $expiredOrders++;
                });
            }
        });

    $this->info("Expired {$expiredReservations} reservations and {$expiredOrders} orders.");
})->purpose('Expire stale reservations and unpaid orders');

Schedule::command('rmkembar:expire-pending')->everyMinute()->withoutOverlapping();
```

---

## routes\web.php

```php
<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MenuController as AdminMenuController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TableController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Customer\AccountController;
use App\Http\Controllers\Customer\CheckoutController;
use App\Http\Controllers\Customer\HomeController;
use App\Http\Controllers\Customer\MenuController;
use App\Http\Controllers\Customer\OrderConfirmationController;
use App\Http\Controllers\Customer\ReservationController;
use App\Http\Controllers\KitchenController;
use App\Http\Controllers\Customer\CateringController;
use App\Http\Controllers\PaymentCallbackController;
use App\Http\Controllers\Info\AboutController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::get('/debug', [\App\Http\Controllers\DebugController::class, 'index'])->name('debug.index');
Route::post('/debug/wa', [\App\Http\Controllers\DebugController::class, 'testWhatsApp'])->name('debug.wa');
Route::post('/debug/reservation', [\App\Http\Controllers\DebugController::class, 'seedReservation'])->name('debug.reservation');
Route::post('/debug/order', [\App\Http\Controllers\DebugController::class, 'seedOrder'])->name('debug.order');
Route::post('/debug/simulate-payment/{order:unique_code}', [\App\Http\Controllers\DebugController::class, 'simulatePayment'])->name('debug.simulate_payment');

Route::get('/menu', [MenuController::class, 'index'])->name('menu.index');
Route::post('/cart/items', [MenuController::class, 'addToCart'])->name('cart.add');
Route::delete('/cart/items/{menu}', [MenuController::class, 'removeFromCart'])->name('cart.remove');

Route::get('/checkout', [CheckoutController::class, 'show'])->name('checkout.show');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/order/confirm/{code}', OrderConfirmationController::class)->name('orders.confirm');

Route::get('/reservasi', [ReservationController::class, 'create'])->name('reservations.create');
Route::post('/reservasi', [ReservationController::class, 'store'])->name('reservations.store');

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.store');
    Route::get('/register', [RegisterController::class, 'create'])->name('register');
    Route::post('/register', [RegisterController::class, 'store'])->name('register.store');
});

Route::post('/logout', [LoginController::class, 'destroy'])->middleware('auth')->name('logout');

Route::middleware(['auth'])->group(function () {
    Route::get('/akun/riwayat', [AccountController::class, 'history'])->name('account.history');
    Route::post('/akun/pesanan/{order}/cancel', [AccountController::class, 'cancelOrder'])->name('account.orders.cancel');
    Route::post('/akun/pesanan/{order}/rating', [\App\Http\Controllers\Customer\RatingController::class, 'store'])->name('account.orders.rating');
});

Route::middleware(['auth', 'role:admin,owner'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::get('/pesanan', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::post('/pesanan/{order}/{action}', [AdminOrderController::class, 'transition'])->name('orders.transition');
    Route::get('/kategori', [\App\Http\Controllers\Admin\CategoryController::class, 'index'])->name('categories.index');
    Route::post('/kategori', [\App\Http\Controllers\Admin\CategoryController::class, 'store'])->name('categories.store');
    Route::put('/kategori/{category}', [\App\Http\Controllers\Admin\CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/kategori/{category}', [\App\Http\Controllers\Admin\CategoryController::class, 'destroy'])->name('categories.destroy');
    Route::get('/reservasi', [\App\Http\Controllers\Admin\ReservationController::class, 'index'])->name('reservations.index');
    Route::put('/reservasi/{reservation}', [\App\Http\Controllers\Admin\ReservationController::class, 'update'])->name('reservations.update');
    Route::get('/menu', [AdminMenuController::class, 'index'])->name('menu.index');
    Route::post('/menu', [AdminMenuController::class, 'store'])->name('menu.store');
    Route::put('/menu/{menu}', [AdminMenuController::class, 'update'])->name('menu.update');
    Route::delete('/menu/{menu}', [AdminMenuController::class, 'destroy'])->name('menu.destroy');
    Route::get('/stok-meja', [TableController::class, 'index'])->name('tables.index');
    Route::post('/stok-meja', [TableController::class, 'store'])->name('tables.store');
    Route::put('/stok-meja/{table}', [TableController::class, 'update'])->name('tables.update');
    Route::get('/pengguna', [UserController::class, 'index'])->name('users.index');
    Route::post('/pengguna', [UserController::class, 'store'])->name('users.store');
    Route::put('/pengguna/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/pengguna/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::get('/pengaturan', [SettingController::class, 'index'])->name('settings.index');
    Route::put('/pengaturan', [SettingController::class, 'update'])->name('settings.update');
    Route::get('/laporan', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/laporan/export', [ReportController::class, 'export'])->name('reports.export');
});

Route::get('/kitchen', KitchenController::class)->middleware(['auth', 'role:kitchen,admin,owner'])->name('kitchen.index');
Route::get('/about', [AboutController::class, 'index'])->name('about');

Route::get('/catering', [CateringController::class, 'index'])->name('catering');
Route::post('/catering', [CateringController::class, 'store'])->name('catering.store');

Route::post('/payment/midtrans-callback', [PaymentCallbackController::class, 'handleMidtrans']);
```

---

## tests\Feature\AccessControlTest.php

```php
<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AccessControlTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    public function test_guest_is_redirected_from_authenticated_pages(): void
    {
        $this->get(route('account.history'))->assertRedirect(route('login'));
        $this->get(route('admin.dashboard'))->assertRedirect(route('login'));
        $this->get(route('kitchen.index'))->assertRedirect(route('login'));
    }

    public function test_customer_cannot_access_staff_pages(): void
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628177700001']);

        $this->actingAs($customer)->get(route('admin.dashboard'))->assertForbidden();
        $this->actingAs($customer)->get(route('kitchen.index'))->assertForbidden();
    }

    public function test_kitchen_can_access_kitchen_but_not_admin_dashboard(): void
    {
        $kitchen = User::query()->where('email', 'kitchen@rmkembar.test')->firstOrFail();

        $this->actingAs($kitchen)->get(route('kitchen.index'))->assertOk();
        $this->actingAs($kitchen)->get(route('admin.dashboard'))->assertForbidden();
    }

    public function test_owner_can_access_admin_pages(): void
    {
        $owner = User::query()->where('email', 'owner@rmkembar.test')->firstOrFail();

        $this->actingAs($owner)->get(route('admin.dashboard'))->assertOk();
        $this->actingAs($owner)->get(route('admin.menu.index'))->assertOk();
        $this->actingAs($owner)->get(route('admin.tables.index'))->assertOk();
    }

    public function test_inactive_user_cannot_login(): void
    {
        User::factory()->create([
            'name' => 'Inactive Staff',
            'email' => 'inactive@example.test',
            'phone' => '628177700002',
            'role' => 'admin',
            'password' => 'password',
            'is_active' => false,
        ]);

        $this->post(route('login.store'), [
            'email' => 'inactive@example.test',
            'password' => 'password',
        ])->assertSessionHasErrors('email');

        $this->assertGuest();
    }

    public function test_login_rejects_wrong_password(): void
    {
        $this->from(route('login'))->post(route('login.store'), [
            'email' => 'admin@rmkembar.test',
            'password' => 'salah123',
        ])
            ->assertRedirect(route('login'))
            ->assertSessionHasErrors('email');

        $this->assertGuest();
    }

    public function test_login_redirects_staff_to_their_dashboard(): void
    {
        $this->post(route('login.store'), [
            'email' => 'admin@rmkembar.test',
            'password' => 'password',
        ])->assertRedirect(route('admin.dashboard'));

        auth()->logout();

        $this->post(route('login.store'), [
            'email' => 'kitchen@rmkembar.test',
            'password' => 'password',
        ])->assertRedirect(route('kitchen.index'));
    }

    public function test_authenticated_user_can_logout(): void
    {
        $admin = User::query()->where('email', 'admin@rmkembar.test')->firstOrFail();

        $this->actingAs($admin)
            ->post(route('logout'))
            ->assertRedirect(route('home'));

        $this->assertGuest();
    }

    public function test_guest_cannot_logout_as_active_user(): void
    {
        $this->post(route('logout'))->assertRedirect(route('login'));
    }
}
```

---

## tests\Feature\AdminMvpTest.php

```php
<?php

namespace Tests\Feature;

use App\Models\DineInTable;
use App\Models\Menu;
use App\Models\MenuCategory;
use App\Models\Order;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminMvpTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::query()->where('email', 'admin@rmkembar.test')->firstOrFail();
    }

    public function test_admin_dashboard_and_order_search_are_available(): void
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628166600001']);
        $order = Order::create([
            'unique_code' => 'RMK-TEST-CARI',
            'user_id' => $customer->id,
            'order_type' => 'dine_in',
            'subtotal' => 10000,
            'tax_rate' => 0.11,
            'tax_amount' => 1100,
            'total_price' => 11100,
            'payment_status' => 'unpaid',
            'status' => 'pending',
        ]);

        $this->actingAs($this->admin)->get(route('admin.dashboard'))->assertOk();
        $this->actingAs($this->admin)->get(route('admin.orders.index', ['q' => $order->unique_code]))->assertOk();
    }

    public function test_admin_order_search_with_unknown_keyword_has_no_results(): void
    {
        $this->actingAs($this->admin)
            ->get(route('admin.orders.index', ['q' => 'ORDER-TIDAK-ADA']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Orders')
                ->has('orders.data', 0)
            );
    }

    public function test_admin_can_manage_menu_and_stock_logs(): void
    {
        $category = MenuCategory::query()->firstOrFail();

        $this->actingAs($this->admin)->post(route('admin.menu.store'), [
            'category_id' => $category->id,
            'name' => 'Tahu Isi',
            'description' => 'Tahu isi sayur',
            'price' => 8000,
            'stock' => 10,
            'low_stock_threshold' => 3,
            'sort_order' => 20,
            'is_available' => true,
            'is_for_dine_in' => true,
            'is_for_catering' => false,
        ])->assertRedirect();

        $menu = Menu::query()->where('slug', 'tahu-isi')->firstOrFail();

        $this->actingAs($this->admin)->put(route('admin.menu.update', $menu), [
            'category_id' => $category->id,
            'name' => 'Tahu Isi Pedas',
            'description' => 'Tahu isi sayur pedas',
            'price' => 9000,
            'stock' => 14,
            'low_stock_threshold' => 3,
            'sort_order' => 20,
            'is_available' => true,
            'is_for_dine_in' => true,
            'is_for_catering' => false,
        ])->assertRedirect();

        $menu->refresh();

        $this->assertSame('tahu-isi-pedas', $menu->slug);
        $this->assertDatabaseHas('stock_logs', [
            'menu_id' => $menu->id,
            'change_type' => 'manual_update',
            'qty_before' => 10,
            'qty_change' => 4,
            'qty_after' => 14,
        ]);

        $this->actingAs($this->admin)->delete(route('admin.menu.destroy', $menu))->assertRedirect();
        $this->assertSoftDeleted('menus', ['id' => $menu->id]);
    }

    public function test_admin_cannot_create_menu_with_empty_required_data(): void
    {
        $this->actingAs($this->admin)
            ->from(route('admin.menu.index'))
            ->post(route('admin.menu.store'), [])
            ->assertRedirect(route('admin.menu.index'))
            ->assertSessionHasErrors(['category_id', 'name', 'price', 'stock']);

        $this->assertDatabaseMissing('menus', ['name' => '']);
    }

    public function test_admin_cannot_update_menu_with_negative_stock(): void
    {
        $category = MenuCategory::query()->firstOrFail();
        $menu = Menu::query()->firstOrFail();
        $oldStock = $menu->stock;

        $this->actingAs($this->admin)
            ->from(route('admin.menu.index'))
            ->put(route('admin.menu.update', $menu), [
                'category_id' => $category->id,
                'name' => $menu->name,
                'description' => $menu->description,
                'price' => $menu->price,
                'stock' => -5,
                'low_stock_threshold' => $menu->low_stock_threshold,
                'sort_order' => $menu->sort_order,
                'is_available' => true,
                'is_for_dine_in' => true,
                'is_for_catering' => true,
            ])
            ->assertRedirect(route('admin.menu.index'))
            ->assertSessionHasErrors('stock');

        $this->assertSame($oldStock, $menu->fresh()->stock);
    }

    public function test_admin_can_manage_tables_and_table_order_url_is_exposed(): void
    {
        $this->actingAs($this->admin)->post(route('admin.tables.store'), [
            'table_number' => 'VIP1',
            'capacity' => 8,
            'location_label' => 'VIP',
            'notes' => 'Dekat kasir',
        ])->assertRedirect();

        $table = DineInTable::query()->where('table_number', 'VIP1')->firstOrFail();

        $this->assertStringContainsString('/menu?table=VIP1', $table->order_url);

        $this->actingAs($this->admin)->put(route('admin.tables.update', $table), [
            'capacity' => 10,
            'status' => 'kosong',
            'location_label' => 'VIP',
            'notes' => 'Sudah dibersihkan',
        ])->assertRedirect();

        $table->refresh();

        $this->assertSame(10, $table->capacity);
        $this->assertSame('kosong', $table->status);
        $this->assertNull($table->locked_at);
        $this->assertNull($table->locked_by_order_id);
    }

    public function test_admin_cannot_update_table_with_invalid_capacity(): void
    {
        $table = DineInTable::query()->firstOrFail();
        $oldCapacity = $table->capacity;

        $this->actingAs($this->admin)
            ->from(route('admin.tables.index'))
            ->put(route('admin.tables.update', $table), [
                'capacity' => 0,
                'status' => 'kosong',
                'location_label' => $table->location_label,
                'notes' => $table->notes,
            ])
            ->assertRedirect(route('admin.tables.index'))
            ->assertSessionHasErrors('capacity');

        $this->assertSame($oldCapacity, $table->fresh()->capacity);
    }

    public function test_admin_order_status_flow_marks_paid_arrived_preparing_and_completed(): void
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628166600002']);
        $menu = Menu::query()->firstOrFail();
        $table = DineInTable::query()->firstOrFail();
        $beforeStock = $menu->stock;

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

        $order->items()->create([
            'menu_id' => $menu->id,
            'menu_name' => $menu->name,
            'qty' => 2,
            'price' => $menu->price,
            'subtotal' => 2 * (float) $menu->price,
        ]);

        $order->payments()->create([
            'transaction_id' => 'FLOW-'.$order->unique_code,
            'payment_method' => 'cash',
            'payment_type' => 'full',
            'amount' => $order->total_price,
            'status' => 'pending',
        ]);

        foreach (['paid', 'arrive', 'prepare', 'complete'] as $action) {
            $this->actingAs($this->admin)
                ->post(route('admin.orders.transition', [$order, $action]))
                ->assertRedirect();
        }

        $order->refresh();

        $this->assertSame('completed', $order->status);
        $this->assertSame('paid', $order->payment_status);
        $this->assertSame(max(0, $beforeStock - 2), $menu->fresh()->stock);
        $this->assertSame('kosong', $table->fresh()->status);
        $this->assertDatabaseHas('stock_logs', [
            'menu_id' => $menu->id,
            'change_type' => 'order_deduct',
            'reference_type' => Order::class,
            'reference_id' => $order->id,
        ]);
    }

    public function test_admin_order_transition_rejects_unknown_action(): void
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628166600009']);
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

        $this->actingAs($this->admin)
            ->post(route('admin.orders.transition', [$order, 'selesai123']))
            ->assertNotFound();

        $this->assertSame('pending', $order->fresh()->status);
    }

    public function test_admin_can_cancel_order_and_release_table(): void
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628166600003']);
        $table = DineInTable::query()->firstOrFail();
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

        $table->update(['status' => 'locked', 'locked_by_order_id' => $order->id]);

        $this->actingAs($this->admin)
            ->post(route('admin.orders.transition', [$order, 'cancel']), ['cancellation_reason' => 'Tidak jadi'])
            ->assertRedirect();

        $this->assertSame('cancelled', $order->fresh()->status);
        $this->assertSame('kosong', $table->fresh()->status);
    }

    public function test_admin_cannot_cancel_completed_order(): void
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628166600010']);
        $order = Order::create([
            'unique_code' => Order::generateCode($customer),
            'user_id' => $customer->id,
            'order_type' => 'dine_in',
            'subtotal' => 10000,
            'tax_rate' => 0.11,
            'tax_amount' => 1100,
            'total_price' => 11100,
            'payment_status' => 'paid',
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        $this->actingAs($this->admin)
            ->from(route('admin.orders.index'))
            ->post(route('admin.orders.transition', [$order, 'cancel']))
            ->assertRedirect(route('admin.orders.index'))
            ->assertSessionHasErrors('order');

        $this->assertSame('completed', $order->fresh()->status);
    }

    public function test_kitchen_display_shows_active_kitchen_orders(): void
    {
        $kitchen = User::query()->where('email', 'kitchen@rmkembar.test')->firstOrFail();
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628166600004']);
        Order::create([
            'unique_code' => Order::generateCode($customer),
            'user_id' => $customer->id,
            'order_type' => 'dine_in',
            'subtotal' => 10000,
            'tax_rate' => 0.11,
            'tax_amount' => 1100,
            'total_price' => 11100,
            'payment_status' => 'paid',
            'status' => 'preparing',
        ]);

        $this->actingAs($kitchen)->get(route('kitchen.index'))->assertOk();
    }

    public function test_admin_can_manage_users_settings_and_reports(): void
    {
        $this->actingAs($this->admin)->post(route('admin.users.store'), [
            'name' => 'Staff Baru',
            'email' => 'staff-baru@example.test',
            'phone' => '628166600005',
            'role' => 'kitchen',
            'address' => 'Dapur',
            'password' => 'password',
            'is_active' => true,
        ])->assertRedirect();

        $staff = User::query()->where('email', 'staff-baru@example.test')->firstOrFail();

        $this->actingAs($this->admin)->put(route('admin.users.update', $staff), [
            'name' => 'Staff Dapur',
            'email' => 'staff-baru@example.test',
            'phone' => '628166600005',
            'role' => 'admin',
            'address' => 'Kasir',
            'password' => '',
            'is_active' => false,
        ])->assertRedirect();

        $this->assertSame('admin', $staff->fresh()->role);
        $this->assertFalse($staff->fresh()->is_active);

        $this->actingAs($this->admin)->put(route('admin.settings.update'), [
            'settings' => [
                'tax_rate' => '0.10',
                'auto_cancel_minutes' => '45',
            ],
        ])->assertRedirect();

        $this->assertSame(0.10, Setting::valueFor('tax_rate'));
        $this->assertSame(45, Setting::valueFor('auto_cancel_minutes'));

        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628166600006']);
        Order::create([
            'unique_code' => Order::generateCode($customer),
            'user_id' => $customer->id,
            'order_type' => 'dine_in',
            'subtotal' => 10000,
            'tax_rate' => 0.10,
            'tax_amount' => 1000,
            'total_price' => 11000,
            'payment_status' => 'paid',
            'status' => 'completed',
        ]);

        $this->actingAs($this->admin)->get(route('admin.reports.index'))->assertOk();
        $this->actingAs($this->admin)->get(route('admin.reports.export'))->assertOk();

        $this->actingAs($this->admin)->delete(route('admin.users.destroy', $staff))->assertRedirect();
        $this->assertSoftDeleted('users', ['id' => $staff->id]);
    }

    public function test_admin_cannot_create_user_with_duplicate_email(): void
    {
        $existing = User::query()->where('email', 'admin@rmkembar.test')->firstOrFail();

        $this->actingAs($this->admin)
            ->from(route('admin.users.index'))
            ->post(route('admin.users.store'), [
                'name' => 'Duplikat Email',
                'email' => $existing->email,
                'phone' => '628166600007',
                'role' => 'customer',
                'address' => 'Jl. Duplikat',
                'password' => 'password',
                'is_active' => true,
            ])
            ->assertRedirect(route('admin.users.index'))
            ->assertSessionHasErrors('email');

        $this->assertDatabaseMissing('users', ['phone' => '628166600007']);
    }

    public function test_admin_settings_reject_negative_numeric_values(): void
    {
        $this->actingAs($this->admin)
            ->from(route('admin.settings.index'))
            ->put(route('admin.settings.update'), [
                'settings' => [
                    'tax_rate' => '-10',
                ],
            ])
            ->assertRedirect(route('admin.settings.index'))
            ->assertSessionHasErrors('settings.tax_rate');

        $this->assertSame(0.11, Setting::valueFor('tax_rate'));
    }

    public function test_admin_report_export_rejects_empty_date_range(): void
    {
        $this->actingAs($this->admin)
            ->from(route('admin.reports.index'))
            ->get(route('admin.reports.export', [
                'from' => now()->addYear()->toDateString(),
                'to' => now()->addYear()->addDay()->toDateString(),
            ]))
            ->assertRedirect(route('admin.reports.index'))
            ->assertSessionHasErrors('report');
    }

    public function test_admin_cannot_delete_their_own_account(): void
    {
        $this->actingAs($this->admin)
            ->delete(route('admin.users.destroy', $this->admin))
            ->assertSessionHasErrors('user');

        $this->assertNotSoftDeleted('users', ['id' => $this->admin->id]);
    }
}
```

---

## tests\Feature\CateringTest.php

```php
<?php

namespace Tests\Feature;

use App\Models\Catering;
use App\Models\Menu;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CateringTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    public function test_customer_can_create_catering_order_with_valid_data(): void
    {
        $menu = Menu::query()->where('is_for_catering', true)->firstOrFail();
        
        // Ensure tax and dp percentage are set
        Setting::updateOrCreate(['key' => 'tax_rate'], ['value' => '0.11']);
        Setting::updateOrCreate(['key' => 'dp_percentage'], ['value' => '0.5']);

        $response = $this->post(route('catering.store'), [
            'eventName' => 'Pernikahan Budi',
            'date' => now()->addDays(7)->toDateString(),
            'time' => '12:00',
            'place' => 'Gedung Serbaguna',
            'contacts' => [
                [
                    'name' => 'Budi',
                    'phone' => '628155500009',
                    'email' => 'budi.catering@example.test',
                ]
            ],
            'menuItems' => [
                [
                    'id' => $menu->id,
                    'quantity' => 100,
                ]
            ],
            'specialRequest' => 'Dekorasi warna biru',
        ]);

        $response->assertRedirect(route('home'));

        $this->assertDatabaseHas('caterings', [
            'event_date' => now()->addDays(7)->startOfDay()->format('Y-m-d H:i:s'),
            'event_time' => '12:00',
            'delivery_address' => 'Gedung Serbaguna',
            'status' => 'pending',
            'notes' => 'Dekorasi warna biru',
        ]);

        $catering = Catering::latest()->first();
        $this->assertEquals($menu->price * 100, $catering->subtotal);
        $this->assertCount(1, $catering->items);
        $this->assertEquals($menu->id, $catering->items->first()->menu_id);
        $this->assertEquals(100, $catering->items->first()->qty);
        
        // Assert user was created
        $this->assertDatabaseHas('users', [
            'phone' => '628155500009',
            'role' => 'customer',
        ]);
        
        $this->assertEquals('Pernikahan Budi', $catering->meta['event_name']);
        $this->assertEquals('Budi', $catering->meta['contacts'][0]['name']);
    }

    public function test_catering_order_requires_valid_data(): void
    {
        $response = $this->post(route('catering.store'), [
            'eventName' => 'A', // Too short
            // Missing date
            'place' => 'Gedung',
            'contacts' => [], // Empty contacts
            'menuItems' => [
                [
                    'id' => 9999, // Invalid menu
                    'quantity' => 0, // Invalid quantity
                ]
            ],
        ]);

        $response->assertSessionHasErrors([
            'eventName', 
            'date', 
            'contacts',
            'menuItems.0.id',
            'menuItems.0.quantity',
        ]);

        $this->assertDatabaseCount('caterings', 0);
    }
}
```

---

## tests\Feature\CustomerMvpTest.php

```php
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
```

---

## tests\Feature\ExampleTest.php

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
```

---

## tests\Feature\MidtransCallbackTest.php

```php
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
```

---

## tests\Feature\MvpOperationsTest.php

```php
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
```

---

## tests\Feature\ReportExportTest.php

```php
<?php

namespace Tests\Feature;

use App\Exports\SalesExport;
use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Maatwebsite\Excel\Facades\Excel;
use Tests\TestCase;

class ReportExportTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    private function getAdmin(): User
    {
        return User::query()->where('email', 'admin@rmkembar.test')->firstOrFail();
    }

    private function createPaidOrder()
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628155500010']);
        return Order::create([
            'unique_code' => Order::generateCode($customer),
            'user_id' => $customer->id,
            'order_type' => 'dine_in',
            'subtotal' => 10000,
            'tax_rate' => 0.11,
            'tax_amount' => 1100,
            'total_price' => 11100,
            'payment_status' => 'paid',
            'status' => 'completed',
        ]);
    }

    public function test_admin_can_export_csv_report(): void
    {
        $this->createPaidOrder();
        
        $admin = $this->getAdmin();

        $response = $this->actingAs($admin)->get(route('admin.reports.export', ['type' => 'csv']));
        
        $response->assertOk();
        $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
        
        $content = $response->streamedContent();
        $this->assertStringContainsString('Kode,Tanggal,Customer,Meja,Status,Pembayaran,Subtotal,PPN,Total', $content);
        $this->assertStringContainsString('11100', $content); // Assert total price is in CSV
    }

    public function test_admin_can_export_excel_report(): void
    {
        $this->createPaidOrder();
        
        Excel::fake();
        
        $admin = $this->getAdmin();

        $from = now()->startOfMonth();
        $to = now()->endOfDay();

        $response = $this->actingAs($admin)->get(route('admin.reports.export', ['type' => 'excel']));
        
        $response->assertOk();
        
        Excel::assertDownloaded("laporan-rm-kembar-{$from->toDateString()}-{$to->toDateString()}.xlsx", function (SalesExport $export) {
            return true;
        });
    }

    public function test_admin_can_export_pdf_report(): void
    {
        $this->createPaidOrder();
        
        $admin = $this->getAdmin();

        $response = $this->actingAs($admin)->get(route('admin.reports.export', ['type' => 'pdf']));
        
        $response->assertOk();
        $response->assertHeader('Content-Type', 'application/pdf');
    }

    public function test_export_redirects_back_with_error_if_no_data(): void
    {
        // No orders created, should fail because orders is empty (for the given date range)
        $admin = $this->getAdmin();

        $response = $this->actingAs($admin)->get(route('admin.reports.export', [
            'from' => now()->addDays(10)->toDateString(),
            'to' => now()->addDays(11)->toDateString(),
        ]));
        
        $response->assertRedirect();
        $response->assertSessionHasErrors(['report' => 'Data tidak tersedia.']);
    }
}
```

---

## tests\Feature\WhatsAppServiceTest.php

```php
<?php

namespace Tests\Feature;

use App\Services\WhatsAppService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class WhatsAppServiceTest extends TestCase
{
    public function test_whatsapp_service_sends_message_successfully(): void
    {
        Http::fake([
            config('services.evolution.url') . '/*' => Http::response(['status' => 'success'], 200),
        ]);

        $result = WhatsAppService::sendMessage('08155500008', 'Hello from test');
        
        $this->assertTrue($result);
        
        Http::assertSent(function ($request) {
            return $request->hasHeader('apikey', config('services.evolution.key')) &&
                   $request['number'] === '628155500008' &&
                   $request['text'] === 'Hello from test';
        });
    }

    public function test_whatsapp_service_handles_api_errors_gracefully(): void
    {
        Http::fake([
            '*' => Http::response(['message' => 'Internal error'], 500),
        ]);

        $result = WhatsAppService::sendMessage('08155500008', 'Hello from test');
        
        $this->assertFalse($result);
    }
    
    public function test_whatsapp_service_cleans_phone_number_formats(): void
    {
        Http::fake([
            config('services.evolution.url') . '/*' => Http::response(['status' => 'success'], 200),
        ]);

        // With +, spaces, dashes, etc
        $result = WhatsAppService::sendMessage('+62 815-5500-008', 'Hello from test');
        
        $this->assertTrue($result);
        
        Http::assertSent(function ($request) {
            return $request['number'] === '628155500008'; // Cleaned number
        });
    }
}
```

---

## tests\TestCase.php

```php
<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
    }
}
```

---

## tests\Unit\ExampleTest.php

```php
<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_that_true_is_true(): void
    {
        $this->assertTrue(true);
    }
}
```

---

## vite.config.js

```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
```

---


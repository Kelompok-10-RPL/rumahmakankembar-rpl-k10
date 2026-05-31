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

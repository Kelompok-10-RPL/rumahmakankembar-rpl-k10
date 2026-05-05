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
            'name' => [$request->user() ? 'nullable' : 'required', 'string', 'max:100'],
            'phone' => [$request->user() ? 'nullable' : 'required', 'string', 'max:20'],
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

            $order->payments()->create([
                'transaction_id' => 'MANUAL-'.$order->unique_code,
                'payment_method' => $data['payment_method'],
                'payment_type' => 'full',
                'amount' => $order->total_price,
                'status' => 'pending',
                'expired_at' => now()->addMinutes((int) Setting::valueFor('auto_cancel_minutes', 30)),
            ]);

            if ($table) {
                $table->update([
                    'status' => 'locked',
                    'locked_at' => now(),
                    'locked_by_order_id' => $order->id,
                ]);
            }

            return $order;
        });

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

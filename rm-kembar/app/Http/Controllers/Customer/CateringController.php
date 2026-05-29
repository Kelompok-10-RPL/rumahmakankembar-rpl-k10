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
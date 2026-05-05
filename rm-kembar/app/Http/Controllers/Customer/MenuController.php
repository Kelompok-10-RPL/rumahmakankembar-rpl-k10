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

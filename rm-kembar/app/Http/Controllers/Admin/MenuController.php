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
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:512'],
        ]);
    }
}

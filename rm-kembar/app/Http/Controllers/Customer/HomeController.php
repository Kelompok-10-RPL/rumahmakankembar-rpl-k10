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

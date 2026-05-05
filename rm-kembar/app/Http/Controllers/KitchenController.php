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

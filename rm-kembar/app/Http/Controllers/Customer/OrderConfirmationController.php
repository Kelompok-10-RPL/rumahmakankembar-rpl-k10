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

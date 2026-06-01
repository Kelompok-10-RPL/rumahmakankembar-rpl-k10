<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class CateringController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Catering/Catering', [
            'packages' => Menu::query()
                ->where('is_for_catering', true)
                ->where('is_available', true)
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function create($package_id)
    {
        $selectedPackage = Menu::findOrFail($package_id);

        return Inertia::render('Catering/CateringForm', [
            'selectedPackage' => $selectedPackage,
            'menuItems' => Menu::where('is_available', 1)->get(),
        ]);
    }




    public function store(Request $request)
    {
        dd($request->all());

        $order = \App\Models\Order::create([
            'unique_code' => 'ORD-' . strtoupper(\Illuminate\Support\Str::random(8)),
            'user_id' => 1,
            'package_id' => $request->package_id,
            'qty' => $request->qty,
            'total_price' => $request->total_price,
            'status' => 'pending',

            'event_name' => $request->event_name,
            'event_date' => $request->event_date,
            'event_time' => $request->event_time,
            'event_address' => $request->event_address,

            'add_ons' => json_encode($request->add_ons),
        ]);

        return back()->with([
            'order' => $order
        ]);
    }
}


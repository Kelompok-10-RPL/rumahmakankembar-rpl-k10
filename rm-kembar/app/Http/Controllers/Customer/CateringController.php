<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Catering;
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
            'order' => session('order'),
        ]);
    }




    public function store(Request $request)
    {
        $catering = Catering::create([
            'unique_code'       => 'CAT-' . strtoupper(Str::random(8)),
            'user_id'           => Auth::id() ?? 1,

            'event_date'        => $request->event_date,
            'event_time'        => $request->event_time,
            'delivery_address'  => $request->event_address,

            'guest_count'       => $request->qty,

            'subtotal'          => $request->total_price,
            'total_price'       => $request->total_price,

            'payment_status'    => 'pending',
            'status'            => 'pending',

            'notes' => json_encode([
                'event_name' => $request->event_name,
                'package_id' => $request->package_id,
                'add_ons'    => $request->add_ons,
            ]),
        ]);

            return redirect()->route('catering.create', $request->package_id)->with('order', [
            'id' => $catering->id,
            'unique_code' => $catering->unique_code,
            'total_price' => $catering->total_price,
        ]);
    }
}


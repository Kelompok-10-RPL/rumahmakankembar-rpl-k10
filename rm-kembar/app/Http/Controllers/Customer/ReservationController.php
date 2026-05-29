<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\DineInTable;
use App\Models\Reservation;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('Reservations/Create', [
            'availableTables' => DineInTable::query()->where('status', 'kosong')->orderBy('table_number')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => [$request->user() ? 'nullable' : 'required', 'string', 'min:3', 'max:100', 'regex:/^[a-zA-Z\s\.\,\'\-]+$/'],
            'phone' => [$request->user() ? 'nullable' : 'required', 'string', 'min:9', 'max:20', 'regex:/^[0-9\-\+\s\(\)]+$/'],
            'reserved_date' => ['required', 'date', 'after_or_equal:today'],
            'reserved_time' => ['required', 'date_format:H:i'],
            'guest_count' => ['required', 'integer', 'min:1', 'max:100'],
            'notes' => ['nullable', 'string'],
        ]);

        $user = $request->user() ?: User::firstOrCreate(
            ['phone' => $data['phone']],
            ['name' => $data['name'], 'role' => 'customer', 'password' => Str::password(16)]
        );

        $reservedAt = Carbon::parse($data['reserved_date'].' '.$data['reserved_time']);
        $reservation = Reservation::create([
            'unique_code' => Reservation::generateCode(),
            'user_id' => $user->id,
            'reserved_date' => $data['reserved_date'],
            'reserved_time' => $data['reserved_time'],
            'guest_count' => $data['guest_count'],
            'status' => 'pending',
            'notes' => $data['notes'] ?? null,
            'auto_cancel_at' => $reservedAt->copy()->addMinutes((int) Setting::valueFor('auto_cancel_minutes', 30)),
        ]);

        return redirect()->route('reservations.create')->with('status', "Reservasi {$reservation->unique_code} dibuat. Admin akan konfirmasi meja saat kedatangan.");
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\DineInTable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    public function index(): Response
    {
        $reservations = Reservation::with(['user', 'table'])
            ->orderByRaw("CASE WHEN status = 'pending' THEN 1 WHEN status = 'confirmed' THEN 2 ELSE 3 END")
            ->orderBy('reserved_date', 'asc')
            ->orderBy('reserved_time', 'asc')
            ->get();
            
        $tables = DineInTable::whereIn('status', ['kosong', 'reserved'])->get();

        return Inertia::render('Admin/Reservations', [
            'reservations' => $reservations,
            'tables' => $tables,
        ]);
    }

    public function update(Request $request, Reservation $reservation): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'in:pending,confirmed,cancelled,completed'],
            'table_id' => ['nullable', 'exists:dine_in_tables,id'],
        ]);

        if ($data['status'] === 'confirmed' && $data['table_id']) {
            $table = DineInTable::find($data['table_id']);
            if ($table && $table->status === 'kosong') {
                $table->update(['status' => 'reserved']);
            }
        }
        
        if (in_array($data['status'], ['cancelled', 'completed']) && $reservation->table_id) {
            $table = DineInTable::find($reservation->table_id);
            if ($table) {
                $table->update(['status' => 'kosong']);
            }
        }

        $reservation->update($data);

        return back()->with('status', 'Status reservasi berhasil diperbarui.');
    }
}

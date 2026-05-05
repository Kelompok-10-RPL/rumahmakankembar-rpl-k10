<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DineInTable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TableController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Tables', [
            'tables' => DineInTable::query()->orderBy('table_number')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'table_number' => ['required', 'string', 'max:10', 'unique:dine_in_tables,table_number'],
            'capacity' => ['required', 'integer', 'min:1'],
            'location_label' => ['nullable', 'string', 'max:100'],
            'notes' => ['nullable', 'string', 'max:255'],
        ]);

        DineInTable::create($data + ['status' => 'kosong']);

        return back()->with('status', 'Meja ditambahkan.');
    }

    public function update(Request $request, DineInTable $table): RedirectResponse
    {
        $data = $request->validate([
            'capacity' => ['required', 'integer', 'min:1'],
            'status' => ['required', 'string', 'max:20'],
            'location_label' => ['nullable', 'string', 'max:100'],
            'notes' => ['nullable', 'string', 'max:255'],
        ]);

        if ($data['status'] === 'kosong') {
            $data['locked_at'] = null;
            $data['locked_by_order_id'] = null;
        }

        $table->update($data);

        return back()->with('status', 'Meja diperbarui.');
    }
}

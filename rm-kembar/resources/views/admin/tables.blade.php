@extends('layouts.admin', ['title' => 'Stok & Meja'])

@section('content')
    <h1 class="text-2xl font-bold">Manajemen Meja</h1>
    <form class="mt-5 grid gap-3 rounded-md border border-zinc-200 bg-white p-4 md:grid-cols-5" method="POST" action="{{ route('admin.tables.store') }}">
        @csrf
        <input class="rounded-md border border-zinc-300 px-3 py-2" name="table_number" placeholder="Nomor meja" required>
        <input class="rounded-md border border-zinc-300 px-3 py-2" type="number" min="1" name="capacity" placeholder="Kapasitas" required>
        <input class="rounded-md border border-zinc-300 px-3 py-2" name="location_label" placeholder="Lokasi">
        <input class="rounded-md border border-zinc-300 px-3 py-2" name="notes" placeholder="Catatan">
        <button class="rounded-md bg-red-700 px-4 py-2 font-semibold text-white">Tambah</button>
    </form>

    <div class="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        @foreach($tables as $table)
            <form class="rounded-md border border-zinc-200 bg-white p-4" method="POST" action="{{ route('admin.tables.update', $table) }}">
                @csrf
                @method('PUT')
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <h2 class="font-bold">Meja {{ $table->table_number }}</h2>
                        <p class="text-sm text-zinc-600">{{ $table->location_label }}</p>
                    </div>
                    <span class="rounded-md bg-zinc-100 px-2 py-1 text-xs font-semibold">{{ $table->status }}</span>
                </div>
                <div class="mt-3 grid gap-2">
                    <input class="rounded-md border border-zinc-300 px-3 py-2" type="number" min="1" name="capacity" value="{{ $table->capacity }}">
                    <select class="rounded-md border border-zinc-300 px-3 py-2" name="status">
                        @foreach(['kosong', 'locked', 'terisi', 'reserved'] as $status)
                            <option value="{{ $status }}" @selected($table->status === $status)>{{ $status }}</option>
                        @endforeach
                    </select>
                    <input class="rounded-md border border-zinc-300 px-3 py-2" name="location_label" value="{{ $table->location_label }}">
                    <input class="rounded-md border border-zinc-300 px-3 py-2" name="notes" value="{{ $table->notes }}">
                </div>
                <button class="mt-3 rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">Update Meja</button>
            </form>
        @endforeach
    </div>
@endsection

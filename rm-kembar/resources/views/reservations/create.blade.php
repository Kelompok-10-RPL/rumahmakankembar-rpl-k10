@extends('layouts.app', ['title' => 'Reservasi'])

@section('content')
    <section class="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[1fr_320px]">
        <form class="rounded-md border border-zinc-200 bg-white p-5" method="POST" action="{{ route('reservations.store') }}">
            @csrf
            <h1 class="text-2xl font-bold">Reservasi Meja</h1>
            <p class="mt-1 text-sm text-zinc-600">Admin mengonfirmasi meja saat kedatangan. Reservasi otomatis batal 30 menit setelah jadwal jika belum hadir.</p>

            @guest
                <div class="mt-5 grid gap-4 sm:grid-cols-2">
                    <label class="block text-sm font-medium">Nama
                        <input class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" name="name" required>
                    </label>
                    <label class="block text-sm font-medium">Nomor WhatsApp
                        <input class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" name="phone" required>
                    </label>
                </div>
            @endguest

            <div class="mt-5 grid gap-4 sm:grid-cols-3">
                <label class="block text-sm font-medium">Tanggal
                    <input class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="date" name="reserved_date" required>
                </label>
                <label class="block text-sm font-medium">Jam
                    <input class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="time" name="reserved_time" required>
                </label>
                <label class="block text-sm font-medium">Tamu
                    <input class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="number" min="1" name="guest_count" required>
                </label>
            </div>
            <label class="mt-4 block text-sm font-medium">Catatan
                <textarea class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" name="notes" rows="3"></textarea>
            </label>
            <button class="mt-5 rounded-md bg-red-700 px-4 py-3 font-semibold text-white hover:bg-red-800">Buat Reservasi</button>
        </form>

        <aside class="h-fit rounded-md border border-zinc-200 bg-white p-5">
            <h2 class="font-bold">Meja kosong saat ini</h2>
            <div class="mt-3 grid grid-cols-2 gap-2">
                @foreach($availableTables as $table)
                    <div class="rounded-md border border-zinc-200 p-3 text-sm">
                        <p class="font-bold">Meja {{ $table->table_number }}</p>
                        <p class="text-zinc-600">{{ $table->capacity }} kursi</p>
                    </div>
                @endforeach
            </div>
        </aside>
    </section>
@endsection

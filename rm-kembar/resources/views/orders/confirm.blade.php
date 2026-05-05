@extends('layouts.app', ['title' => 'Konfirmasi Pesanan'])

@section('content')
    <section class="mx-auto max-w-3xl px-4 py-10">
        <div class="rounded-md border border-zinc-200 bg-white p-6">
            <p class="text-sm font-semibold uppercase text-emerald-700">Pesanan dibuat</p>
            <h1 class="mt-2 text-3xl font-bold">{{ $order->unique_code }}</h1>
            <p class="mt-2 text-zinc-600">Tunjukkan kode ini ke kasir untuk validasi pembayaran dan kedatangan.</p>

            <dl class="mt-6 grid gap-3 sm:grid-cols-2">
                <div class="rounded-md bg-zinc-50 p-4"><dt class="text-sm text-zinc-600">Status</dt><dd class="font-bold">{{ str_replace('_', ' ', $order->status) }}</dd></div>
                <div class="rounded-md bg-zinc-50 p-4"><dt class="text-sm text-zinc-600">Pembayaran</dt><dd class="font-bold">{{ $order->payment_status }}</dd></div>
                <div class="rounded-md bg-zinc-50 p-4"><dt class="text-sm text-zinc-600">Meja</dt><dd class="font-bold">{{ $order->table?->table_number ?? '-' }}</dd></div>
                <div class="rounded-md bg-zinc-50 p-4"><dt class="text-sm text-zinc-600">Total</dt><dd class="font-bold">Rp {{ number_format((float) $order->total_price, 0, ',', '.') }}</dd></div>
            </dl>

            <div class="mt-6">
                <h2 class="font-bold">Item</h2>
                <div class="mt-3 space-y-2">
                    @foreach($order->items as $item)
                        <div class="flex justify-between gap-3 text-sm">
                            <span>{{ $item->qty }} x {{ $item->menu_name }}</span>
                            <span>Rp {{ number_format((float) $item->subtotal, 0, ',', '.') }}</span>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </section>
@endsection

@extends('layouts.admin', ['title' => 'Dashboard Admin'])

@section('content')
    <h1 class="text-2xl font-bold">Dashboard</h1>
    <div class="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div class="rounded-md border border-zinc-200 bg-white p-4"><p class="text-sm text-zinc-600">Pesanan hari ini</p><p class="mt-1 text-3xl font-bold">{{ $ordersToday }}</p></div>
        <div class="rounded-md border border-zinc-200 bg-white p-4"><p class="text-sm text-zinc-600">Revenue hari ini</p><p class="mt-1 text-3xl font-bold">Rp {{ number_format($revenueToday, 0, ',', '.') }}</p></div>
        <div class="rounded-md border border-zinc-200 bg-white p-4"><p class="text-sm text-zinc-600">Pesanan aktif</p><p class="mt-1 text-3xl font-bold">{{ $activeOrders }}</p></div>
        <div class="rounded-md border border-zinc-200 bg-white p-4"><p class="text-sm text-zinc-600">Meja dipakai</p><p class="mt-1 text-3xl font-bold">{{ $occupiedTables }}</p></div>
    </div>

    <div class="mt-6 grid gap-5 xl:grid-cols-[1fr_360px]">
        <section class="rounded-md border border-zinc-200 bg-white">
            <div class="border-b border-zinc-200 p-4">
                <h2 class="font-bold">Pesanan terbaru</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead class="bg-zinc-50 text-zinc-600">
                        <tr><th class="p-3">Kode</th><th class="p-3">Customer</th><th class="p-3">Meja</th><th class="p-3">Status</th><th class="p-3 text-right">Total</th></tr>
                    </thead>
                    <tbody>
                        @foreach($recentOrders as $order)
                            <tr class="border-t border-zinc-100">
                                <td class="p-3 font-semibold text-red-700">{{ $order->unique_code }}</td>
                                <td class="p-3">{{ $order->user->name }}</td>
                                <td class="p-3">{{ $order->table?->table_number ?? '-' }}</td>
                                <td class="p-3">{{ str_replace('_', ' ', $order->status) }}</td>
                                <td class="p-3 text-right">Rp {{ number_format((float) $order->total_price, 0, ',', '.') }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </section>

        <section class="rounded-md border border-zinc-200 bg-white p-4">
            <h2 class="font-bold">Stok rendah</h2>
            <div class="mt-3 space-y-2">
                @forelse($lowStockMenus as $menu)
                    <div class="flex justify-between rounded-md bg-zinc-50 p-3 text-sm">
                        <span>{{ $menu->name }}</span>
                        <span class="font-bold">{{ $menu->stock }}</span>
                    </div>
                @empty
                    <p class="text-sm text-zinc-600">Stok aman.</p>
                @endforelse
            </div>
        </section>
    </div>
@endsection

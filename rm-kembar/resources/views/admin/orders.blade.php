@extends('layouts.admin', ['title' => 'Pesanan'])

@section('content')
    <div class="flex flex-wrap items-center justify-between gap-3">
        <h1 class="text-2xl font-bold">Pesanan</h1>
        <form method="GET">
            <select class="rounded-md border border-zinc-300 px-3 py-2 text-sm" name="status" onchange="this.form.submit()">
                <option value="">Semua status</option>
                @foreach(['pending', 'paid_waiting', 'on_site', 'preparing', 'completed', 'cancelled'] as $status)
                    <option value="{{ $status }}" @selected(request('status') === $status)>{{ str_replace('_', ' ', $status) }}</option>
                @endforeach
            </select>
        </form>
    </div>

    <div class="mt-5 space-y-4">
        @foreach($orders as $order)
            <article class="rounded-md border border-zinc-200 bg-white p-4">
                <div class="flex flex-wrap justify-between gap-3">
                    <div>
                        <h2 class="font-bold text-red-700">{{ $order->unique_code }}</h2>
                        <p class="text-sm text-zinc-600">{{ $order->user->name }} · Meja {{ $order->table?->table_number ?? '-' }} · {{ str_replace('_', ' ', $order->status) }}</p>
                    </div>
                    <p class="font-bold">Rp {{ number_format((float) $order->total_price, 0, ',', '.') }}</p>
                </div>
                <div class="mt-3 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                    @foreach($order->items as $item)
                        <div class="rounded-md bg-zinc-50 p-3">
                            <p class="font-semibold">{{ $item->qty }} x {{ $item->menu_name }}</p>
                            @if($item->notes)<p class="text-zinc-600">{{ $item->notes }}</p>@endif
                        </div>
                    @endforeach
                </div>
                <div class="mt-4 flex flex-wrap gap-2">
                    @foreach(['paid' => 'Validasi Bayar', 'arrive' => 'Tiba', 'prepare' => 'Masak', 'complete' => 'Selesai'] as $action => $label)
                        <form method="POST" action="{{ route('admin.orders.transition', [$order, $action]) }}">
                            @csrf
                            <button class="rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-700">{{ $label }}</button>
                        </form>
                    @endforeach
                    <form method="POST" action="{{ route('admin.orders.transition', [$order, 'cancel']) }}">
                        @csrf
                        <input type="hidden" name="cancellation_reason" value="Dibatalkan admin">
                        <button class="rounded-md border border-red-300 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">Batal</button>
                    </form>
                </div>
            </article>
        @endforeach
    </div>
    <div class="mt-5">{{ $orders->links() }}</div>
@endsection

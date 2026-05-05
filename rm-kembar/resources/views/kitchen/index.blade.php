@extends('layouts.admin', ['title' => 'Kitchen Display'])

@section('content')
    <meta http-equiv="refresh" content="5">
    <h1 class="text-2xl font-bold">Kitchen Display</h1>
    <div class="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        @forelse($orders as $order)
            <article class="rounded-md border border-zinc-200 bg-white p-4">
                <div class="flex justify-between gap-3">
                    <div>
                        <h2 class="font-bold text-red-700">{{ $order->unique_code }}</h2>
                        <p class="text-sm text-zinc-600">Meja {{ $order->table?->table_number ?? '-' }} · {{ str_replace('_', ' ', $order->status) }}</p>
                    </div>
                    <p class="text-sm text-zinc-500">{{ $order->created_at->format('H:i') }}</p>
                </div>
                <div class="mt-4 space-y-2">
                    @foreach($order->items as $item)
                        <div class="rounded-md bg-zinc-50 p-3">
                            <p class="font-semibold">{{ $item->qty }} x {{ $item->menu_name }}</p>
                            @if($item->notes)<p class="text-sm text-zinc-600">{{ $item->notes }}</p>@endif
                        </div>
                    @endforeach
                </div>
            </article>
        @empty
            <p class="rounded-md border border-zinc-200 bg-white p-4 text-zinc-600">Belum ada pesanan aktif untuk dapur.</p>
        @endforelse
    </div>
@endsection

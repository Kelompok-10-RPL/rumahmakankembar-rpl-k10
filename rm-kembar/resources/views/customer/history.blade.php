@extends('layouts.app', ['title' => 'Riwayat Pesanan'])

@section('content')
    <section class="mx-auto max-w-5xl px-4 py-8">
        <h1 class="text-3xl font-bold">Riwayat Pesanan</h1>
        <div class="mt-5 space-y-3">
            @forelse($orders as $order)
                <article class="rounded-md border border-zinc-200 bg-white p-4">
                    <div class="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <a class="font-bold text-red-700" href="{{ route('orders.confirm', $order->unique_code) }}">{{ $order->unique_code }}</a>
                            <p class="text-sm text-zinc-600">{{ $order->created_at->format('d M Y H:i') }} · {{ str_replace('_', ' ', $order->status) }}</p>
                        </div>
                        <p class="font-bold">Rp {{ number_format((float) $order->total_price, 0, ',', '.') }}</p>
                    </div>
                </article>
            @empty
                <p class="rounded-md border border-zinc-200 bg-white p-4 text-zinc-600">Belum ada pesanan.</p>
            @endforelse
        </div>
        <div class="mt-5">{{ $orders->links() }}</div>
    </section>
@endsection

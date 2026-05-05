@extends('layouts.app', ['title' => 'Checkout'])

@section('content')
    <section class="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
        <form class="rounded-md border border-zinc-200 bg-white p-5" method="POST" action="{{ route('checkout.store') }}">
            @csrf
            <h1 class="text-2xl font-bold">Checkout</h1>
            @if($table)
                <p class="mt-1 text-sm text-zinc-600">Meja {{ $table->table_number }} akan dikunci setelah pesanan dibuat.</p>
            @endif

            @guest
                <div class="mt-5 grid gap-4 sm:grid-cols-2">
                    <label class="block text-sm font-medium">Nama
                        <input class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" name="name" value="{{ old('name') }}" required>
                    </label>
                    <label class="block text-sm font-medium">Nomor WhatsApp
                        <input class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" name="phone" value="{{ old('phone') }}" required>
                    </label>
                    <label class="block text-sm font-medium">Email
                        <input class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="email" name="email" value="{{ old('email') }}">
                    </label>
                    <label class="block text-sm font-medium sm:col-span-2">Alamat
                        <textarea class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" name="address" rows="3">{{ old('address') }}</textarea>
                    </label>
                </div>
            @endguest

            <div class="mt-5 grid gap-4">
                <label class="block text-sm font-medium">Metode pembayaran
                    <select class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" name="payment_method" required>
                        @foreach($paymentMethods as $value => $label)
                            <option value="{{ $value }}">{{ $label }}</option>
                        @endforeach
                    </select>
                </label>
                <label class="block text-sm font-medium">Catatan pesanan
                    <textarea class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" name="notes" rows="3">{{ old('notes') }}</textarea>
                </label>
            </div>
            <button class="mt-5 w-full rounded-md bg-red-700 px-4 py-3 font-semibold text-white hover:bg-red-800">Buat Pesanan</button>
        </form>

        <aside class="h-fit rounded-md border border-zinc-200 bg-white p-5">
            <h2 class="text-xl font-bold">Ringkasan</h2>
            <div class="mt-4 space-y-3">
                @foreach($cart as $item)
                    <div class="flex justify-between gap-3 text-sm">
                        <span>{{ $item['qty'] }} x {{ $item['name'] }}</span>
                        <span>Rp {{ number_format($item['qty'] * $item['price'], 0, ',', '.') }}</span>
                    </div>
                @endforeach
            </div>
            <dl class="mt-4 space-y-2 border-t border-zinc-200 pt-4 text-sm">
                <div class="flex justify-between"><dt>Subtotal</dt><dd>Rp {{ number_format($subtotal, 0, ',', '.') }}</dd></div>
                <div class="flex justify-between"><dt>PPN {{ $taxRate * 100 }}%</dt><dd>Rp {{ number_format($taxAmount, 0, ',', '.') }}</dd></div>
                <div class="flex justify-between text-lg font-bold"><dt>Total</dt><dd>Rp {{ number_format($total, 0, ',', '.') }}</dd></div>
            </dl>
        </aside>
    </section>
@endsection

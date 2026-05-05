@extends('layouts.app', ['title' => 'Menu Dine-In'])

@section('content')
    <section class="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
        <div>
            <div class="mb-5">
                <h1 class="text-3xl font-bold">Menu Dine-In</h1>
                <p class="mt-1 text-sm text-zinc-600">
                    @if($selectedTable)
                        Meja {{ $selectedTable->table_number }} · Status {{ $selectedTable->status }}
                    @else
                        Pilih menu, lalu meja akan dikunci saat checkout.
                    @endif
                </p>
            </div>

            <form class="mb-5 grid gap-3 rounded-md border border-zinc-200 bg-white p-4 sm:grid-cols-[1fr_180px_auto]" method="GET" action="{{ route('menu.index') }}">
                <input class="rounded-md border border-zinc-300 px-3 py-2" name="q" value="{{ request('q') }}" placeholder="Cari menu">
                <select class="rounded-md border border-zinc-300 px-3 py-2" name="category">
                    <option value="">Semua kategori</option>
                    @foreach($categories as $category)
                        <option value="{{ $category->slug }}" @selected(request('category') === $category->slug)>{{ $category->name }}</option>
                    @endforeach
                </select>
                <button class="rounded-md bg-zinc-900 px-4 py-2 font-semibold text-white">Filter</button>
            </form>

            <div class="grid gap-3 sm:grid-cols-2">
                @foreach($menus as $menu)
                    <article class="rounded-md border border-zinc-200 bg-white p-4">
                        <div class="flex items-start justify-between gap-4">
                            <div>
                                <p class="text-xs font-semibold uppercase text-zinc-500">{{ $menu->category->name }}</p>
                                <h2 class="mt-1 font-bold">{{ $menu->name }}</h2>
                                <p class="mt-2 text-sm text-zinc-600">{{ $menu->description }}</p>
                            </div>
                            <p class="whitespace-nowrap font-bold text-red-700">Rp {{ number_format((float) $menu->price, 0, ',', '.') }}</p>
                        </div>
                        <div class="mt-4 flex items-center justify-between text-sm">
                            <span class="{{ $menu->is_available && $menu->stock > 0 ? 'text-emerald-700' : 'text-red-700' }}">
                                {{ $menu->is_available && $menu->stock > 0 ? "Stok {$menu->stock}" : 'Habis' }}
                            </span>
                        </div>
                        <form class="mt-3 grid gap-2" method="POST" action="{{ route('cart.add') }}">
                            @csrf
                            <input type="hidden" name="menu_id" value="{{ $menu->id }}">
                            @if($selectedTable)
                                <input type="hidden" name="table_id" value="{{ $selectedTable->id }}">
                            @endif
                            <div class="grid grid-cols-[88px_1fr] gap-2">
                                <input class="rounded-md border border-zinc-300 px-3 py-2" type="number" min="1" max="{{ max(1, $menu->stock) }}" name="qty" value="1">
                                <input class="rounded-md border border-zinc-300 px-3 py-2" name="notes" placeholder="Catatan item">
                            </div>
                            <button class="rounded-md bg-red-700 px-4 py-2 font-semibold text-white disabled:bg-zinc-300" @disabled(! $menu->is_available || $menu->stock < 1)>Tambah</button>
                        </form>
                    </article>
                @endforeach
            </div>
        </div>

        <aside class="h-fit rounded-md border border-zinc-200 bg-white p-4 lg:sticky lg:top-20">
            <h2 class="text-xl font-bold">Keranjang</h2>
            @if($cart === [])
                <p class="mt-3 text-sm text-zinc-600">Belum ada item.</p>
            @else
                <div class="mt-4 space-y-3">
                    @foreach($cart as $item)
                        <div class="border-b border-zinc-100 pb-3">
                            <div class="flex justify-between gap-3">
                                <div>
                                    <p class="font-semibold">{{ $item['name'] }}</p>
                                    <p class="text-sm text-zinc-600">{{ $item['qty'] }} x Rp {{ number_format($item['price'], 0, ',', '.') }}</p>
                                    @if(! empty($item['notes']))
                                        <p class="mt-1 text-xs text-zinc-500">{{ $item['notes'] }}</p>
                                    @endif
                                </div>
                                <form method="POST" action="{{ route('cart.remove', $item['menu_id']) }}">
                                    @csrf
                                    @method('DELETE')
                                    <button class="text-sm font-semibold text-red-700">Hapus</button>
                                </form>
                            </div>
                        </div>
                    @endforeach
                </div>
                <div class="mt-4 flex justify-between font-bold">
                    <span>Subtotal</span>
                    <span>Rp {{ number_format(collect($cart)->sum(fn($item) => $item['qty'] * $item['price']), 0, ',', '.') }}</span>
                </div>
                <a class="mt-4 block rounded-md bg-red-700 px-4 py-3 text-center font-semibold text-white hover:bg-red-800" href="{{ route('checkout.show') }}">Checkout</a>
            @endif
        </aside>
    </section>
@endsection

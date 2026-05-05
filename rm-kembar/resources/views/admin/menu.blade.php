@extends('layouts.admin', ['title' => 'Menu'])

@section('content')
    <h1 class="text-2xl font-bold">Manajemen Menu</h1>
    <section class="mt-5 rounded-md border border-zinc-200 bg-white p-4">
        <h2 class="font-bold">Tambah menu</h2>
        <form class="mt-3 grid gap-3 md:grid-cols-4" method="POST" action="{{ route('admin.menu.store') }}">
            @csrf
            @include('admin.partials.menu-fields', ['menu' => null])
            <button class="rounded-md bg-red-700 px-4 py-2 font-semibold text-white md:col-span-4">Simpan Menu</button>
        </form>
    </section>

    <section class="mt-5 space-y-3">
        @foreach($menus as $menu)
            <form class="rounded-md border border-zinc-200 bg-white p-4" method="POST" action="{{ route('admin.menu.update', $menu) }}">
                @csrf
                @method('PUT')
                <div class="grid gap-3 md:grid-cols-4">
                    @include('admin.partials.menu-fields', ['menu' => $menu])
                    <div class="flex gap-2 md:col-span-4">
                        <button class="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">Update</button>
                    </div>
                </div>
            </form>
            <form method="POST" action="{{ route('admin.menu.destroy', $menu) }}">
                @csrf
                @method('DELETE')
                <button class="-mt-2 text-sm font-semibold text-red-700">Hapus {{ $menu->name }}</button>
            </form>
        @endforeach
    </section>
@endsection

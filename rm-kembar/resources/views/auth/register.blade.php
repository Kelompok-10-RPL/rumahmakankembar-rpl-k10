@extends('layouts.app', ['title' => 'Daftar'])

@section('content')
    <section class="mx-auto max-w-md px-4 py-12">
        <h1 class="text-3xl font-bold">Daftar Akun</h1>
        <form class="mt-6 space-y-4 rounded-md border border-zinc-200 bg-white p-5" method="POST" action="{{ route('register.store') }}">
            @csrf
            <label class="block text-sm font-medium">Nama
                <input class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" name="name" value="{{ old('name') }}" required>
            </label>
            <label class="block text-sm font-medium">Email
                <input class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="email" name="email" value="{{ old('email') }}" required>
            </label>
            <label class="block text-sm font-medium">Nomor WhatsApp
                <input class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" name="phone" value="{{ old('phone') }}" required>
            </label>
            <label class="block text-sm font-medium">Alamat
                <textarea class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" name="address" rows="3">{{ old('address') }}</textarea>
            </label>
            <label class="block text-sm font-medium">Password
                <input class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="password" name="password" required>
            </label>
            <label class="block text-sm font-medium">Konfirmasi Password
                <input class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="password" name="password_confirmation" required>
            </label>
            <button class="w-full rounded-md bg-red-700 px-4 py-2.5 font-semibold text-white hover:bg-red-800">Daftar</button>
        </form>
    </section>
@endsection

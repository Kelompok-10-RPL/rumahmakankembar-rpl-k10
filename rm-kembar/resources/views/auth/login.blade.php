@extends('layouts.app', ['title' => 'Masuk'])

@section('content')
    <section class="mx-auto max-w-md px-4 py-12">
        <h1 class="text-3xl font-bold">Masuk</h1>
        <form class="mt-6 space-y-4 rounded-md border border-zinc-200 bg-white p-5" method="POST" action="{{ route('login.store') }}">
            @csrf
            <label class="block text-sm font-medium">Email
                <input class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="email" name="email" value="{{ old('email') }}" required>
            </label>
            <label class="block text-sm font-medium">Password
                <input class="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="password" name="password" required>
            </label>
            <label class="flex items-center gap-2 text-sm">
                <input class="rounded border-zinc-300" type="checkbox" name="remember" value="1"> Ingat saya
            </label>
            <button class="w-full rounded-md bg-red-700 px-4 py-2.5 font-semibold text-white hover:bg-red-800">Masuk</button>
            <p class="text-center text-sm text-zinc-600">Belum punya akun? <a class="font-semibold text-red-700" href="{{ route('register') }}">Daftar</a></p>
        </form>
    </section>
@endsection

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'RM Kembar' }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen bg-zinc-50 text-zinc-950 antialiased">
    <header class="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <a href="{{ route('home') }}" class="font-bold text-lg">RM Kembar</a>
            <nav class="hidden items-center gap-5 text-sm font-medium text-zinc-700 md:flex">
                <a class="hover:text-red-700" href="{{ route('menu.index') }}">Menu</a>
                <a class="hover:text-red-700" href="{{ route('reservations.create') }}">Reservasi</a>
                @auth
                    @if(auth()->user()->isStaff())
                        <a class="hover:text-red-700" href="{{ auth()->user()->role === 'kitchen' ? route('kitchen.index') : route('admin.dashboard') }}">Dashboard</a>
                    @else
                        <a class="hover:text-red-700" href="{{ route('account.history') }}">Riwayat</a>
                    @endif
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button class="rounded-md border border-zinc-300 px-3 py-1.5 hover:bg-zinc-100">Keluar</button>
                    </form>
                @else
                    <a class="hover:text-red-700" href="{{ route('login') }}">Masuk</a>
                    <a class="rounded-md bg-red-700 px-3 py-1.5 text-white hover:bg-red-800" href="{{ route('register') }}">Daftar</a>
                @endauth
            </nav>
            <a class="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white md:hidden" href="{{ route('menu.index') }}">Pesan</a>
        </div>
    </header>

    @if (session('status') || $errors->any())
        <div class="mx-auto max-w-6xl px-4 pt-4">
            @if (session('status'))
                <div class="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{{ session('status') }}</div>
            @endif
            @if ($errors->any())
                <div class="mt-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{{ $errors->first() }}</div>
            @endif
        </div>
    @endif

    <main>
        @yield('content')
    </main>
</body>
</html>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Admin RM Kembar' }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen bg-zinc-100 text-zinc-950">
    <div class="min-h-screen md:grid md:grid-cols-[240px_1fr]">
        <aside class="border-r border-zinc-200 bg-white p-4">
            <a class="text-xl font-black" href="{{ route('admin.dashboard') }}">RM Kembar</a>
            <nav class="mt-6 grid gap-1 text-sm font-medium">
                <a class="rounded-md px-3 py-2 hover:bg-zinc-100" href="{{ route('admin.dashboard') }}">Dashboard</a>
                <a class="rounded-md px-3 py-2 hover:bg-zinc-100" href="{{ route('admin.orders.index') }}">Pesanan</a>
                <a class="rounded-md px-3 py-2 hover:bg-zinc-100" href="{{ route('admin.menu.index') }}">Menu</a>
                <a class="rounded-md px-3 py-2 hover:bg-zinc-100" href="{{ route('admin.tables.index') }}">Stok & Meja</a>
                <a class="rounded-md px-3 py-2 hover:bg-zinc-100" href="{{ route('kitchen.index') }}">Kitchen</a>
                <a class="rounded-md px-3 py-2 hover:bg-zinc-100" href="{{ route('home') }}">Beranda</a>
            </nav>
            <form class="mt-6" method="POST" action="{{ route('logout') }}">
                @csrf
                <button class="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold hover:bg-zinc-100">Keluar</button>
            </form>
        </aside>
        <main class="p-4 md:p-6">
            @if (session('status') || $errors->any())
                <div class="mb-4">
                    @if (session('status'))
                        <div class="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{{ session('status') }}</div>
                    @endif
                    @if ($errors->any())
                        <div class="mt-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{{ $errors->first() }}</div>
                    @endif
                </div>
            @endif
            @yield('content')
        </main>
    </div>
</body>
</html>

import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const { flash, errors } = usePage().props;

    return (
        <div className="min-h-screen bg-zinc-100 text-zinc-950 md:grid md:grid-cols-[240px_1fr]">
            <aside className="border-r border-zinc-200 bg-white p-4">
                <Link className="text-xl font-black" href="/admin/dashboard">RM Kembar</Link>
                <nav className="mt-6 grid gap-1 text-sm font-medium">
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/admin/dashboard">Dashboard</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/admin/pesanan">Pesanan</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/admin/menu">Menu</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/admin/stok-meja">Stok & Meja</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/admin/pengguna">Pengguna</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/admin/laporan">Laporan</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/admin/pengaturan">Pengaturan</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/kitchen">Kitchen</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-zinc-100" href="/">Beranda</Link>
                </nav>
                <Link method="post" as="button" href="/logout" className="mt-6 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold hover:bg-zinc-100">Keluar</Link>
            </aside>
            <main className="p-4 md:p-6">
                {(flash?.status || Object.keys(errors || {}).length > 0) && (
                    <div className="mb-4">
                        {flash?.status && <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{flash.status}</div>}
                        {Object.keys(errors || {}).length > 0 && <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{Object.values(errors)[0]}</div>}
                    </div>
                )}
                {children}
            </main>

                


        </div>
    );
}

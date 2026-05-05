import { Link, usePage } from '@inertiajs/react';

export function money(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(Number(value || 0));
}

export function statusText(value) {
    return String(value || '-').replaceAll('_', ' ');
}

export default function AppLayout({ children }) {
    const { auth, flash, errors } = usePage().props;
    const user = auth?.user;

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-950">
            <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                    <Link href="/" className="text-lg font-bold">RM Kembar</Link>
                    <nav className="hidden items-center gap-5 text-sm font-medium text-zinc-700 md:flex">
                        <Link className="hover:text-red-700" href="/menu">Menu</Link>
                        <Link className="hover:text-red-700" href="/reservasi">Reservasi</Link>
                        {user ? (
                            <>
                                {['admin', 'owner', 'kitchen'].includes(user.role) ? (
                                    <Link className="hover:text-red-700" href={user.role === 'kitchen' ? '/kitchen' : '/admin/dashboard'}>Dashboard</Link>
                                ) : (
                                    <Link className="hover:text-red-700" href="/akun/riwayat">Riwayat</Link>
                                )}
                                <Link method="post" as="button" href="/logout" className="rounded-md border border-zinc-300 px-3 py-1.5 hover:bg-zinc-100">Keluar</Link>
                            </>
                        ) : (
                            <>
                                <Link className="hover:text-red-700" href="/login">Masuk</Link>
                                <Link className="rounded-md bg-red-700 px-3 py-1.5 text-white hover:bg-red-800" href="/register">Daftar</Link>
                            </>
                        )}
                    </nav>
                    <Link className="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white md:hidden" href="/menu">Pesan</Link>
                </div>
            </header>

            {(flash?.status || Object.keys(errors || {}).length > 0) && (
                <div className="mx-auto max-w-6xl px-4 pt-4">
                    {flash?.status && <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{flash.status}</div>}
                    {Object.keys(errors || {}).length > 0 && (
                        <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{Object.values(errors)[0]}</div>
                    )}
                </div>
            )}

            <main>{children}</main>
        </div>
    );
}

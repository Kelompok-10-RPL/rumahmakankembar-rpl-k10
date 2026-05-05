import { Head, Link } from '@inertiajs/react';
import AppLayout, { money } from '../Layouts/AppLayout';

export default function Home({ availableTables, totalTables, featuredMenus }) {
    return (
        <AppLayout>
            <Head title="Beranda" />
            <section className="bg-white">
                <div className="mx-auto grid min-h-[70vh] max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.1fr_.9fr] md:items-center">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase text-red-700">Buka setiap hari 10.00-21.00</p>
                        <h1 className="max-w-2xl text-4xl font-black leading-tight text-zinc-950 md:text-6xl">RM Kembar</h1>
                        <p className="mt-4 max-w-xl text-lg text-zinc-700">Pesan dari meja lewat QR, reservasi kedatangan, dan pantau status pesanan dari satu tempat.</p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link className="rounded-md bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800" href="/menu">Pesan Dine-In</Link>
                            <Link className="rounded-md border border-zinc-300 px-5 py-3 font-semibold hover:bg-zinc-100" href="/reservasi">Reservasi Meja</Link>
                        </div>
                        <dl className="mt-8 grid max-w-lg grid-cols-2 gap-3">
                            <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
                                <dt className="text-sm text-zinc-600">Meja kosong</dt>
                                <dd className="mt-1 text-3xl font-bold">{availableTables}/{totalTables}</dd>
                            </div>
                            <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
                                <dt className="text-sm text-zinc-600">WhatsApp</dt>
                                <dd className="mt-1 text-lg font-bold">0812-0000-0000</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="overflow-hidden rounded-md border border-zinc-200 bg-zinc-900">
                        <img className="h-full min-h-80 w-full object-cover opacity-90" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80" alt="Hidangan rumah makan" />
                    </div>
                </div>
            </section>
            <section className="mx-auto max-w-6xl px-4 py-10">
                <div className="mb-5 flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Menu tersedia</h2>
                        <p className="text-sm text-zinc-600">Stok dan ketersediaan mengikuti data admin.</p>
                    </div>
                    <Link className="text-sm font-semibold text-red-700" href="/menu">Lihat semua</Link>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredMenus.map((menu) => (
                        <article key={menu.id} className="rounded-md border border-zinc-200 bg-white p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase text-zinc-500">{menu.category?.name}</p>
                                    <h3 className="mt-1 font-bold">{menu.name}</h3>
                                </div>
                                <p className="font-bold text-red-700">{money(menu.price)}</p>
                            </div>
                            <p className="mt-2 text-sm text-zinc-600">{menu.description}</p>
                        </article>
                    ))}
                </div>
            </section>
        </AppLayout>
    );
}

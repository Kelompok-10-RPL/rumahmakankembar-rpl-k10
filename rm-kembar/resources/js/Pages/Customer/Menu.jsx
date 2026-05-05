import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout, { money } from '../../Layouts/AppLayout';

export default function Menu({ menus, categories, cart, selectedTable, filters }) {
    const items = Object.values(cart || {});
    const subtotal = items.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);

    function filter(e) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        router.get('/menu', Object.fromEntries(form.entries()), { preserveState: true });
    }

    return (
        <AppLayout>
            <Head title="Menu Dine-In" />
            <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
                <div>
                    <div className="mb-5">
                        <h1 className="text-3xl font-bold">Menu Dine-In</h1>
                        <p className="mt-1 text-sm text-zinc-600">
                            {selectedTable ? `Meja ${selectedTable.table_number} - Status ${selectedTable.status}` : 'Pilih menu, lalu meja akan dikunci saat checkout.'}
                        </p>
                    </div>
                    <form className="mb-5 grid gap-3 rounded-md border border-zinc-200 bg-white p-4 sm:grid-cols-[1fr_180px_auto]" onSubmit={filter}>
                        <input className="rounded-md border border-zinc-300 px-3 py-2" name="q" defaultValue={filters?.q || ''} placeholder="Cari menu" />
                        <select className="rounded-md border border-zinc-300 px-3 py-2" name="category" defaultValue={filters?.category || ''}>
                            <option value="">Semua kategori</option>
                            {categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}
                        </select>
                        <button className="rounded-md bg-zinc-900 px-4 py-2 font-semibold text-white">Filter</button>
                    </form>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {menus.map((menu) => <MenuCard key={menu.id} menu={menu} selectedTable={selectedTable} />)}
                    </div>
                </div>
                <aside className="h-fit rounded-md border border-zinc-200 bg-white p-4 lg:sticky lg:top-20">
                    <h2 className="text-xl font-bold">Keranjang</h2>
                    {items.length === 0 ? (
                        <p className="mt-3 text-sm text-zinc-600">Belum ada item.</p>
                    ) : (
                        <>
                            <div className="mt-4 space-y-3">
                                {items.map((item) => (
                                    <div key={item.menu_id} className="border-b border-zinc-100 pb-3">
                                        <div className="flex justify-between gap-3">
                                            <div>
                                                <p className="font-semibold">{item.name}</p>
                                                <p className="text-sm text-zinc-600">{item.qty} x {money(item.price)}</p>
                                                {item.notes && <p className="mt-1 text-xs text-zinc-500">{item.notes}</p>}
                                            </div>
                                            <Link method="delete" as="button" href={`/cart/items/${item.menu_id}`} className="text-sm font-semibold text-red-700">Hapus</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex justify-between font-bold">
                                <span>Subtotal</span>
                                <span>{money(subtotal)}</span>
                            </div>
                            <Link className="mt-4 block rounded-md bg-red-700 px-4 py-3 text-center font-semibold text-white hover:bg-red-800" href="/checkout">Checkout</Link>
                        </>
                    )}
                </aside>
            </section>
        </AppLayout>
    );
}

function MenuCard({ menu, selectedTable }) {
    const { data, setData, post, processing } = useForm({
        menu_id: menu.id,
        qty: 1,
        notes: '',
        table_id: selectedTable?.id || '',
    });
    const unavailable = !menu.is_available || Number(menu.stock) < 1;

    function submit(e) {
        e.preventDefault();
        post('/cart/items', { preserveScroll: true });
    }

    return (
        <article className="rounded-md border border-zinc-200 bg-white p-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase text-zinc-500">{menu.category?.name}</p>
                    <h2 className="mt-1 font-bold">{menu.name}</h2>
                    <p className="mt-2 text-sm text-zinc-600">{menu.description}</p>
                </div>
                <p className="whitespace-nowrap font-bold text-red-700">{money(menu.price)}</p>
            </div>
            <div className="mt-4 text-sm">
                <span className={unavailable ? 'text-red-700' : 'text-emerald-700'}>{unavailable ? 'Habis' : `Stok ${menu.stock}`}</span>
            </div>
            <form className="mt-3 grid gap-2" onSubmit={submit}>
                <div className="grid grid-cols-[88px_1fr] gap-2">
                    <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" min="1" max={Math.max(1, Number(menu.stock))} value={data.qty} onChange={(e) => setData('qty', e.target.value)} />
                    <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.notes} onChange={(e) => setData('notes', e.target.value)} placeholder="Catatan item" />
                </div>
                <button disabled={unavailable || processing} className="rounded-md bg-red-700 px-4 py-2 font-semibold text-white disabled:bg-zinc-300">Tambah</button>
            </form>
        </article>
    );
}

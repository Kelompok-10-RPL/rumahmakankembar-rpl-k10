import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { money } from '../../Layouts/AppLayout';

const blank = { category_id: '', name: '', description: '', price: '', stock: 0, low_stock_threshold: 5, sort_order: 0, is_available: true, is_for_dine_in: true, is_for_catering: true };

export default function Menu({ menus, categories }) {
    return (
        <AdminLayout>
            <Head title="Menu" />
            <h1 className="text-2xl font-bold">Manajemen Menu</h1>
            <MenuForm categories={categories} />
            <section className="mt-5 space-y-3">
                {menus.map((menu) => <MenuForm key={menu.id} menu={menu} categories={categories} />)}
            </section>
        </AdminLayout>
    );
}

function MenuForm({ menu, categories }) {
    const isEdit = Boolean(menu);
    const { data, setData, post, put, processing, reset } = useForm(isEdit ? {
        category_id: menu.category_id,
        name: menu.name,
        description: menu.description || '',
        price: menu.price,
        stock: menu.stock,
        low_stock_threshold: menu.low_stock_threshold || 5,
        sort_order: menu.sort_order || 0,
        is_available: menu.is_available,
        is_for_dine_in: menu.is_for_dine_in,
        is_for_catering: menu.is_for_catering,
    } : { ...blank, category_id: categories[0]?.id || '' });

    function submit(e) {
        e.preventDefault();
        isEdit ? put(`/admin/menu/${menu.id}`, { preserveScroll: true }) : post('/admin/menu', { preserveScroll: true, onSuccess: () => reset() });
    }

    return (
        <form className={`rounded-md border border-zinc-200 bg-white p-4 ${isEdit ? '' : 'mt-5'}`} onSubmit={submit}>
            <div className="mb-3 flex justify-between gap-3">
                <h2 className="font-bold">{isEdit ? menu.name : 'Tambah menu'}</h2>
                {isEdit && <span className="text-sm font-semibold text-red-700">{money(menu.price)}</span>}
            </div>
            <div className="grid gap-3 md:grid-cols-4">
                <select className="rounded-md border border-zinc-300 px-3 py-2" value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} required>
                    {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Nama menu" required />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" min="0" value={data.price} onChange={(e) => setData('price', e.target.value)} placeholder="Harga" required />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" min="0" value={data.stock} onChange={(e) => setData('stock', e.target.value)} placeholder="Stok" required />
                <textarea className="rounded-md border border-zinc-300 px-3 py-2 md:col-span-2" value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Deskripsi" />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" min="0" value={data.low_stock_threshold} onChange={(e) => setData('low_stock_threshold', e.target.value)} placeholder="Batas stok rendah" />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" value={data.sort_order} onChange={(e) => setData('sort_order', e.target.value)} placeholder="Urutan" />
                {['is_available', 'is_for_dine_in', 'is_for_catering'].map((key) => <label key={key} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(data[key])} onChange={(e) => setData(key, e.target.checked)} /> {key.replace('is_', '').replaceAll('_', ' ')}</label>)}
                <div className="flex gap-2 md:col-span-4">
                    <button disabled={processing} className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">{isEdit ? 'Update' : 'Simpan Menu'}</button>
                    {isEdit && <button type="button" onClick={() => router.delete(`/admin/menu/${menu.id}`, { preserveScroll: true })} className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700">Hapus</button>}
                </div>
            </div>
        </form>
    );
}

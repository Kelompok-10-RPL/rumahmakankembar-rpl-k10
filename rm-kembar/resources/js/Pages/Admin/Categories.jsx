import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Categories({ categories }) {
    return (
        <AdminLayout>
            <Head title="Kategori Menu" />
            <h1 className="text-2xl font-bold">Manajemen Kategori Menu</h1>
            <CategoryForm />
            <section className="mt-5 space-y-3">
                {categories.map((category) => <CategoryForm key={category.id} category={category} />)}
            </section>
        </AdminLayout>
    );
}

function CategoryForm({ category }) {
    const isEdit = Boolean(category);
    const { data, setData, post, put, processing, reset, errors } = useForm(isEdit ? {
        name: category.name,
        sort_order: category.sort_order || 0,
    } : { name: '', sort_order: 0 });

    function submit(e) {
        e.preventDefault();
        isEdit 
            ? put(`/admin/kategori/${category.id}`, { preserveScroll: true }) 
            : post('/admin/kategori', { preserveScroll: true, onSuccess: () => reset() });
    }

    return (
        <form className={`rounded-md border border-zinc-200 bg-white p-4 ${isEdit ? '' : 'mt-5'}`} onSubmit={submit}>
            <div className="mb-3 flex justify-between gap-3">
                <h2 className="font-bold">{isEdit ? category.name : 'Tambah Kategori'}</h2>
            </div>
            
            {errors.message && (
                <div className="mb-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">
                    {errors.message}
                </div>
            )}

            <div className="grid gap-3 md:grid-cols-[1fr_100px_auto]">
                <div>
                    <input className="w-full rounded-md border border-zinc-300 px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Nama Kategori" required />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>
                <div>
                    <input className="w-full rounded-md border border-zinc-300 px-3 py-2" type="number" value={data.sort_order} onChange={(e) => setData('sort_order', e.target.value)} placeholder="Urutan" />
                    {errors.sort_order && <p className="mt-1 text-xs text-red-600">{errors.sort_order}</p>}
                </div>
                
                <div className="flex gap-2">
                    <button disabled={processing} className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">
                        {isEdit ? 'Update' : 'Simpan'}
                    </button>
                    {isEdit && (
                        <button type="button" onClick={() => {
                            if (confirm('Yakin ingin menghapus kategori ini?')) {
                                router.delete(`/admin/kategori/${category.id}`, { preserveScroll: true });
                            }
                        }} className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">
                            Hapus
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}

import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Tables({ tables }) {
    const { data, setData, post, processing, reset } = useForm({ table_number: '', capacity: '', location_label: '', notes: '' });

    function submit(e) {
        e.preventDefault();
        post('/admin/stok-meja', { preserveScroll: true, onSuccess: () => reset() });
    }

    return (
        <AdminLayout>
            <Head title="Stok & Meja" />
            <h1 className="text-2xl font-bold">Manajemen Meja</h1>
            <form className="mt-5 grid gap-3 rounded-md border border-zinc-200 bg-white p-4 md:grid-cols-5" onSubmit={submit}>
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.table_number} onChange={(e) => setData('table_number', e.target.value)} placeholder="Nomor meja" required />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" min="1" value={data.capacity} onChange={(e) => setData('capacity', e.target.value)} placeholder="Kapasitas" required />
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.location_label} onChange={(e) => setData('location_label', e.target.value)} placeholder="Lokasi" />
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.notes} onChange={(e) => setData('notes', e.target.value)} placeholder="Catatan" />
                <button disabled={processing} className="rounded-md bg-red-700 px-4 py-2 font-semibold text-white">Tambah</button>
            </form>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {tables.map((table) => <TableCard key={table.id} table={table} />)}
            </div>
        </AdminLayout>
    );
}

function TableCard({ table }) {
    const { data, setData, put, processing } = useForm({
        capacity: table.capacity,
        status: table.status,
        location_label: table.location_label || '',
        notes: table.notes || '',
    });

    function submit(e) {
        e.preventDefault();
        put(`/admin/stok-meja/${table.id}`, { preserveScroll: true });
    }

    return (
        <form className="rounded-md border border-zinc-200 bg-white p-4" onSubmit={submit}>
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="font-bold">Meja {table.table_number}</h2>
                    <p className="text-sm text-zinc-600">{table.location_label}</p>
                </div>
                <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-semibold">{table.status}</span>
            </div>
            <div className="mt-3 grid gap-2">
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" min="1" value={data.capacity} onChange={(e) => setData('capacity', e.target.value)} />
                <select className="rounded-md border border-zinc-300 px-3 py-2" value={data.status} onChange={(e) => setData('status', e.target.value)}>
                    {['kosong', 'locked', 'terisi', 'reserved'].map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.location_label} onChange={(e) => setData('location_label', e.target.value)} />
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.notes} onChange={(e) => setData('notes', e.target.value)} />
            </div>
            <a className="mt-3 block break-all rounded-md bg-zinc-50 p-2 text-xs font-semibold text-red-700" href={table.order_url} target="_blank" rel="noreferrer">
                {table.order_url}
            </a>
            <div className="mt-4 flex flex-col items-center border border-dashed border-zinc-300 p-4 rounded-md bg-zinc-50">
                <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(table.order_url)}`} 
                    alt={`QR Code Meja ${table.table_number}`}
                    className="w-32 h-32 mb-2"
                    crossOrigin="anonymous"
                />
                <button 
                    type="button" 
                    onClick={() => {
                        fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(table.order_url)}`)
                            .then(res => res.blob())
                            .then(blob => {
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.style.display = 'none';
                                a.href = url;
                                a.download = `QR_Meja_${table.table_number}.png`;
                                document.body.appendChild(a);
                                a.click();
                                window.URL.revokeObjectURL(url);
                            })
                            .catch(err => alert("Gagal mengunduh QR code"));
                    }}
                    className="text-xs font-semibold text-zinc-600 hover:text-red-700 underline"
                >
                    Download QR Code
                </button>
            </div>
            <button disabled={processing} className="mt-3 w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800">Update Meja</button>
        </form>
    );
}

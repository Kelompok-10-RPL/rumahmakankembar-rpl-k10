import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Create({ availableTables }) {
    const user = usePage().props.auth?.user;
    const { data, setData, post, processing } = useForm({
        name: '',
        phone: '',
        reserved_date: '',
        reserved_time: '',
        guest_count: 1,
        notes: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/reservasi');
    }

    return (
        <AppLayout>
            <Head title="Reservasi" />
            <section className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[1fr_320px]">
                <form className="rounded-md border border-zinc-200 bg-white p-5" onSubmit={submit}>
                    <h1 className="text-2xl font-bold">Reservasi Meja</h1>
                    <p className="mt-1 text-sm text-zinc-600">Admin mengonfirmasi meja saat kedatangan. Reservasi otomatis batal 30 menit setelah jadwal jika belum hadir.</p>
                    {!user && (
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <label className="block text-sm font-medium">Nama
                                <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                            </label>
                            <label className="block text-sm font-medium">Nomor WhatsApp
                                <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" value={data.phone} onChange={(e) => setData('phone', e.target.value)} required />
                            </label>
                        </div>
                    )}
                    <div className="mt-5 grid gap-4 sm:grid-cols-3">
                        <label className="block text-sm font-medium">Tanggal
                            <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="date" value={data.reserved_date} onChange={(e) => setData('reserved_date', e.target.value)} required />
                        </label>
                        <label className="block text-sm font-medium">Jam
                            <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="time" value={data.reserved_time} onChange={(e) => setData('reserved_time', e.target.value)} required />
                        </label>
                        <label className="block text-sm font-medium">Tamu
                            <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="number" min="1" value={data.guest_count} onChange={(e) => setData('guest_count', e.target.value)} required />
                        </label>
                    </div>
                    <label className="mt-4 block text-sm font-medium">Catatan
                        <textarea className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" rows="3" value={data.notes} onChange={(e) => setData('notes', e.target.value)} />
                    </label>
                    <button disabled={processing} className="mt-5 rounded-md bg-red-700 px-4 py-3 font-semibold text-white hover:bg-red-800 disabled:bg-zinc-400">Buat Reservasi</button>
                </form>
                <aside className="h-fit rounded-md border border-zinc-200 bg-white p-5">
                    <h2 className="font-bold">Meja kosong saat ini</h2>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                        {availableTables.map((table) => (
                            <div key={table.id} className="rounded-md border border-zinc-200 p-3 text-sm">
                                <p className="font-bold">Meja {table.table_number}</p>
                                <p className="text-zinc-600">{table.capacity} kursi</p>
                            </div>
                        ))}
                    </div>
                </aside>
            </section>
        </AppLayout>
    );
}

import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Reservations({ reservations, tables }) {
    return (
        <AdminLayout>
            <Head title="Manajemen Reservasi" />
            <h1 className="text-2xl font-bold">Manajemen Reservasi</h1>
            
            <div className="mt-5 grid gap-4">
                {reservations.length === 0 ? (
                    <div className="rounded-md border border-zinc-200 bg-white p-6 text-center text-zinc-500">
                        Belum ada reservasi.
                    </div>
                ) : (
                    reservations.map((reservation) => (
                        <ReservationCard key={reservation.id} reservation={reservation} tables={tables} />
                    ))
                )}
            </div>
        </AdminLayout>
    );
}

function ReservationCard({ reservation, tables }) {
    const { data, setData, put, processing } = useForm({
        status: reservation.status,
        table_id: reservation.table_id || '',
    });

    function submit(e) {
        e.preventDefault();
        put(`/admin/reservasi/${reservation.id}`, { preserveScroll: true });
    }

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-blue-100 text-blue-800',
        completed: 'bg-emerald-100 text-emerald-800',
        cancelled: 'bg-red-100 text-red-800',
    };

    return (
        <form className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm" onSubmit={submit}>
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-100 pb-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold">Reservasi #{reservation.id}</h2>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${statusColors[reservation.status] || 'bg-zinc-100'}`}>
                            {reservation.status}
                        </span>
                    </div>
                    <p className="mt-1 font-medium text-zinc-800">{reservation.user?.name} ({reservation.user?.phone})</p>
                    <p className="text-sm text-zinc-600">Waktu: {new Date(reservation.reservation_time).toLocaleString('id-ID')}</p>
                    <p className="text-sm text-zinc-600">Pax: {reservation.guest_count} orang</p>
                </div>
            </div>
            
            <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-semibold text-zinc-700">Tugaskan Meja</label>
                    <select 
                        className="w-full rounded-md border border-zinc-300 px-3 py-2 disabled:bg-zinc-100" 
                        value={data.table_id} 
                        onChange={(e) => setData('table_id', e.target.value)}
                        disabled={reservation.status === 'cancelled' || reservation.status === 'completed'}
                    >
                        <option value="">-- Belum ada meja --</option>
                        {tables.map(table => (
                            <option key={table.id} value={table.id}>
                                Meja {table.table_number} ({table.capacity} pax) - {table.location_label}
                            </option>
                        ))}
                        {reservation.table && !tables.find(t => t.id === reservation.table_id) && (
                            <option value={reservation.table_id}>Meja {reservation.table.table_number} (Saat ini)</option>
                        )}
                    </select>
                </div>
                <div>
                    <label className="mb-1 block text-sm font-semibold text-zinc-700">Status</label>
                    <select 
                        className="w-full rounded-md border border-zinc-300 px-3 py-2 disabled:bg-zinc-100" 
                        value={data.status} 
                        onChange={(e) => setData('status', e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {reservation.notes && (
                <div className="mt-4 rounded-md bg-zinc-50 p-3 text-sm text-zinc-700 border border-zinc-200">
                    <strong>Catatan:</strong> {reservation.notes}
                </div>
            )}

            <div className="mt-4 flex justify-end">
                <button 
                    type="submit" 
                    disabled={processing} 
                    className="rounded-md bg-zinc-900 px-6 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:bg-zinc-400"
                >
                    Update Reservasi
                </button>
            </div>
        </form>
    );
}

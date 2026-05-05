import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { money, statusText } from '../../Layouts/AppLayout';

export default function Orders({ orders, filters }) {
    function transition(order, action) {
        router.post(`/admin/pesanan/${order.id}/${action}`, action === 'cancel' ? { cancellation_reason: 'Dibatalkan admin' } : {}, { preserveScroll: true });
    }

    return (
        <AdminLayout>
            <Head title="Pesanan" />
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">Pesanan</h1>
                <select className="rounded-md border border-zinc-300 px-3 py-2 text-sm" value={filters?.status || ''} onChange={(e) => router.get('/admin/pesanan', { status: e.target.value }, { preserveState: true })}>
                    <option value="">Semua status</option>
                    {['pending', 'paid_waiting', 'on_site', 'preparing', 'completed', 'cancelled'].map((status) => <option key={status} value={status}>{statusText(status)}</option>)}
                </select>
            </div>
            <div className="mt-5 space-y-4">
                {orders.data.map((order) => (
                    <article key={order.id} className="rounded-md border border-zinc-200 bg-white p-4">
                        <div className="flex flex-wrap justify-between gap-3">
                            <div>
                                <h2 className="font-bold text-red-700">{order.unique_code}</h2>
                                <p className="text-sm text-zinc-600">{order.user?.name} - Meja {order.table?.table_number || '-'} - {statusText(order.status)}</p>
                            </div>
                            <p className="font-bold">{money(order.total_price)}</p>
                        </div>
                        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                            {order.items.map((item) => <div key={item.id} className="rounded-md bg-zinc-50 p-3"><p className="font-semibold">{item.qty} x {item.menu_name}</p>{item.notes && <p className="text-zinc-600">{item.notes}</p>}</div>)}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {Object.entries({ paid: 'Validasi Bayar', arrive: 'Tiba', prepare: 'Masak', complete: 'Selesai' }).map(([action, label]) => (
                                <button key={action} onClick={() => transition(order, action)} className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-700">{label}</button>
                            ))}
                            <button onClick={() => transition(order, 'cancel')} className="rounded-md border border-red-300 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">Batal</button>
                        </div>
                    </article>
                ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
                {orders.links?.map((link, index) => (
                    <Link key={index} href={link.url || '#'} preserveScroll className={`rounded-md border px-3 py-2 text-sm ${link.active ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                ))}
            </div>
        </AdminLayout>
    );
}

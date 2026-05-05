import { Head, Link } from '@inertiajs/react';
import AppLayout, { money, statusText } from '../../Layouts/AppLayout';

export default function History({ orders }) {
    return (
        <AppLayout>
            <Head title="Riwayat Pesanan" />
            <section className="mx-auto max-w-5xl px-4 py-8">
                <h1 className="text-3xl font-bold">Riwayat Pesanan</h1>
                <div className="mt-5 space-y-3">
                    {orders.data.length === 0 ? (
                        <p className="rounded-md border border-zinc-200 bg-white p-4 text-zinc-600">Belum ada pesanan.</p>
                    ) : orders.data.map((order) => (
                        <article key={order.id} className="rounded-md border border-zinc-200 bg-white p-4">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <Link className="font-bold text-red-700" href={`/order/confirm/${order.unique_code}`}>{order.unique_code}</Link>
                                    <p className="text-sm text-zinc-600">{statusText(order.status)}</p>
                                </div>
                                <p className="font-bold">{money(order.total_price)}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </AppLayout>
    );
}

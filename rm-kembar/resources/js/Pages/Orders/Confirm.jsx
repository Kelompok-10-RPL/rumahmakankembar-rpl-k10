import { Head } from '@inertiajs/react';
import AppLayout, { money, statusText } from '../../Layouts/AppLayout';

export default function Confirm({ order }) {
    return (
        <AppLayout>
            <Head title="Konfirmasi Pesanan" />
            <section className="mx-auto max-w-3xl px-4 py-10">
                <div className="rounded-md border border-zinc-200 bg-white p-6">
                    <p className="text-sm font-semibold uppercase text-emerald-700">Pesanan dibuat</p>
                    <h1 className="mt-2 text-3xl font-bold">{order.unique_code}</h1>
                    <p className="mt-2 text-zinc-600">Tunjukkan kode ini ke kasir untuk validasi pembayaran dan kedatangan.</p>
                    <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-md bg-zinc-50 p-4"><dt className="text-sm text-zinc-600">Status</dt><dd className="font-bold">{statusText(order.status)}</dd></div>
                        <div className="rounded-md bg-zinc-50 p-4"><dt className="text-sm text-zinc-600">Pembayaran</dt><dd className="font-bold">{order.payment_status}</dd></div>
                        <div className="rounded-md bg-zinc-50 p-4"><dt className="text-sm text-zinc-600">Meja</dt><dd className="font-bold">{order.table?.table_number || '-'}</dd></div>
                        <div className="rounded-md bg-zinc-50 p-4"><dt className="text-sm text-zinc-600">Total</dt><dd className="font-bold">{money(order.total_price)}</dd></div>
                    </dl>
                    <div className="mt-6">
                        <h2 className="font-bold">Item</h2>
                        <div className="mt-3 space-y-2">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between gap-3 text-sm">
                                    <span>{item.qty} x {item.menu_name}</span>
                                    <span>{money(item.subtotal)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}

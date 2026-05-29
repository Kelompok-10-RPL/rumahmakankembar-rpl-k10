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
                    {order.payment_status === 'unpaid' && order.snap_token && (
                        <div className="mt-8 text-center border-t border-zinc-200 pt-6">
                            <button
                                onClick={() => {
                                    if (window.snap) {
                                        window.snap.pay(order.snap_token, {
                                            onSuccess: function(result){
                                                window.location.reload();
                                            },
                                            onPending: function(result){
                                                window.location.reload();
                                            },
                                            onError: function(result){
                                                alert("Pembayaran gagal atau dibatalkan.");
                                            }
                                        });
                                    } else {
                                        alert("Payment gateway is loading, please try again in a moment.");
                                    }
                                }}
                                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition"
                            >
                                Bayar Sekarang
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}

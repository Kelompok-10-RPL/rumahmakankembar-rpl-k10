import { useEffect, useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import AppLayout, { money, statusText } from '../../Layouts/AppLayout';
import { Star } from 'lucide-react';

// Poll every 5 seconds while order is still in-progress
const POLL_INTERVAL_MS = 5000;
const TERMINAL_STATUSES = ['completed', 'cancelled'];

export default function Confirm({ order }) {
    const { auth } = usePage().props;
    const [showRating, setShowRating] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        stars: 5,
        comment: '',
    });

    // --- Polling: reload only order data until status is terminal ---
    useEffect(() => {
        if (TERMINAL_STATUSES.includes(order.status)) return;

        const id = setInterval(() => {
            router.reload({ only: ['order'], preserveScroll: true });
        }, POLL_INTERVAL_MS);

        return () => clearInterval(id);
    }, [order.status]);

    const submitRating = (e) => {
        e.preventDefault();
        post(`/akun/pesanan/${order.id}/rating`, {
            preserveScroll: true,
            onSuccess: () => {
                setShowRating(false);
                reset();
                router.reload({ only: ['order'], preserveScroll: true });
            },
        });
    };

    const isCompleted  = order.status === 'completed';
    const canRate      = isCompleted && auth?.user && !order.rating;

    return (
        <AppLayout>
            <Head title="Konfirmasi Pesanan" />
            <section className="mx-auto max-w-3xl px-4 py-10">
                <div className="rounded-md border border-zinc-200 bg-white p-6">
                    <p className="text-sm font-semibold uppercase text-emerald-700">Pesanan dibuat</p>
                    <h1 className="mt-2 text-3xl font-bold">{order.unique_code}</h1>
                    <p className="mt-2 text-zinc-600">Tunjukkan kode ini ke kasir untuk validasi pembayaran dan kedatangan.</p>

                    <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-md bg-zinc-50 p-4">
                            <dt className="text-sm text-zinc-600">Status</dt>
                            <dd className="font-bold">{statusText(order.status)}</dd>
                        </div>
                        <div className="rounded-md bg-zinc-50 p-4">
                            <dt className="text-sm text-zinc-600">Pembayaran</dt>
                            <dd className="font-bold capitalize">{order.payment_status}</dd>
                        </div>
                        <div className="rounded-md bg-zinc-50 p-4">
                            <dt className="text-sm text-zinc-600">Meja</dt>
                            <dd className="font-bold">{order.table?.table_number || '-'}</dd>
                        </div>
                        <div className="rounded-md bg-zinc-50 p-4">
                            <dt className="text-sm text-zinc-600">Total</dt>
                            <dd className="font-bold">{money(order.total_price)}</dd>
                        </div>
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

                    {/* Live polling indicator — shown while waiting */}
                    {!TERMINAL_STATUSES.includes(order.status) && (
                        <p className="mt-6 flex items-center gap-2 text-sm text-zinc-400">
                            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                            Memperbarui status secara otomatis…
                        </p>
                    )}

                    {/* Pay Now button — only when unpaid */}
                    {order.payment_status === 'unpaid' && order.snap_token && (
                        <div className="mt-8 border-t border-zinc-200 pt-6 flex flex-col items-center">
                            <button
                                onClick={() => {
                                    if (window.snap) {
                                        window.snap.pay(order.snap_token, {
                                            onSuccess: () => window.location.reload(),
                                            onPending: () => window.location.reload(),
                                            onError:   () => alert('Pembayaran gagal atau dibatalkan.'),
                                        });
                                    } else {
                                        alert('Payment gateway is loading, please try again in a moment.');
                                    }
                                }}
                                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition"
                            >
                                Bayar Sekarang
                            </button>
                        </div>
                    )}

                    {/* Rating section — only when completed and not yet rated */}
                    {isCompleted && (
                        <div className="mt-8 border-t border-zinc-200 pt-6">
                            {order.rating ? (
                                /* Already rated — show stars */
                                <div>
                                    <p className="text-sm font-semibold text-zinc-600 mb-2">Ulasan Anda</p>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={20}
                                                className={i < order.rating.stars ? 'fill-current' : 'text-zinc-300'}
                                            />
                                        ))}
                                        <span className="ml-2 text-sm text-zinc-500">{order.rating.comment}</span>
                                    </div>
                                </div>
                            ) : canRate ? (
                                /* Not yet rated — show button / form */
                                showRating ? (
                                    <form onSubmit={submitRating}>
                                        <h3 className="font-bold mb-3">Beri Ulasan Pesanan</h3>
                                        {errors.rating && <p className="text-red-600 text-sm mb-2">{errors.rating}</p>}
                                        <div className="flex gap-2 mb-3">
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => setData('stars', num)}
                                                    className={`${data.stars >= num ? 'text-yellow-500' : 'text-zinc-300'} hover:scale-110 transition-transform`}
                                                >
                                                    <Star size={28} className={data.stars >= num ? 'fill-current' : ''} />
                                                </button>
                                            ))}
                                        </div>
                                        <textarea
                                            className="w-full rounded-md border border-zinc-300 p-2 text-sm focus:border-red-500 focus:ring-red-500 mb-3"
                                            placeholder="Tulis ulasan Anda (opsional)..."
                                            rows={3}
                                            value={data.comment}
                                            onChange={(e) => setData('comment', e.target.value)}
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="rounded-md bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800 disabled:opacity-60"
                                            >
                                                Kirim Ulasan
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => { setShowRating(false); reset(); }}
                                                className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <button
                                        onClick={() => setShowRating(true)}
                                        className="flex items-center gap-2 rounded-md border border-yellow-500 bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700 hover:bg-yellow-100"
                                    >
                                        <Star size={16} /> Beri Ulasan
                                    </button>
                                )
                            ) : !auth?.user ? (
                                <p className="text-sm text-zinc-400">Login untuk memberi ulasan.</p>
                            ) : null}
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}

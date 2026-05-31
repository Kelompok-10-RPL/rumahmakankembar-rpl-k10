import { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout, { money, statusText } from '../../Layouts/AppLayout';
import { Star } from 'lucide-react';

export default function History({ orders }) {
    const [ratingOrder, setRatingOrder] = useState(null);
    const { data, setData, post, processing, reset, errors } = useForm({
        stars: 5,
        comment: '',
    });

    const submitRating = (e) => {
        e.preventDefault();
        post(`/akun/pesanan/${ratingOrder.id}/rating`, {
            preserveScroll: true,
            onSuccess: () => {
                setRatingOrder(null);
                reset();
            }
        });
    };

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
                            <div className="text-right">
                                <p className="font-bold">{money(order.total_price)}</p>
                                {order.status === 'pending' && order.payment_status !== 'paid' && (
                                    <button
                                        className="mt-2 rounded-md border border-red-300 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50"
                                        onClick={() => router.post(`/akun/pesanan/${order.id}/cancel`, {}, { preserveScroll: true })}
                                    >
                                        Batalkan
                                    </button>
                                )}
                                {order.status === 'completed' && !order.rating && (
                                    <button
                                        className="mt-2 rounded-md border border-yellow-500 bg-yellow-50 px-3 py-1.5 text-sm font-semibold text-yellow-700 hover:bg-yellow-100 flex items-center gap-1"
                                        onClick={() => setRatingOrder(order)}
                                    >
                                        <Star size={16} /> Beri Ulasan
                                    </button>
                                )}
                                {order.rating && (
                                    <div className="mt-2 flex items-center justify-end gap-1 text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} className={i < order.rating.stars ? 'fill-current' : 'text-zinc-300'} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Rating Form Inline */}
                        {ratingOrder?.id === order.id && (
                            <form onSubmit={submitRating} className="mt-4 border-t border-zinc-100 pt-4">
                                <h4 className="font-bold mb-2">Beri Ulasan Pesanan</h4>
                                {errors.rating && <p className="text-red-600 text-sm mb-2">{errors.rating}</p>}
                                <div className="mb-3 flex gap-2">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => setData('stars', num)}
                                            className={`${data.stars >= num ? 'text-yellow-500 fill-current' : 'text-zinc-300'} hover:scale-110 transition-transform`}
                                        >
                                            <Star size={24} className={data.stars >= num ? 'fill-current' : ''} />
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    className="w-full rounded-md border border-zinc-300 p-2 text-sm focus:border-red-500 focus:ring-red-500 mb-2"
                                    placeholder="Tulis ulasan Anda (opsional)..."
                                    value={data.comment}
                                    onChange={e => setData('comment', e.target.value)}
                                ></textarea>
                                <div className="flex gap-2">
                                    <button type="submit" disabled={processing} className="rounded-md bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800">Kirim</button>
                                    <button type="button" onClick={() => { setRatingOrder(null); reset(); }} className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold hover:bg-zinc-50">Batal</button>
                                </div>
                            </form>
                        )}
                    </article>
                ))}
                </div>
            </section>
        </AppLayout>
    );
}

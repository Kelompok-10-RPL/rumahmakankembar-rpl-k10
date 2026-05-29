import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout, { money } from '../../Layouts/AppLayout';

export default function Checkout({ cart, subtotal, taxRate, taxAmount, total, table, paymentMethods }) {
    const user = usePage().props.auth?.user;
    const items = Object.values(cart || {});
    const { data, setData, post, processing } = useForm({
        name: '',
        phone: '',
        email: '',
        address: '',
        payment_method: Object.keys(paymentMethods || {})[0] || 'cash',
        notes: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/checkout');
    }

    return (
        <AppLayout>
            <Head title="Checkout" />
            <section className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
                <form className="rounded-md border border-zinc-200 bg-white p-5" onSubmit={submit}>
                    <h1 className="text-2xl font-bold">Checkout</h1>
                    {table && <p className="mt-1 text-sm text-zinc-600">Meja {table.table_number} akan dikunci setelah pesanan dibuat.</p>}
                    {!user && (
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <label className="block text-sm font-medium">Nama
                                <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} required minLength="3" maxLength="100" pattern="^[a-zA-Z\s\.\,\'\-]+$" title="Nama hanya boleh berisi huruf dan spasi." />
                            </label>
                            <label className="block text-sm font-medium">Nomor WhatsApp
                                <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} required minLength="9" maxLength="20" pattern="^\+?[0-9\s\-\(\)]+$" title="Nomor telepon hanya boleh berisi angka, spasi, atau karakter +-()" />
                            </label>
                            <label className="block text-sm font-medium">Email
                                <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            </label>
                            <label className="block text-sm font-medium sm:col-span-2">Alamat
                                <textarea className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" rows="3" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                            </label>
                        </div>
                    )}
                    <div className="mt-5 grid gap-4">
                        <label className="block text-sm font-medium">Metode pembayaran
                            <select className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" value={data.payment_method} onChange={(e) => setData('payment_method', e.target.value)} required>
                                {Object.entries(paymentMethods || {}).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                            </select>
                        </label>
                        <label className="block text-sm font-medium">Catatan pesanan
                            <textarea className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" rows="3" value={data.notes} onChange={(e) => setData('notes', e.target.value)} />
                        </label>
                    </div>
                    <button disabled={processing} className="mt-5 w-full rounded-md bg-red-700 px-4 py-3 font-semibold text-white hover:bg-red-800 disabled:bg-zinc-400">Buat Pesanan</button>
                </form>
                <aside className="h-fit rounded-md border border-zinc-200 bg-white p-5">
                    <h2 className="text-xl font-bold">Ringkasan</h2>
                    <div className="mt-4 space-y-3">
                        {items.map((item) => (
                            <div key={item.menu_id} className="flex justify-between gap-3 text-sm">
                                <span>{item.qty} x {item.name}</span>
                                <span>{money(Number(item.qty) * Number(item.price))}</span>
                            </div>
                        ))}
                    </div>
                    <dl className="mt-4 space-y-2 border-t border-zinc-200 pt-4 text-sm">
                        <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
                        <div className="flex justify-between"><dt>PPN {Number(taxRate) * 100}%</dt><dd>{money(taxAmount)}</dd></div>
                        <div className="flex justify-between text-lg font-bold"><dt>Total</dt><dd>{money(total)}</dd></div>
                    </dl>
                </aside>
            </section>
        </AppLayout>
    );
}

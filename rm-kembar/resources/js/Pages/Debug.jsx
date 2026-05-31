import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Debug({ routes }) {
    const { flash, errors } = usePage().props;
    const { data, setData, post: postWA, processing: waProcessing } = useForm({
        phone: '6281234567890',
        message: 'Tes Notifikasi WA dari Debug Page!'
    });

    const { post: postReservation, processing: resProcessing } = useForm();
    const { post: postOrder, processing: orderProcessing } = useForm();

    return (
        <AppLayout>
            <Head title="Debug Panel" />
            <div className="mx-auto max-w-4xl px-4 py-8">
                <h1 className="text-3xl font-black mb-6">RM Kembar Debug Panel</h1>
                
                {(flash?.status || Object.keys(errors || {}).length > 0) && (
                    <div className="mb-6">
                        {flash?.status && <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">{flash.status}</div>}
                        {Object.keys(errors || {}).length > 0 && <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-900">{Object.values(errors)[0]}</div>}
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                    
                    {/* WhatsApp Feature */}
                    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-4">1. Test WhatsApp API</h2>
                        <form onSubmit={(e) => { e.preventDefault(); postWA('/debug/wa'); }} className="grid gap-3">
                            <div>
                                <label className="text-xs font-semibold text-zinc-600">Nomor (62...)</label>
                                <input className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" value={data.phone} onChange={e => setData('phone', e.target.value)} required />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-zinc-600">Pesan</label>
                                <textarea className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" value={data.message} onChange={e => setData('message', e.target.value)} required />
                            </div>
                            <button disabled={waProcessing} className="w-full rounded-md bg-zinc-900 px-4 py-2 font-bold text-white hover:bg-zinc-800">
                                Send WA Notification
                            </button>
                        </form>
                    </section>

                    {/* Quick Data Seeding */}
                    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-4">2. Seed Dummy Data</h2>
                        <div className="grid gap-3">
                            <button 
                                disabled={resProcessing}
                                onClick={() => postReservation('/debug/reservation')}
                                className="w-full rounded-md border border-zinc-300 bg-zinc-50 px-4 py-3 font-semibold hover:bg-zinc-100"
                            >
                                Seed Dummy Reservation 📅
                            </button>
                            <p className="text-xs text-zinc-500 mb-2">Makes a pending reservation you can confirm in Admin.</p>

                            <button 
                                disabled={orderProcessing}
                                onClick={() => postOrder('/debug/order')}
                                className="w-full rounded-md border border-zinc-300 bg-zinc-50 px-4 py-3 font-semibold hover:bg-zinc-100"
                            >
                                Seed Paid Order 🍔
                            </button>
                            <p className="text-xs text-zinc-500">Makes a paid order that should instantly trigger Kitchen WebSockets.</p>
                        </div>
                    </section>

                    {/* Quick Admin Links */}
                    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm md:col-span-2">
                        <h2 className="text-xl font-bold mb-4">3. Quick Links to New Features</h2>
                        <div className="flex flex-wrap gap-3">
                            <Link href={routes.admin_menu} className="rounded-md bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800">Admin Menu (Image Upload)</Link>
                            <Link href={routes.admin_categories} className="rounded-md bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800">Admin Categories (CRUD)</Link>
                            <Link href={routes.admin_reservations} className="rounded-md bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800">Admin Reservations</Link>
                            <Link href={routes.kitchen} className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-bold text-zinc-900 hover:bg-yellow-500">Kitchen Display</Link>
                        </div>
                    </section>

                </div>
            </div>
        </AppLayout>
    );
}

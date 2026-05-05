import { Head } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { money, statusText } from '../../Layouts/AppLayout';

export default function Dashboard({ ordersToday, revenueToday, activeOrders, occupiedTables, lowStockMenus, recentOrders }) {
    return (
        <AdminLayout>
            <Head title="Dashboard Admin" />
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <Stat label="Pesanan hari ini" value={ordersToday} />
                <Stat label="Revenue hari ini" value={money(revenueToday)} />
                <Stat label="Pesanan aktif" value={activeOrders} />
                <Stat label="Meja dipakai" value={occupiedTables} />
            </div>
            <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_360px]">
                <section className="rounded-md border border-zinc-200 bg-white">
                    <div className="border-b border-zinc-200 p-4"><h2 className="font-bold">Pesanan terbaru</h2></div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-50 text-zinc-600"><tr><th className="p-3">Kode</th><th className="p-3">Customer</th><th className="p-3">Meja</th><th className="p-3">Status</th><th className="p-3 text-right">Total</th></tr></thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-t border-zinc-100">
                                        <td className="p-3 font-semibold text-red-700">{order.unique_code}</td>
                                        <td className="p-3">{order.user?.name}</td>
                                        <td className="p-3">{order.table?.table_number || '-'}</td>
                                        <td className="p-3">{statusText(order.status)}</td>
                                        <td className="p-3 text-right">{money(order.total_price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                <section className="rounded-md border border-zinc-200 bg-white p-4">
                    <h2 className="font-bold">Stok rendah</h2>
                    <div className="mt-3 space-y-2">
                        {lowStockMenus.length === 0 ? <p className="text-sm text-zinc-600">Stok aman.</p> : lowStockMenus.map((menu) => (
                            <div key={menu.id} className="flex justify-between rounded-md bg-zinc-50 p-3 text-sm"><span>{menu.name}</span><span className="font-bold">{menu.stock}</span></div>
                        ))}
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}

function Stat({ label, value }) {
    return <div className="rounded-md border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-600">{label}</p><p className="mt-1 text-3xl font-bold">{value}</p></div>;
}

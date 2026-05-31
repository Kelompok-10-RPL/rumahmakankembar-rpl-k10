import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { statusText } from '../../Layouts/AppLayout';

export default function Index({ orders }) {
    useEffect(() => {
        let channel;
        if (window.Echo) {
            channel = window.Echo.channel('kitchen.orders')
                .listen('KitchenOrderUpdated', (e) => {
                    router.reload({ only: ['orders'] });
                });
        }
        
        // Fallback polling (every 15s just in case WS drops)
        const id = window.setInterval(() => router.reload({ only: ['orders'] }), 15000);
        
        return () => {
            window.clearInterval(id);
            if (channel) {
                window.Echo.leaveChannel('kitchen.orders');
            }
        };
    }, []);

    return (
        <AdminLayout>
            <Head title="Kitchen Display" />
            <h1 className="text-2xl font-bold">Kitchen Display</h1>
            <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {orders.length === 0 ? (
                    <p className="rounded-md border border-zinc-200 bg-white p-4 text-zinc-600">Belum ada pesanan aktif untuk dapur.</p>
                ) : orders.map((order) => (
                    <article key={order.id} className="rounded-md border border-zinc-200 bg-white p-4">
                        <div className="flex justify-between gap-3">
                            <div>
                                <h2 className="font-bold text-red-700">{order.unique_code}</h2>
                                <p className="text-sm text-zinc-600">Meja {order.table?.table_number || '-'} - {statusText(order.status)}</p>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            {order.items.map((item) => (
                                <div key={item.id} className="rounded-md bg-zinc-50 p-3">
                                    <p className="font-semibold">{item.qty} x {item.menu_name}</p>
                                    {item.notes && <p className="text-sm text-zinc-600">{item.notes}</p>}
                                </div>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </AdminLayout>
    );
}

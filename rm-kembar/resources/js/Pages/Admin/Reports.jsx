import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { money } from '../../Layouts/AppLayout';

export default function Reports({ filters, summary, dailyRevenue, categoryRevenue }) {
    function filter(e) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        router.get('/admin/laporan', Object.fromEntries(form.entries()), { preserveState: true });
    }

    const exportUrl = `/admin/laporan/export?from=${filters.from}&to=${filters.to}`;

    return (
        <AdminLayout>
            <Head title="Laporan" />
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">Laporan Penjualan</h1>
                <div className="flex gap-2">
                    <a className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700" href={`${exportUrl}&type=excel`}>Export Excel</a>
                    <a className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700" href={`${exportUrl}&type=pdf`}>Export PDF</a>
                </div>
            </div>
            <form className="mt-5 grid gap-3 rounded-md border border-zinc-200 bg-white p-4 sm:grid-cols-[1fr_1fr_auto]" onSubmit={filter}>
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="date" name="from" defaultValue={filters.from} />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="date" name="to" defaultValue={filters.to} />
                <button className="rounded-md bg-red-700 px-4 py-2 font-semibold text-white">Filter</button>
            </form>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Stat label="Transaksi paid" value={summary.orders} />
                <Stat label="Revenue" value={money(summary.revenue)} />
                <Stat label="Rata-rata transaksi" value={money(summary.averageOrderValue)} />
            </div>
            <div className="mt-6 grid gap-5 xl:grid-cols-2">
                <ReportTable title="Revenue harian" rows={dailyRevenue} columns={[['date', 'Tanggal'], ['orders', 'Transaksi'], ['revenue', 'Revenue']]} />
                <ReportTable title="Revenue kategori" rows={categoryRevenue} columns={[['category', 'Kategori'], ['qty', 'Qty'], ['revenue', 'Revenue']]} />
            </div>
        </AdminLayout>
    );
}

function Stat({ label, value }) {
    return <div className="rounded-md border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-600">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>;
}

function ReportTable({ title, rows, columns }) {
    return (
        <section className="rounded-md border border-zinc-200 bg-white">
            <div className="border-b border-zinc-200 p-4"><h2 className="font-bold">{title}</h2></div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 text-zinc-600">
                        <tr>{columns.map(([, label]) => <th key={label} className="p-3">{label}</th>)}</tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr><td className="p-3 text-zinc-600" colSpan={columns.length}>Belum ada data.</td></tr>
                        ) : rows.map((row, index) => (
                            <tr key={index} className="border-t border-zinc-100">
                                {columns.map(([key]) => <td key={key} className="p-3">{key === 'revenue' ? money(row[key]) : row[key]}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

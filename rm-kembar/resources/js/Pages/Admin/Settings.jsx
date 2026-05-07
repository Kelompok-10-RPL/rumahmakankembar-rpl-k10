import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Settings({ settings }) {
    const initial = Object.values(settings || {}).flat().reduce((values, setting) => ({ ...values, [setting.key]: setting.value }), {});
    const { data, setData, put, processing } = useForm({ settings: initial });

    function submit(e) {
        e.preventDefault();
        put('/admin/pengaturan', { preserveScroll: true });
    }

    return (
        <AdminLayout>
            <Head title="Pengaturan" />
            <h1 className="text-2xl font-bold">Pengaturan Sistem</h1>
            <form className="mt-5 space-y-5" onSubmit={submit}>
                {Object.entries(settings || {}).map(([group, groupSettings]) => (
                    <section key={group || 'general'} className="rounded-md border border-zinc-200 bg-white p-4">
                        <h2 className="font-bold capitalize">{group || 'general'}</h2>
                        <div className="mt-3 grid gap-3 md:grid-cols-2">
                            {groupSettings.map((setting) => (
                                <label key={setting.key} className="block text-sm font-medium">
                                    {setting.label}
                                    <input
                                        className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
                                        value={data.settings?.[setting.key] ?? ''}
                                        onChange={(e) => setData('settings', { ...data.settings, [setting.key]: e.target.value })}
                                    />
                                    <span className="mt-1 block text-xs text-zinc-500">{setting.key} - {setting.type}</span>
                                </label>
                            ))}
                        </div>
                    </section>
                ))}
                <button disabled={processing} className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">Simpan Pengaturan</button>
            </form>
        </AdminLayout>
    );
}

import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

const blank = { name: '', email: '', phone: '', role: 'customer', address: '', password: '', is_active: true };

export default function Users({ users, filters, roles }) {
    return (
        <AdminLayout>
            <Head title="Pengguna" />
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">Manajemen Pengguna</h1>
                <select className="rounded-md border border-zinc-300 px-3 py-2 text-sm" value={filters?.role || ''} onChange={(e) => router.get('/admin/pengguna', { role: e.target.value }, { preserveState: true })}>
                    <option value="">Semua role</option>
                    {roles.map((role) => <option key={role} value={role}>{role}</option>)}
                </select>
            </div>
            <UserForm roles={roles} />
            <section className="mt-5 space-y-3">
                {users.data.map((user) => <UserForm key={user.id} user={user} roles={roles} />)}
            </section>
            <div className="mt-5 flex flex-wrap gap-2">
                {users.links?.map((link, index) => (
                    <Link key={index} href={link.url || '#'} preserveScroll className={`rounded-md border px-3 py-2 text-sm ${link.active ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                ))}
            </div>
        </AdminLayout>
    );
}

function UserForm({ user, roles }) {
    const isEdit = Boolean(user);
    const { data, setData, post, put, processing, reset } = useForm(isEdit ? {
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'customer',
        address: user.address || '',
        password: '',
        is_active: Boolean(user.is_active),
    } : blank);

    function submit(e) {
        e.preventDefault();
        isEdit ? put(`/admin/pengguna/${user.id}`, { preserveScroll: true }) : post('/admin/pengguna', { preserveScroll: true, onSuccess: () => reset() });
    }

    return (
        <form className={`rounded-md border border-zinc-200 bg-white p-4 ${isEdit ? '' : 'mt-5'}`} onSubmit={submit}>
            <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="font-bold">{isEdit ? user.name : 'Tambah pengguna'}</h2>
                {isEdit && <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-semibold">{user.role}</span>}
            </div>
            <div className="grid gap-3 md:grid-cols-4">
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Nama" required />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Email" />
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="WhatsApp" />
                <select className="rounded-md border border-zinc-300 px-3 py-2" value={data.role} onChange={(e) => setData('role', e.target.value)}>
                    {roles.map((role) => <option key={role} value={role}>{role}</option>)}
                </select>
                <input className="rounded-md border border-zinc-300 px-3 py-2 md:col-span-2" value={data.address} onChange={(e) => setData('address', e.target.value)} placeholder="Alamat" />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder={isEdit ? 'Password baru' : 'Password'} required={!isEdit} />
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} /> Aktif</label>
                <div className="flex gap-2 md:col-span-4">
                    <button disabled={processing} className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">{isEdit ? 'Update' : 'Simpan Pengguna'}</button>
                    {isEdit && <button type="button" onClick={() => router.delete(`/admin/pengguna/${user.id}`, { preserveScroll: true })} className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700">Hapus</button>}
                </div>
            </div>
        </form>
    );
}

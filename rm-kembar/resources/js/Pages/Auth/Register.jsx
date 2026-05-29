import { Head, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Register() {
    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/register');
    }

    return (
        <AppLayout>
            <Head title="Daftar" />
            <section className="mx-auto max-w-md px-4 py-12">
                <h1 className="text-3xl font-bold">Daftar Akun</h1>
                <form className="mt-6 space-y-4 rounded-md border border-zinc-200 bg-white p-5" onSubmit={submit}>
                    <label className="block text-sm font-medium">Nama
                        <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} required minLength="3" maxLength="100" pattern="^[a-zA-Z\s\.\,\'\-]+$" title="Nama hanya boleh berisi huruf dan spasi." />
                    </label>
                    <label className="block text-sm font-medium">Email
                        <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                    </label>
                    <label className="block text-sm font-medium">Nomor WhatsApp
                        <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} required minLength="9" maxLength="20" pattern="^\+?[0-9\s\-\(\)]+$" title="Nomor telepon hanya boleh berisi angka, spasi, atau karakter +-()" />
                    </label>
                    <label className="block text-sm font-medium">Alamat
                        <textarea className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" rows="3" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                    </label>
                    <label className="block text-sm font-medium">Password
                        <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} required minLength="8" />
                    </label>
                    <label className="block text-sm font-medium">Konfirmasi Password
                        <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} required minLength="8" />
                    </label>
                    <button disabled={processing} className="w-full rounded-md bg-red-700 px-4 py-2.5 font-semibold text-white hover:bg-red-800 disabled:bg-zinc-400">Daftar</button>
                </form>
            </section>
        </AppLayout>
    );
}

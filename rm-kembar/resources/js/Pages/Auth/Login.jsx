import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Login() {
    const { data, setData, post, processing } = useForm({ email: '', password: '', remember: false });

    function submit(e) {
        e.preventDefault();
        post('/login');
    }

    return (
        <AppLayout>
            <Head title="Masuk" />
            <section className="mx-auto max-w-md px-4 py-12">
                <h1 className="text-3xl font-bold">Masuk</h1>
                <form className="mt-6 space-y-4 rounded-md border border-zinc-200 bg-white p-5" onSubmit={submit}>
                    <label className="block text-sm font-medium">Email
                        <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                    </label>
                    <label className="block text-sm font-medium">Password
                        <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} required />
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                        <input className="rounded border-zinc-300" type="checkbox" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} /> Ingat saya
                    </label>
                    <button disabled={processing} className="w-full rounded-md bg-red-700 px-4 py-2.5 font-semibold text-white hover:bg-red-800 disabled:bg-zinc-400">Masuk</button>
                    <p className="text-center text-sm text-zinc-600">Belum punya akun? <Link className="font-semibold text-red-700" href="/register">Daftar</Link></p>
                </form>
            </section>
        </AppLayout>
    );
}

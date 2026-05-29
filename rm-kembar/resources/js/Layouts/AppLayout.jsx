import { Link, usePage } from '@inertiajs/react';
import { ChefHat, Phone, Mail, MapPin } from 'lucide-react';

export function money(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(Number(value || 0));
}

export function statusText(value) {
    return String(value || '-').replaceAll('_', ' ');
}

export default function AppLayout({ children }) {
    const { auth, flash, errors } = usePage().props;
    const user = auth?.user;

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-950">
            <header className="sticky top-0 z-20 bg-[#140028] text-white shadow-md">

<div className="mx-auto flex items-center justify-between px-10 py-5">

    {/* LEFT LOGO */}
    <div className="flex items-center gap-4">

        <img
            src="/images/logo.png"
            alt="Logo"
            className="h-16 w-16 object-contain"
        />

        <div className="leading-none">
            <p className="text-xs italic font-light">
                Rumah Makan
            </p>

            <h1 className="text-4xl font-serif">
                Kembar
            </h1>
        </div>
    </div>

    {/* CENTER MENU */}
    <nav className="hidden md:flex items-center gap-14 text-2xl font-semibold">

        <Link
            href="/"
            className="hover:text-red-400 transition"
        >
            Beranda
        </Link>

        <Link
            href="/menu"
            className="hover:text-red-400 transition"
        >
            Dine-In
        </Link>

        <Link
            href="/catering"
            className="hover:text-red-400 transition"
        >
            Catering
        </Link>

        <Link
            href="/about"
            className="hover:text-red-400 transition"
        >
            About Us
        </Link>
    </nav>

    {/* RIGHT USER */}
    <div className="flex items-center gap-4">

        {user ? (
            <>
                <span className="text-2xl font-semibold">
                    {user.name}
                </span>

                <div className="h-14 w-14 rounded-full bg-gray-200 overflow-hidden">
                    <img
                        src="/images/user.png"
                        alt="User"
                        className="h-full w-full object-cover"
                    />
                </div>
            </>
        ) : (
            <>
                <Link
                    href="/login"
                    className="text-xl font-semibold hover:text-red-400"
                >
                    Masuk
                </Link>

                <Link
                    href="/register"
                    className="rounded-full bg-red-600 px-5 py-2 text-lg font-semibold hover:bg-red-700"
                >
                    Daftar
                </Link>
            </>
        )}

    </div>

</div>

</header>

            {(flash?.status || Object.keys(errors || {}).length > 0) && (
                <div className="mx-auto max-w-6xl px-4 pt-4">
                    {flash?.status && <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{flash.status}</div>}
                    {Object.keys(errors || {}).length > 0 && (
                        <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{Object.values(errors)[0]}</div>
                    )}
                </div>
            )}

            <main>{children}</main>

            

            <footer className="bg-[#12002F] text-white">
          <div className="max-w-7xl mx-auto px-8 py-16">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-grey-500 to-white-500 rounded-lg flex items-center justify-center">
                    <img src="/images/logo.png" alt="" />
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="tracking-wide">Warung Makan</div>
                    <div className="tracking-wide -mt-1">Kembar</div>
                  </div>
                </div>
                <p className="text-purple-300 text-sm">
                  Authentic Indonesian cuisine with a modern touch
                </p>
              </div>
  
              <div>
                <h4 className="text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2 text-purple-300">
                  <li><a href="/" className="hover:text-white transition-colors">Beranda</a></li>
                  <li><a href="/menu" className="hover:text-white transition-colors">Dine-In</a></li>
                  <li><a href="/catering" className="hover:text-white transition-colors">Catering</a></li>
                  <li><a href="/about" className="hover:text-white transition-colors">Location</a></li>
                </ul>
              </div>
  
              <div>
                <h4 className="text-lg mb-4">Contact</h4>
                <ul className="space-y-3 text-purple-300">
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+62 21 1234 5678</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>info@warungkembar.com</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Jakarta Pusat</span>
                  </li>
                </ul>
              </div>
  
              <div>
                <h4 className="text-lg mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  
                  {/* bagian social media dah pokoknya */}
                  
                </div>
              </div>
            </div>
  
            <div className="border-t border-purple-800 pt-8 text-center text-purple-300 text-sm">
              <p>&copy; 2026 Warung Makan Kembar. All rights reserved.</p>
            </div>
          </div>
        </footer>
        
        
        </div>

        
            


    );
}

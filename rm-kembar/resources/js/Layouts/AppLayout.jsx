import { useState } from 'react'; // Tambahkan useState untuk kontrol menu
import { Link, usePage } from '@inertiajs/react';
import { ChefHat, Phone, Mail, MapPin, Menu, X} from 'lucide-react'; // Tambahkan Menu dan X
import {
    FaInstagram,
    FaFacebook,
    FaWhatsapp,
    FaTiktok
} from 'react-icons/fa';

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
    
    // State untuk mengontrol buka/tutup menu di mobile
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-950">
            <header className="sticky top-0 z-20 bg-[#140028] text-white shadow-md">
                
                {/* CONTAINER UTAMA */}
                <div className="mx-auto flex items-center justify-between px-6 py-4 md:px-10 md:py-5">

                    {/* LEFT LOGO */}
                    <div className="flex items-center gap-4">
                        <img
                            src="/images/logo.png"
                            alt="Logo"
                            className="h-12 w-12 md:h-16 md:w-16 object-contain"
                        />
                        <div className="leading-none">
                            <p className="text-[10px] md:text-xs italic font-light">
                                Rumah Makan
                            </p>
                            <h1 className="text-2xl md:text-4xl font-serif">
                                Kembar
                            </h1>
                        </div>
                    </div>

                    {/* CENTER MENU (Desktop & Tablet Lebar) */}
                    <nav className="hidden md:flex items-center gap-8 lg:gap-14 text-xl lg:text-2xl font-semibold">
                        <Link href="/" className="hover:text-red-400 transition">Beranda</Link>
                        <Link href="/menu" className="hover:text-red-400 transition">Dine-In</Link>
                        <Link href="/catering" className="hover:text-red-400 transition">Catering</Link>
                        <Link href="/about" className="hover:text-red-400 transition">About Us</Link>
                    </nav>

                    {/* RIGHT USER (Desktop & Tablet Lebar) */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                <span className="text-xl lg:text-2xl font-semibold">
                                    {user.name}
                                </span>
                                <div className="h-12 w-12 lg:h-14 lg:w-14 rounded-full bg-gray-200 overflow-hidden">
                                    <img
                                        src="/images/user.png"
                                        alt="User"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-lg lg:text-xl font-semibold hover:text-red-400">
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-full bg-red-600 px-4 py-2 lg:px-5 lg:py-2 text-base lg:text-lg font-semibold hover:bg-red-700 transition"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>

                    {/* HAMBURGER BUTTON (Hanya muncul di HP & Tablet / Kebawah `md:`) */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-red-400 transition focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                        </button>
                    </div>

                </div>

                {/* MOBILE & TABLET DROPDOWN MENU */}
                {isOpen && (
                    <div className="md:hidden bg-[#0E0027] border-t border-purple-900 px-6 py-6 space-y-6 absolute left-0 right-0 shadow-xl">
                        {/* Navigasi Link Mobile */}
                        <nav className="flex flex-col gap-4 text-xl font-medium">
                            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-red-400 transition py-1">Beranda</Link>
                            <Link href="/menu" onClick={() => setIsOpen(false)} className="hover:text-red-400 transition py-1">Dine-In</Link>
                            <Link href="/catering" onClick={() => setIsOpen(false)} className="hover:text-red-400 transition py-1">Catering</Link>
                            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-red-400 transition py-1">About Us</Link>
                        </nav>
                        
                        <div className="border-t border-purple-900 pt-4">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                                        <img
                                            src="/images/user.png"
                                            alt="User"
                                            className="h-full w-full object-cover"
                                            />
                                    </div>
                                    <span className="text-xl font-semibold">
                                        {user.name}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Link 
                                        href="/login" 
                                        onClick={() => setIsOpen(false)}
                                        className="text-center text-lg font-semibold border border-purple-700 rounded-full py-2 hover:bg-purple-900 transition"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="text-center text-lg font-semibold bg-red-600 rounded-full py-2 hover:bg-red-700 transition"
                                    >
                                        Daftar
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}

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
    <a
        href="https://instagram.com/rumahmakankembar"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-purple-800 p-3 hover:bg-red-600 transition"
    >
        <FaInstagram className="w-5 h-5" />
    </a>

    <a
        href="https://facebook.com/rumahmakankembar"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-purple-800 p-3 hover:bg-blue-600 transition"
    >
        <FaFacebook className="w-5 h-5" />
    </a>



    
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
import React from "react";

export default function Navbar() {
    return (
        <nav className="w-full bg-[#140028] text-white px-16 py-5 flex items-center justify-between">

            {/* LEFT - LOGO */}
            <div className="flex items-center gap-4">

                <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="w-16 h-16 object-contain"
                />

                <div className="leading-none">
                    <p className="text-[13px] italic font-light">
                        Warung Makan
                    </p>

                    <h1 className="text-5xl font-serif">
                        Kembar
                    </h1>
                </div>
            </div>

            {/* CENTER MENU */}
            <div className="flex items-center gap-16 text-3xl font-semibold">

                <a
                    href="#"
                    className="hover:text-red-400 transition duration-200"
                >
                    Beranda
                </a>

                <a
                    href="#"
                    className="hover:text-red-400 transition duration-200"
                >
                    Dine-In
                </a>

                <a
                    href="#"
                    className="hover:text-red-400 transition duration-200"
                >
                    Catering
                </a>

                <a
                    href="#"
                    className="hover:text-red-400 transition duration-200"
                >
                    Location
                </a>

                <a
                    href="#"
                    className="hover:text-red-400 transition duration-200"
                >
                    About Us
                </a>
            </div>

            {/* RIGHT USER */}
            <div className="flex items-center gap-3">

                <span className="text-3xl font-semibold">
                    User
                </span>

                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                        src="/images/user.png"
                        alt="User"
                        className="w-full h-full object-cover"
                    />
                </div>

            </div>
        </nav>
    );
}
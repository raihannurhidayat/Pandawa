import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Auth } from "@/types/auth";

export default function Navbar() {
    const { auth } = usePage<PageProps<{ auth: Auth }>>().props;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center">
                        <a
                            href="/#Beranda"
                            className="text-2xl font-black transition-colors rounded-md text-green-500 hover:text-green-500"
                        >
                            PANDAWA
                        </a>
                    </div>

                    <div className="items-center hidden space-x-8 md:flex">
                        <a
                            href="/#Beranda"
                            className="px-3 py-2 font-medium text-gray-700 transition-colors rounded-md hover:text-green-500"
                        >
                            Beranda
                        </a>
                        <Link
                            href="/issues"
                            className="px-3 py-2 font-medium text-gray-700 transition-colors rounded-md hover:text-green-500"
                        >
                            Laporan
                        </Link>
                        <a
                            href="/#Statistik"
                            className="px-3 py-2 font-medium text-gray-700 transition-colors rounded-md hover:text-green-500"
                        >
                            Statistik
                        </a>
                        <a
                            href="/#Tentang"
                            className="px-3 py-2 font-medium text-gray-700 transition-colors rounded-md hover:text-green-500"
                        >
                            Tentang
                        </a>
                        <a
                            href="/#Tujuan"
                            className="px-3 py-2 font-medium text-gray-700 transition-colors rounded-md hover:text-green-500"
                        >
                            Tujuan
                        </a>
                    </div>

                    <div className="items-center hidden space-x-4 md:flex">
                        {auth.user ? (
                            <Button
                                className="font-semibold text-white transition-colors bg-transparent rounded-full bg-green-500 hover:bg-green-600"
                                asChild
                            >
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <Button
                                    className="font-semibold text-gray-700 transition-colors bg-transparent rounded-full hover:text-white hover:bg-green-500"
                                    asChild
                                >
                                    <Link href="/login">Masuk</Link>
                                </Button>
                                <Button
                                    className="font-semibold text-white transition-colors rounded-full bg-green-500 hover:bg-green-600"
                                    asChild
                                >
                                    <Link href="/register">Daftar</Link>
                                </Button>
                            </>
                        )}
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 text-gray-600 rounded-md hover:text-green-500"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <FiX className="w-6 h-6" />
                            ) : (
                                <FiMenu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="pb-4 space-y-2 md:hidden">
                        <a
                            href="/#Beranda"
                            className="block px-4 py-3 font-medium text-gray-700 transition-colors rounded-md hover:bg-gray-50"
                        >
                            Beranda
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-3 font-medium text-gray-700 transition-colors rounded-md hover:bg-gray-50"
                        >
                            Laporan
                        </a>
                        <a
                            href="/#Statistik"
                            className="block px-4 py-3 font-medium text-gray-700 transition-colors rounded-md hover:bg-gray-50"
                        >
                            Statistik
                        </a>
                        <a
                            href="/#Tentang"
                            className="block px-4 py-3 font-medium text-gray-700 transition-colors rounded-md hover:bg-gray-50"
                        >
                            Tentang
                        </a>
                        <a
                            href="/#Tujuan"
                            className="block px-4 py-3 font-medium text-gray-700 transition-colors rounded-md hover:bg-gray-50"
                        >
                            Tujuan
                        </a>
                        <div className="pt-2 space-y-2">
                            {auth.user ? (
                                <Button className="w-full py-3 font-semibold text-white transition-colors bg-green-500 rounded-full hover:bg-green-700">
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>
                            ) : (
                                <>
                                    <Button className="w-full py-3 font-semibold text-gray-700 transition-colors bg-transparent rounded-full hover:bg-green-500 hover:text-white">
                                        <Link href="/login">Masuk</Link>
                                    </Button>
                                    <Button className="w-full py-3 font-semibold text-white transition-colors bg-green-500 rounded-full hover:bg-green-700">
                                        <Link href="/register">Daftar</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

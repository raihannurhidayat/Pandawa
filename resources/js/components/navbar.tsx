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
                            href="#"
                            className="text-2xl font-black transition-colors rounded-md text-primary hover:text-primary-700"
                        >
                            PANDAWA
                        </a>
                    </div>

                    <div className="items-center hidden space-x-8 md:flex">
                        <a
                            href="#"
                            className="px-3 py-2 font-medium text-gray-700 transition-colors rounded-md hover:text-green-600"
                        >
                            Beranda
                        </a>
                        <a
                            href="#"
                            className="px-3 py-2 font-medium text-gray-700 transition-colors rounded-md hover:text-green-600"
                        >
                            Laporan
                        </a>
                        <a
                            href="#"
                            className="px-3 py-2 font-medium text-gray-700 transition-colors rounded-md hover:text-green-600"
                        >
                            Tentang
                        </a>
                        <a
                            href="#"
                            className="px-3 py-2 font-medium text-gray-700 transition-colors rounded-md hover:text-green-600"
                        >
                            Kontak
                        </a>
                    </div>

                    <div className="items-center hidden space-x-4 md:flex">
                        {auth.user ? (
                            <Button
                                className="font-semibold text-gray-700 transition-colors bg-transparent rounded-full hover:text-green-600"
                                asChild
                            >
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <Button
                                    className="font-semibold text-gray-700 transition-colors bg-transparent rounded-full hover:text-green-600"
                                    asChild
                                >
                                    <Link href="/login">Masuk</Link>
                                </Button>
                                <Button
                                    className="font-semibold text-white transition-colors rounded-full bg-primary hover:bg-primary/80"
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
                            className="p-2 text-gray-600 rounded-md hover:text-green-600"
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
                            href="#"
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
                            href="#"
                            className="block px-4 py-3 font-medium text-gray-700 transition-colors rounded-md hover:bg-gray-50"
                        >
                            Tentang
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-3 font-medium text-gray-700 transition-colors rounded-md hover:bg-gray-50"
                        >
                            Kontak
                        </a>
                        <div className="pt-2 space-y-2">
                            <button className="w-full py-3 font-semibold text-gray-700 transition-colors bg-transparent rounded-full hover:text-green-600">
                                Masuk
                            </button>
                            <button className="w-full py-3 font-semibold text-white transition-colors bg-green-600 rounded-full hover:bg-green-700">
                                Daftar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

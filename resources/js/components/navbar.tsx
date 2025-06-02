import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <a
                            href="#"
                            className="text-2xl font-black text-primary hover:text-primary-700 transition-colors rounded-md"
                        >
                            PANDAWA
                        </a>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <a
                            href="#"
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors rounded-md px-3 py-2"
                        >
                            Beranda
                        </a>
                        <a
                            href="#"
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors rounded-md px-3 py-2"
                        >
                            Laporan
                        </a>
                        <a
                            href="#"
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors rounded-md px-3 py-2"
                        >
                            Tentang
                        </a>
                        <a
                            href="#"
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors rounded-md px-3 py-2"
                        >
                            Kontak
                        </a>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            className="text-gray-700 hover:text-green-600 font-semibold bg-transparent px-6 py-2 rounded-full transition-colors"
                        >
                            Masuk
                        </button>
                        <button
                            className="bg-primary hover:bg-primary/80 text-white font-semibold px-6 py-2 rounded-full transition-colors"
                        >
                            Daftar
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-600 hover:text-green-600 rounded-md p-2"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <FiX className="h-6 w-6" />
                            ) : (
                                <FiMenu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden pb-4 space-y-2">
                        <a
                            href="#"
                            className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors"
                        >
                            Beranda
                        </a>
                        <a
                            href="#"
                            className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors"
                        >
                            Laporan
                        </a>
                        <a
                            href="#"
                            className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors"
                        >
                            Tentang
                        </a>
                        <a
                            href="#"
                            className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors"
                        >
                            Kontak
                        </a>
                        <div className="pt-2 space-y-2">
                            <button
                                className="w-full py-3 text-gray-700 hover:text-green-600 font-semibold bg-transparent rounded-full transition-colors"
                            >
                                Masuk
                            </button>
                            <button
                                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-colors"
                            >
                                Daftar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
import React, { Component } from 'react'
import { MessageCircle, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-16 sm:pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                                <MessageCircle className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold">Pandawa</h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Platform terpercaya untuk menyampaikan aspirasi dan pengaduan masyarakat kepada pemerintah daerah.
                        </p>
                        <div className="flex space-x-4">
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-500 transition-colors cursor-pointer">
                                <ExternalLink className="w-5 h-5" />
                            </div>
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-500 transition-colors cursor-pointer">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-500 transition-colors cursor-pointer">
                                <Phone className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6">Tautan Cepat</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Beranda</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Buat Laporan</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Cek Status</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Statistik</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6">Kategori Laporan</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Pendidikan</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Kesehatan</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Lingkungan</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Infrastruktur</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Sosial</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6">Kontak Kami</h4>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                <p className="text-gray-400">
                                    Jl. Pemerintahan No. 123<br />
                                    Kota Tasikmalaya, Jawa Barat
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <p className="text-gray-400">+62 254 123 4567</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <p className="text-gray-400">info@pandawa.go.id</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm mb-4 md:mb-0">
                            © 2025 LaporMas. Semua hak cipta dilindungi.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Kebijakan Privasi</a>
                            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Syarat & Ketentuan</a>
                            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Bantuan</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
};
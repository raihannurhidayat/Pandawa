import { MessageCircle, Users, FileText, Shield, Award, Phone, ChevronLeft, ChevronRight, Target, TrendingUp, CheckCircle, Clock, AlertTriangle, Star, ListTodo  } from 'lucide-react';
import Navbar from '@/components/navbar';
import { IoMegaphone } from "react-icons/io5";
import { useState, useEffect } from 'react';
import Footer from '@/components/footer';

const App = () => {
    const [currentBannerSlide, setCurrentBannerSlide] = useState(0);

    const bannerItems = [
        { title: "Transparansi", icon: <IoMegaphone className="w-4 sm:w-6 h-4 sm:h-6 text-white animate-pulse" /> },
        { title: "Pelaporan Pembangunan", icon: <IoMegaphone className="w-4 sm:w-6 h-4 sm:h-6 text-white animate-pulse" /> },
        { title: "Data & Statistik", icon: <IoMegaphone className="w-4 sm:w-6 h-4 sm:h-6 text-white animate-pulse" /> },
        { title: "Aspirasi & Pengaduan", icon: <IoMegaphone className="w-4 sm:w-6 h-4 sm:h-6 text-white animate-pulse" /> },
        { title: "Layanan Administrasi", icon: <IoMegaphone className="w-4 sm:w-6 h-4 sm:h-6 text-white animate-pulse" /> },
        { title: "Monitoring Kegiatan", icon: <IoMegaphone className="w-4 sm:w-6 h-4 sm:h-6 text-white animate-pulse" /> }
    ];

    const goalsItems = [
        {
            icon: <Users className="w-8 h-8 text-white" />,
            gradient: "from-purple-500 to-pink-500",
            title: "Partisipasi Aktif Masyarakat",
            description: "Mendorong keterlibatan aktif masyarakat dalam pembangunan daerah melalui penyampaian aspirasi dan pengaduan yang konstruktif."
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-white" />,
            gradient: "from-green-500 to-emerald-500",
            title: "Efisiensi Pelayanan",
            description: "Meningkatkan efisiensi dan efektivitas pelayanan publik dengan sistem pelaporan yang terintegrasi dan responsif."
        },
        {
            icon: <Shield className="w-8 h-8 text-white" />,
            gradient: "from-blue-500 to-cyan-500",
            title: "Transparansi Pemerintahan",
            description: "Menciptakan pemerintahan yang terbuka dan dapat dipertanggungjawabkan kepada masyarakat melalui keterbukaan informasi."
        },
        {
            icon: <Clock className="w-8 h-8 text-white" />,
            gradient: "from-orange-500 to-red-500",
            title: "Respon Cepat",
            description: "Memberikan respon yang cepat dan tepat terhadap setiap laporan yang masuk dari masyarakat, dengan target maksimal 3x24 jam."
        },
        {
            icon: <Award className="w-8 h-8 text-white" />,
            gradient: "from-indigo-500 to-purple-500",
            title: "Kualitas Layanan",
            description: "Meningkatkan kualitas pelayanan publik secara berkelanjutan berdasarkan feedback dan evaluasi dari masyarakat."
        },
        {
            icon: <FileText className="w-8 h-8 text-white" />,
            gradient: "from-teal-500 to-green-500",
            title: "Dokumentasi Lengkap",
            description: "Menyediakan dokumentasi lengkap dan sistematis dari setiap laporan untuk keperluan evaluasi dan perencanaan pembangunan."
        }
    ]

    const statistics = [
        {
            number: "2,847",
            label: "Total Laporan",
            sublabel: "laporan masuk",
            icon: <FileText className="w-8 h-8 text-white" />,
            bgColor: "bg-gradient-to-br from-teal-400 to-teal-600",
        },
        {
            number: "1,923",
            label: "Laporan Selesai",
            sublabel: "telah diselesaikan",
            icon: <CheckCircle className="w-8 h-8 text-white" />,
            bgColor: "bg-gradient-to-br from-orange-400 to-orange-600",
        },
        {
            number: "724",
            label: "Dalam Proses",
            sublabel: "sedang diproses",
            icon: <Clock className="w-8 h-8 text-white" />,
            bgColor: "bg-gradient-to-br from-purple-500 to-purple-700",
        },
        {
            number: "200",
            label: "Butuh Perhatian",
            sublabel: "perlu ditindak",
            icon: <AlertTriangle className="w-8 h-8 text-white" />,
            bgColor: "bg-gradient-to-br from-red-500 to-red-700",
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerSlide((prev) => (prev + 1) % bannerItems.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [bannerItems.length]);

    const categories = [
        {
            title: "Pendidikan",
            subtitle: "Laporan seputar dunia pendidikan",
            image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=200&fit=crop",
            color: "bg-pink-100",
            icon: <FileText className="w-4 h-4 text-pink-600" />
        },
        {
            title: "Kesehatan",
            subtitle: "Layanan kesehatan masyarakat",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
            color: "bg-gray-100",
            icon: <Shield className="w-4 h-4 text-gray-600" />
        },
        {
            title: "Lingkungan",
            subtitle: "Pelestarian lingkungan hidup",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop",
            color: "bg-green-100",
            icon: <Users className="w-4 h-4 text-green-600" />
        },
        {
            title: "Infrastruktur",
            subtitle: "Pembangunan dan perbaikan",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop",
            color: "bg-blue-100",
            icon: <Award className="w-4 h-4 text-blue-600" />
        },
        {
            title: "Sosial",
            subtitle: "Kehidupan bermasyarakat",
            image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop",
            color: "bg-purple-100",
            icon: <Phone className="w-4 h-4 text-purple-600" />
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br font-poppins from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-blue-200 rounded-full blur-3xl"></div>
                <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-32 sm:w-48 h-32 sm:h-48 bg-purple-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 sm:bottom-40 left-16 sm:left-32 w-24 sm:w-40 h-24 sm:h-40 bg-pink-200 rounded-full blur-3xl"></div>
            </div>

            <Navbar />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-18 pb-16 sm:pb-32">
                <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-semibold">
                        <Award className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
                        Platform Terpercaya untuk Masyarakat
                    </div>
                </div>

                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
                        Laporkan Masalah Anda{' '}
                        <span className="text-green-500">Dengan Mudah</span>,<br className="hidden sm:block" />
                        <span className="text-green-500">Sampaikan</span> Dalam Hitungan Detik
                    </h1>

                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
                        Pantau Progres Laporan Anda <span className="text-green-500">Secara Real-time</span>
                    </p>

                    <button className="bg-green-500 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        Buat Laporan Sekarang
                    </button>
                </div>

                <div className="relative mt-12 sm:mt-16 lg:mt-20">
                    <div className="block lg:hidden">
                        <div className="flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {categories.map((category, index) => (
                                <div key={index} className="relative group flex-none w-72 sm:w-80">

                                    <div className="relative bg-white rounded-2xl shadow-md p-6 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] border border-gray-100 overflow-hidden h-full">
                                        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                                            <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-full transform translate-x-8 -translate-y-8"></div>
                                        </div>

                                        <div className="relative h-40 sm:h-48 rounded-xl overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-500">
                                            <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            <div className={`absolute top-4 right-4 p-3 rounded-full ${category.color} backdrop-blur-sm shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300`}>
                                                {category.icon}
                                            </div>
                                        </div>

                                        <div className="relative z-10">
                                            <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors duration-300">
                                                {category.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {category.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:flex justify-center items-center min-h-96">
                        <div className="absolute left-0 top-0">
                            <div className="space-y-8 transform -rotate-12">
                                <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-48 hover:scale-105 hover:rotate-0">
                                    <div className="h-28 rounded-xl overflow-hidden mb-3">
                                        <img src={categories[0].image} alt={categories[0].title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex items-center mb-1">
                                        <div className={`p-1 rounded ${categories[0].color} mr-2`}>
                                            {categories[0].icon}
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-sm">{categories[0].title}</h3>
                                    </div>
                                    <p className="text-xs text-gray-600">{categories[0].subtitle}</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute left-32 top-16">
                            <div className="transform rotate-6">
                                <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-48 hover:scale-105 hover:rotate-0">
                                    <div className="h-28 rounded-xl overflow-hidden mb-3">
                                        <img src={categories[1].image} alt={categories[1].title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex items-center mb-1">
                                        <div className={`p-1 rounded ${categories[1].color} mr-2`}>
                                            {categories[1].icon}
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-sm">{categories[1].title}</h3>
                                    </div>
                                    <p className="text-xs text-gray-600">{categories[1].subtitle}</p>
                                </div>
                            </div>
                        </div>

                        <div className="transform hover:scale-105 transition-all duration-300">
                            <div className="bg-white rounded-2xl p-6 shadow-2xl w-64 border border-gray-100">
                                <div className="h-40 rounded-xl overflow-hidden mb-4">
                                    <img src={categories[2].image} alt={categories[2].title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex items-center mb-2">
                                    <div className={`p-2 rounded-lg ${categories[2].color} mr-3`}>
                                        {categories[2].icon}
                                    </div>
                                    <h3 className="font-bold text-gray-900">{categories[2].title}</h3>
                                </div>
                                <p className="text-sm text-gray-600">{categories[2].subtitle}</p>
                            </div>
                        </div>

                        <div className="absolute right-32 top-16">
                            <div className="transform -rotate-6">
                                <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-48 hover:scale-105 hover:rotate-0">
                                    <div className="h-28 rounded-xl overflow-hidden mb-3">
                                        <img src={categories[3].image} alt={categories[3].title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex items-center mb-1">
                                        <div className={`p-1 rounded ${categories[3].color} mr-2`}>
                                            {categories[3].icon}
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-sm">{categories[3].title}</h3>
                                    </div>
                                    <p className="text-xs text-gray-600">{categories[3].subtitle}</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute right-0 top-0">
                            <div className="transform rotate-12">
                                <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-48 hover:scale-105 hover:rotate-0">
                                    <div className="h-28 rounded-xl overflow-hidden mb-3">
                                        <img src={categories[4].image} alt={categories[4].title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex items-center mb-1">
                                        <div className={`p-1 rounded ${categories[4].color} mr-2`}>
                                            {categories[4].icon}
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-sm">{categories[4].title}</h3>
                                    </div>
                                    <p className="text-xs text-gray-600">{categories[4].subtitle}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 z-50">
                <div className="relative group">
                    <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <button className="relative w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-300 cursor-pointer shadow-2xl hover:shadow-green-500/50 transform hover:scale-110">
                        <Phone className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 text-white" />
                    </button>
                </div>
            </div>

            <div className="relative -mt- mb-10 md:-mt-10">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 transform -rotate-1"></div>

                <section className="relative bg-gradient-to-r from-green-400 to-green-500 shadow-lg transform rotate-1 overflow-hidden">
                    <div className="max-w-6xl mx-auto">
                        <div className="block sm:hidden">
                            <div className="relative">
                                <div
                                    className="flex transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(-${currentBannerSlide * 100}%)` }}
                                >
                                    {bannerItems.map((item, index) => (
                                        <div key={index} className="w-full flex-shrink-0">
                                            <a href="#" className="flex items-center justify-center px-4 py-4 text-white font-medium text-sm text-center hover:bg-green-600 transition-all duration-300">
                                                {item.icon}
                                                <span className="ml-2">{item.title}</span>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="hidden sm:block lg:hidden">
                            <div className="relative">
                                <div
                                    className="flex transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(-${Math.floor(currentBannerSlide / 2) * 100}%)` }}
                                >
                                    {Array.from({ length: Math.ceil(bannerItems.length / 2) }, (_, slideIndex) => (
                                        <div key={slideIndex} className="w-full flex-shrink-0 grid grid-cols-2">
                                            {bannerItems.slice(slideIndex * 2, slideIndex * 2 + 2).map((item, itemIndex) => (
                                                <a key={itemIndex} href="#" className="flex items-center justify-center px-4 py-4 text-white font-medium text-sm text-center hover:bg-green-600 transition-all duration-300">
                                                    {item.icon}
                                                    <span className="ml-2">{item.title}</span>
                                                </a>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setCurrentBannerSlide(currentBannerSlide > 1 ? currentBannerSlide - 2 : bannerItems.length - 2)}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-1 hover:bg-white/30 transition-all duration-300"
                                >
                                    <ChevronLeft className="w-4 h-4 text-white" />
                                </button>
                                <button
                                    onClick={() => setCurrentBannerSlide(currentBannerSlide < bannerItems.length - 2 ? currentBannerSlide + 2 : 0)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-1 hover:bg-white/30 transition-all duration-300"
                                >
                                    <ChevronRight className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <div className="relative overflow-hidden">
                                <div
                                    className="flex transition-transform duration-1000 ease-linear"
                                    style={{ transform: `translateX(-${currentBannerSlide * (100 / 3)}%)` }}
                                >
                                    {[...bannerItems, ...bannerItems].map((item, index) => (
                                        <div key={index} className="flex items-center flex-shrink-0" style={{ width: `${100 / 3}%` }}>
                                            <div className="flex items-center justify-center px-2">
                                                {item.icon}
                                            </div>
                                            <a href="#" className="flex-1 px-6 py-4 text-white font-medium text-base text-center hover:bg-green-600 transition-all duration-300 hover:scale-105 transform">
                                                {item.title}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="relative bg-gradient-to-br from-green-400 via-green-500 to-lime-400 py-12 sm:py-16 rounded-3xl mx-8 mt-20">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                            STATISTIK PELAPORAN
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {statistics.map((stat, index) => (
                            <div key={index} className="group">
                                <div className={`relative ${stat.bgColor} rounded-2xl p-6 h-60 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
                                    <div className="flex justify-center">
                                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                            {stat.icon}
                                        </div>
                                    </div>

                                    <div className="text-center text-white space-y-2">
                                        <p className="text-4xl font-black">{stat.number}</p>
                                        <p className="text-lg font-bold">{stat.label}</p>
                                        <p className="text-sm opacity-90">{stat.sublabel}</p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative bg-gradient-to-br from-gray-50 to-blue-50 py-16 sm:py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                    Pelayanan Publik <span className="text-green-600">Efektif</span> dan <span className="text-blue-600">Transparan</span>
                                </h2>
                                <div className="w-20 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 my-6 rounded-full"></div>
                            </div>

                            <p className="text-xl text-gray-600 leading-relaxed">
                                Sistem pelaporan terintegrasi yang menghubungkan masyarakat dengan instansi pemerintah secara real-time.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-5 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex-shrink-0 p-3 bg-green-50 rounded-lg text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Proses Tanpa Ribet</h3>
                                        <p className="text-gray-600">Kirim laporan hanya dalam 3 langkah mudah</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-5 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Pelacakan Real-time</h3>
                                        <p className="text-gray-600">Pantau perkembangan laporan Anda</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-md p-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center p-5 bg-green-50 rounded-xl">
                                    <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                                    <div className="text-lg font-medium text-gray-700">Layanan Aktif</div>
                                </div>

                                <div className="text-center p-5 bg-blue-50 rounded-xl">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                                    <div className="text-lg font-medium text-gray-700">Kepuasan</div>
                                </div>

                                <div className="text-center p-5 bg-orange-50 rounded-xl">
                                    <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                                    <div className="text-lg font-medium text-gray-700">Transparansi</div>
                                </div>

                                <div className="text-center p-5 bg-gray-50 rounded-xl">
                                    <div className="text-3xl font-bold text-gray-600 mb-2">80%</div>
                                    <div className="text-lg font-medium text-gray-700">Mengurangi Keluhan</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative bg-white py-16 sm:py-20 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Visi & <span className="text-green-500">Misi Kami</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Komitmen kami dalam melayani masyarakat dan membangun pemerintahan yang responsif
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 lg:p-10 border border-green-100">
                            <div className="flex items-center mb-6">
                                <div className="p-3 bg-green-500 rounded-xl">
                                    <Target className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 ml-4">Visi</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                Menjadi platform pelaporan masyarakat terdepan yang menghubungkan warga dengan pemerintah
                                dalam menciptakan tata kelola yang transparan, akuntabel, dan responsif untuk kesejahteraan bersama.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-10 border border-blue-100">
                            <div className="flex items-center mb-6">
                                <div className="p-3 bg-blue-500 rounded-xl">
                                    <ListTodo className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 ml-4">Misi</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Star className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                    <p className="text-gray-700">Memberikan akses mudah bagi masyarakat untuk menyampaikan aspirasi dan pengaduan</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Star className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                    <p className="text-gray-700">Meningkatkan transparansi dan akuntabilitas pemerintah dalam menangani laporan masyarakat</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Star className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                    <p className="text-gray-700">Mempercepat proses penyelesaian masalah yang dilaporkan masyarakat</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative bg-gradient-to-br from-gray-50 to-blue-50 py-16 sm:py-20 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Tujuan <span className="text-blue-500">Platform</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Target-target yang ingin kami capai untuk menciptakan pelayanan publik yang lebih baik
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {goalsItems.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    );
};

export default App;
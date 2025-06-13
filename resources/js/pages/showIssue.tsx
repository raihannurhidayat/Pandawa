import ImageGallery from "@/components/image-gallery";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Issue } from '@/types/issue';
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface ShowIssueProps {
    issue: Issue;
}

export default function ShowIssue({ issue }: ShowIssueProps) {
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);

    function toggleGallery(e: any) {
        setGalleryIndex(0);
        setGalleryOpen(true);
    }

    return (
        <>
            <Head title={issue.title} />
            <Navbar />

            <div className="min-h-screen p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 font-poppins bg-slate-50 relative overflow-visible">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-blue-200 rounded-full blur-3xl"></div>
                    <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-purple-200 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 sm:bottom-40 left-16 sm:left-32 w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-pink-200 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8 relative z-10 max-w-7xl">
                    {/* Breadcrumb */}
                    <div className="mb-4 sm:mb-6">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <Link href="/issues" className="text-sm sm:text-base">
                                        Daftar Laporan
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem className="text-sm sm:text-base truncate max-w-[200px] sm:max-w-none">
                                    {issue.title}
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    {/* Image gallery */}
                    <ImageGallery
                        images={issue.attachments}
                        isOpen={galleryOpen}
                        onClose={() => setGalleryOpen(false)}
                        initialIndex={galleryIndex}
                    />

                    {/* Progress tracker - Responsive layout */}
                    <div className="mb-6 sm:mb-8 lg:mb-10">
                        {/* Mobile: Vertical stack */}
                        <div className="block lg:hidden">
                            <div className="space-y-3">
                                <Card className="bg-green-50 border-green-200">
                                    <CardHeader className="p-3 sm:p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <CardTitle className="text-sm sm:text-base font-semibold text-green-800">
                                                    Pengaduan diterima
                                                </CardTitle>
                                                <CardDescription className="text-xs sm:text-sm text-green-600 mt-1">
                                                    Pengaduan diterima dan telah diverifikasi
                                                </CardDescription>
                                            </div>
                                            <Badge className="text-xs uppercase bg-green-100 text-green-800 border-green-300 shrink-0">
                                                {issue.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                </Card>

                                <Card className="bg-gray-50 border-gray-200">
                                    <CardHeader className="p-3 sm:p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <CardTitle className="text-sm sm:text-base font-semibold text-gray-600">
                                                    Dalam proses
                                                </CardTitle>
                                                <CardDescription className="text-xs sm:text-sm text-gray-500 mt-1">
                                                    Pengaduan sedang ditangani
                                                </CardDescription>
                                            </div>
                                            <Badge className="text-xs uppercase bg-gray-100 text-gray-500 border-gray-300 shrink-0">
                                                pending
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                </Card>

                                <Card className="bg-gray-50 border-gray-200">
                                    <CardHeader className="p-3 sm:p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <CardTitle className="text-sm sm:text-base font-semibold text-gray-400">
                                                    Dalam tindak lanjut
                                                </CardTitle>
                                                <CardDescription className="text-xs sm:text-sm text-gray-400 mt-1">
                                                    Pengaduan sedang ditindaklanjuti
                                                </CardDescription>
                                            </div>
                                            <Badge className="text-xs uppercase bg-gray-50 text-gray-400 border-gray-200 shrink-0">
                                                progress
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                </Card>

                                <Card className="bg-gray-50 border-gray-200">
                                    <CardHeader className="p-3 sm:p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <CardTitle className="text-sm sm:text-base font-semibold text-gray-400">
                                                    Selesai
                                                </CardTitle>
                                                <CardDescription className="text-xs sm:text-sm text-gray-400 mt-1">
                                                    Pengaduan telah diselesaikan
                                                </CardDescription>
                                            </div>
                                            <Badge className="text-xs uppercase bg-gray-50 text-gray-400 border-gray-200 shrink-0">
                                                resolved
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </div>
                        </div>

                        {/* Desktop: Horizontal layout */}
                        <div className="hidden lg:flex items-center gap-2 xl:gap-4 p-2 rounded-lg shadow-sm bg-white/80 backdrop-blur-sm border border-gray-200">
                            <Card className="flex flex-1 bg-green-50 border-green-200">
                                <CardHeader className="flex flex-row justify-between flex-1 w-full gap-4 p-3 xl:p-6">
                                    <div className="flex flex-col w-full gap-2">
                                        <CardTitle className="font-semibold text-green-800 text-sm xl:text-base">
                                            Pengaduan diterima
                                        </CardTitle>
                                        <CardDescription className="text-green-600 text-xs xl:text-sm">
                                            Pengaduan diterima dan telah diverifikasi
                                        </CardDescription>
                                    </div>
                                    <div className="flex justify-end">
                                        <Badge className="text-xs uppercase select-none h-fit bg-green-100 text-green-800 border-green-300">
                                            {issue.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                            </Card>
                            <Card className="flex flex-1 transition-colors ease-in-out bg-transparent border-none shadow-none outline-none hover:bg-gray-50">
                                <CardHeader className="flex flex-row justify-between flex-1 w-full gap-4 p-3 xl:p-6">
                                    <div className="flex flex-col w-full gap-2">
                                        <CardTitle className="font-semibold text-gray-600 text-sm xl:text-base">
                                            Dalam proses
                                        </CardTitle>
                                        <CardDescription className="text-gray-500 text-xs xl:text-sm">
                                            Pengaduan sedang ditangani
                                        </CardDescription>
                                    </div>
                                    <div className="flex justify-end">
                                        <Badge className="text-xs uppercase select-none h-fit bg-gray-100 text-gray-500 border-gray-300">
                                            pending
                                        </Badge>
                                    </div>
                                </CardHeader>
                            </Card>
                            <Card className="flex flex-1 bg-transparent border-none shadow-none outline-none">
                                <CardHeader className="flex flex-row justify-between flex-1 w-full gap-4 p-3 xl:p-6">
                                    <div className="flex flex-col w-full gap-2">
                                        <CardTitle className="font-semibold text-gray-400 text-sm xl:text-base">
                                            Dalam tindak lanjut
                                        </CardTitle>
                                        <CardDescription className="text-gray-400 text-xs xl:text-sm">
                                            Pengaduan sedang ditindaklanjuti
                                        </CardDescription>
                                    </div>
                                    <div className="flex justify-end">
                                        <Badge className="text-xs uppercase select-none h-fit bg-gray-50 text-gray-400 border-gray-200">
                                            progress
                                        </Badge>
                                    </div>
                                </CardHeader>
                            </Card>
                            <Card className="flex flex-1 bg-transparent border-none shadow-none outline-none">
                                <CardHeader className="flex flex-row justify-between flex-1 w-full gap-4 p-3 xl:p-6">
                                    <div className="flex flex-col w-full gap-2">
                                        <CardTitle className="font-semibold text-gray-400 text-sm xl:text-base">
                                            Selesai
                                        </CardTitle>
                                        <CardDescription className="text-gray-400 text-xs xl:text-sm">
                                            Pengaduan telah diselesaikan
                                        </CardDescription>
                                    </div>
                                    <div className="flex justify-end">
                                        <Badge className="text-xs uppercase select-none h-fit bg-gray-50 text-gray-400 border-gray-200">
                                            resolved
                                        </Badge>
                                    </div>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>

                    {/* Main content card */}
                    <Card className="gap-y-4 bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100">
                        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4 p-4 sm:p-6">
                            <CardTitle className="flex-1 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                                {issue.title}
                            </CardTitle>
                            <div className="flex gap-2 shrink-0">
                                <Button variant="secondary" asChild className="text-sm w-full sm:w-auto">
                                    <Link href="/issues">Kembali ke Daftar</Link>
                                </Button>
                            </div>
                        </CardHeader>

                        <CardContent className="flex flex-col xl:flex-row w-full gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
                            {/* Main content */}
                            <Card className="flex-1">
                                <CardContent className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6">
                                    <Label className="font-semibold leading-tight text-base sm:text-lg text-gray-900">
                                        Deskripsi
                                    </Label>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                                        {issue.body}
                                    </p>

                                    {issue.attachments && issue.attachments.length > 0 && (
                                        <div className="flex flex-col gap-4">
                                            <Label className="font-semibold leading-tight text-base sm:text-lg text-gray-900">
                                                Lampiran ({issue.attachments.length})
                                            </Label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4">
                                                {issue.attachments.map((attachment) => (
                                                    <Button
                                                        key={attachment.id}
                                                        className="p-0 transition-opacity hover:bg-black/10 h-auto"
                                                        onClick={toggleGallery}
                                                        asChild
                                                    >
                                                        <div className="w-full aspect-[4/3] overflow-hidden rounded-md outline outline-1 outline-neutral-400">
                                                            <img
                                                                src={attachment.url}
                                                                alt={attachment.filename}
                                                                className="object-cover w-full h-full transition-transform hover:scale-105"
                                                            />
                                                        </div>
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Sidebar details */}
                            <Card className="bg-gray-50 border-gray-200 xl:w-80 xl:shrink-0">
                                <CardHeader className="p-4 sm:p-6">
                                    <CardTitle className="font-semibold text-base sm:text-lg text-gray-900">
                                        Detail Laporan
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                                        <div className="space-y-3">
                                            <div>
                                                <Label className="leading-tight text-xs sm:text-sm text-gray-600 font-medium block mb-1">
                                                    ID Laporan
                                                </Label>
                                                <p className="text-gray-900 font-mono text-xs sm:text-sm break-all">
                                                    {issue.id}
                                                </p>
                                            </div>

                                            <div>
                                                <Label className="leading-tight text-xs sm:text-sm text-gray-600 font-medium block mb-1">
                                                    Tanggal Dibuat
                                                </Label>
                                                <p className="text-gray-900 text-xs sm:text-sm">
                                                    <span className="block sm:hidden">
                                                        {issue.created_at_relative}
                                                    </span>
                                                    <span className="hidden sm:block">
                                                        {issue.created_at_formatted}
                                                    </span>
                                                    <span className="hidden sm:block text-gray-500 text-xs">
                                                        ({issue.created_at_relative})
                                                    </span>
                                                </p>
                                            </div>

                                            <div>
                                                <Label className="leading-tight text-xs sm:text-sm text-gray-600 font-medium block mb-1">
                                                    Pelapor
                                                </Label>
                                                <Link href={`/profile/${issue.user.id}`}>
                                                <p className="text-gray-900 text-xs sm:text-sm font-medium break-words">
                                                    {issue.user.name}
                                                </p>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <Label className="leading-tight text-xs sm:text-sm text-gray-600 font-medium block mb-1">
                                                    Kategori
                                                </Label>
                                                <Badge className="text-xs font-medium bg-blue-100 text-blue-800 border-blue-200">
                                                    {issue.issue_category.name}
                                                </Badge>
                                            </div>

                                            <div>
                                                <Label className="leading-tight text-xs sm:text-sm text-gray-600 font-medium block mb-1">
                                                    Status
                                                </Label>
                                                <Badge className={`text-xs font-medium ${issue.status === 'open' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                                    issue.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                                        issue.status === 'resolved' ? 'bg-green-100 text-green-800 border-green-200' :
                                                            'bg-gray-100 text-gray-800 border-gray-200'
                                                    }`}>
                                                    {issue.status === 'open' ? 'Terbuka' :
                                                        issue.status === 'pending' ? 'Pending' :
                                                            issue.status === 'resolved' ? 'Selesai' :
                                                                issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                                                </Badge>
                                            </div>

                                            <div>
                                                <Label className="leading-tight text-xs sm:text-sm text-gray-600 font-medium block mb-1">
                                                    Lokasi
                                                </Label>
                                                <p className="break-words whitespace-pre-wrap text-gray-900 text-xs sm:text-sm">
                                                    {issue.location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Footer />
        </>
    );
}
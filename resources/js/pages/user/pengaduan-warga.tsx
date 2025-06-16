// TODO: Fix status isLiked for UI
// TODO: Fix invalidate likes user

import { useState, useMemo, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Search,
    Heart,
    Calendar,
    User,
    Construction,
    TreePine,
    Users,
    Car,
    Shield,
    Lightbulb,
    Filter,
    SortAsc,
    Megaphone,
    Trash2Icon,
    Waypoints,
    PencilIcon,
} from "lucide-react";
import AuthenticatedUserLayout from "@/layouts/authenticatedUserLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { IoMegaphone, IoMegaphoneOutline } from "react-icons/io5";
import { Category } from "@/types/category";
import { Issue } from "@/types/issue";
import { PageProps } from "@/types";
import { Auth } from "@/types/auth";

const sortOptions = [
    { value: "terbaru", label: "Terbaru" },
    { value: "terlama", label: "Terlama" },
    { value: "terfavorit", label: "Terfavorit" },
];

const categoryIcons = {
    Sampah: Trash2Icon,
    Lainnya: PencilIcon,
    Jalan: Waypoints,
};

const statusColors = {
    open: "bg-gray-100 text-gray-800 border-gray-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    in_progress: "bg-blue-100 text-blue-800 border-blue-200",
    resolved: "bg-green-100 text-green-800 border-green-200",
    closed: "bg-red-100 text-red-800 border-red-200",
};

function ComplaintCard({
    complaint,
    onUpvote,
    isLoading = false,
    currentUserId,
}: {
    complaint: Issue | null;
    onUpvote: (id: string) => void;
    isLoading: boolean;
    currentUserId: string;
}) {
    if (isLoading) {
        return (
            <Card className="flex flex-col h-80">
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                        <Skeleton className="w-8 h-8 rounded" />
                        <Skeleton className="w-24 h-4" />
                    </div>
                    <Skeleton className="w-full h-5" />
                    <Skeleton className="w-3/4 h-5" />
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-1">
                    <div className="space-y-2">
                        <Skeleton className="w-full h-4" />
                        <Skeleton className="w-full h-4" />
                        <Skeleton className="w-2/3 h-4" />
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div className="space-y-1">
                            <Skeleton className="w-20 h-3" />
                            <Skeleton className="w-16 h-3" />
                        </div>
                        <Skeleton className="w-16 h-8" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    const isLiked = !!complaint?.likes?.some(
        (liked) => liked.user_id === currentUserId
    );

    const IconComponent =
        categoryIcons[
            complaint?.issue_category.name as keyof typeof categoryIcons
        ] || Lightbulb;

    return (
        <Link href={route("user.detail.pengaduan-warga", complaint?.id)}>
            <Card className="flex flex-col transition-all duration-200 cursor-pointer h-80 hover:shadow-lg hover:-translate-y-1 group">
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 transition-colors rounded-lg bg-primary group-hover:bg-primary/80">
                            <IconComponent
                                className="w-4 h-4 text-primary-foreground"
                                aria-hidden="true"
                            />
                        </div>
                        <Badge
                            className={`${
                                statusColors[
                                    complaint?.status as keyof typeof statusColors
                                ] || ""
                            } text-xs font-medium`}
                            aria-label={`Status: ${complaint?.status}`}
                        >
                            {complaint?.status}
                        </Badge>
                    </div>
                    <h3 className="text-lg font-semibold leading-tight transition-colors line-clamp-2 group-hover:text-primary/80">
                        {complaint?.title}
                    </h3>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-1">
                    <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                        {complaint?.body}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                                <Calendar
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                />
                                <span>
                                    {new Date(
                                        complaint?.created_at!
                                    ).toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <User className="w-3 h-3" aria-hidden="true" />
                                <span>{complaint?.user?.name!}</span>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`flex z-50 items-center gap-1 transition-all duration-200 hover:scale-105 ${
                                isLiked
                                    ? "text-red-500 hover:text-red-600"
                                    : "text-gray-500 hover:text-red-500"
                            }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onUpvote(complaint?.id!);
                            }}
                            aria-label={`${
                                isLiked ? "Unlike" : "Like"
                            } complaint. Current likes: ${
                                complaint?.likes_count
                            }`}
                        >
                            <IoMegaphoneOutline
                                className={`w-4 h-4 transition-all duration-200 ${
                                    isLiked ? "fill-current" : ""
                                }`}
                            />
                            <span className="font-medium">
                                {complaint?.likes_count}
                            </span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center col-span-full">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full">
                <Search className="w-8 h-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No complaints found</h3>
            <p className="max-w-md ">
                Try adjusting your search terms or filters to find what you're
                looking for.
            </p>
        </div>
    );
}

export default function PengaduanWargaPage({
    categories: categoriesData,
    status,
    issues,
}: {
    categories: Category[];
    status: string[];
    issues: Issue[];
}) {
    const [complaints, setComplaints] = useState(issues);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [sortBy, setSortBy] = useState("terbaru");
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [categories, setCategories] = useState([
        { name: "All" },
        ...categoriesData,
    ]);
    const [statuses] = useState(["All", ...status]);

    const { auth } = usePage<PageProps<{ auth: Auth }>>().props;

    useEffect(() => {
        setComplaints(issues);
    }, [issues]);

    const filteredComplaints = useMemo(() => {
        return complaints.filter((complaint) => {
            const matchesSearch =
                complaint.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                complaint.body.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory =
                selectedCategory === "All" ||
                complaint.issue_category.name === selectedCategory;
            const matchesStatus =
                selectedStatus === "All" || complaint.status === selectedStatus;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [complaints, searchTerm, selectedCategory, selectedStatus]);

    const filteredAndSortedComplaints = useMemo(() => {
        // Create a copy to avoid mutating the original
        const sorted = [...filteredComplaints];

        // Sort complaints
        sorted.sort((a, b) => {
            switch (sortBy) {
                case "terlama":
                    return (
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                    );
                case "terfavorit":
                    return b.likes_count - a.likes_count;
                case "terbaru":
                default:
                    return (
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    );
            }
        });

        return sorted;
    }, [filteredComplaints, sortBy]);

    const totalPages = Math.ceil(
        filteredAndSortedComplaints.length / itemsPerPage
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentComplaints = filteredAndSortedComplaints.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const handleUpvote = (complaintId: string) => {
        router.post(
            `/user/${complaintId}/like`,
            {},
            {
                only: ["issues"],
                preserveScroll: true,
                onSuccess: () => {
                    // Invalidate and refetch issues
                    if (typeof router.reload === "function") {
                        router.reload({ only: ["issues"] });
                    } else {
                        router.get(
                            window.location.pathname,
                            {},
                            { only: ["issues"], preserveScroll: true }
                        );
                    }
                },
            }
        );
    };

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
        // Scroll to top of results when changing pages
        const resultsCountElem = document.getElementById("results-count");
        if (resultsCountElem) {
            window.scrollTo({
                top: resultsCountElem.offsetTop - 100,
                behavior: "smooth",
            });
        }
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("All");
        setSelectedStatus("All");
        setSortBy("terbaru");
        setCurrentPage(1);
    };

    return (
        <AuthenticatedUserLayout header="Pengaduan Warga">
            <Head title="Pengaduan Warga" />
            <div className="min-h-screen">
                <div className="mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="mb-2 text-3xl font-bold text-secondary-foreground">
                            Pengaduan Warga
                        </h1>
                        <p className="text-secondary-foreground">
                            Lihat dan dukung keluhan masyarakat
                        </p>
                    </div>

                    {/* Filters and Search */}
                    <div className="p-6 mb-8 border rounded-lg shadow-sm">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {/* Search */}
                            <div className="relative">
                                <Input
                                    placeholder="Cari pengaduan..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className=""
                                    aria-label="Cari pengaduan"
                                />
                            </div>

                            {/* Category Filter */}
                            <Select
                                value={selectedCategory}
                                onValueChange={setSelectedCategory}
                            >
                                <SelectTrigger aria-label="Filter berdasarkan kategori">
                                    <div className="flex items-center gap-2">
                                        <Filter className="w-4 h-4" />
                                        <SelectValue placeholder="Category" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category, index) => (
                                        <SelectItem
                                            key={index}
                                            value={category.name}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Status Filter */}
                            <Select
                                value={selectedStatus}
                                onValueChange={setSelectedStatus}
                            >
                                <SelectTrigger aria-label="Filter berdasarkan status">
                                    <div className="flex items-center gap-2">
                                        <Filter className="w-4 h-4" />
                                        <SelectValue placeholder="Status" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    {statuses.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Sort */}
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger aria-label="Urutkan pengaduan">
                                    <div className="flex items-center gap-2">
                                        <SortAsc className="w-4 h-4" />
                                        <SelectValue placeholder="Sort by" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    {sortOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Active Filters */}
                        {(searchTerm ||
                            selectedCategory !== "All" ||
                            selectedStatus !== "All" ||
                            sortBy !== "newest") && (
                            <div className="flex items-center gap-2 pt-4 mt-4 border-t">
                                <span className="text-sm">Filter aktif:</span>
                                {searchTerm && (
                                    <Badge
                                        variant="secondary"
                                        className="text-xs"
                                    >
                                        Pencarian: {searchTerm}
                                    </Badge>
                                )}
                                {selectedCategory !== "All" && (
                                    <Badge
                                        variant="secondary"
                                        className="text-xs"
                                    >
                                        Kategori: {selectedCategory}
                                    </Badge>
                                )}
                                {selectedStatus !== "All" && (
                                    <Badge
                                        variant="secondary"
                                        className="text-xs"
                                    >
                                        Status: {selectedStatus.toLowerCase()}
                                    </Badge>
                                )}
                                {sortBy !== "newest" && (
                                    <Badge
                                        variant="secondary"
                                        className="text-xs"
                                    >
                                        Urutkan:{" "}
                                        {
                                            sortOptions.find(
                                                (opt) => opt.value === sortBy
                                            )?.label
                                        }
                                    </Badge>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="h-6 px-2 text-xs"
                                >
                                    Hapus Semua
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Results Count */}
                    <div className="mb-6" id="results-count">
                        <p className="text-sm">
                            {filteredAndSortedComplaints.length > 0 ? (
                                <>
                                    Menampilkan {indexOfFirstItem + 1}-
                                    {Math.min(
                                        indexOfLastItem,
                                        filteredAndSortedComplaints.length
                                    )}{" "}
                                    of {filteredAndSortedComplaints.length}{" "}
                                    pengaduan
                                </>
                            ) : (
                                <>
                                    Menampilkan 0 dari {complaints.length}{" "}
                                    pengaduan
                                </>
                            )}
                        </p>
                    </div>

                    {/* Complaints Grid */}
                    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                        {isLoading ? (
                            // Loading skeletons
                            Array.from({ length: itemsPerPage }).map(
                                (_, index) => (
                                    <ComplaintCard
                                        key={index}
                                        complaint={null}
                                        onUpvote={() => {}}
                                        isLoading={true}
                                        currentUserId={auth?.user?.id!}
                                    />
                                )
                            )
                        ) : currentComplaints.length > 0 ? (
                            currentComplaints.map((complaint) => (
                                <ComplaintCard
                                    key={complaint.id}
                                    complaint={complaint}
                                    onUpvote={handleUpvote}
                                    isLoading={isLoading}
                                    currentUserId={auth?.user?.id!}
                                />
                            ))
                        ) : (
                            <EmptyState />
                        )}
                    </div>

                    {/* Pagination */}
                    {filteredAndSortedComplaints.length > 0 && (
                        <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between p-4 mt-8 border rounded-lg shadow-sm">
                            {/* Page Info */}
                            <div className="text-sm">
                                Halaman {currentPage} dari {totalPages} (
                                {filteredAndSortedComplaints.length} pengaduan)
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex items-center gap-4 md:flex-row flex-col">
                                {/* Items per page selector */}
                                <div className="flex items-center gap-2 w-full">
                                    <Select
                                        value={itemsPerPage.toString()}
                                        onValueChange={(value) => {
                                            setItemsPerPage(Number(value));
                                            setCurrentPage(1); // Reset to first page when changing items per page
                                        }}
                                    >
                                        <SelectTrigger className="h-8 text-sm ">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="6">
                                                6 per halaman
                                            </SelectItem>
                                            <SelectItem value="12">
                                                12 per halaman
                                            </SelectItem>
                                            <SelectItem value="18">
                                                18 per halaman
                                            </SelectItem>
                                            <SelectItem value="24">
                                                24 per halaman
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Navigation */}
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handlePageChange(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                        className="h-8 px-3 text-sm"
                                    >
                                        Sebelumnya
                                    </Button>

                                    <div className="flex items-center gap-1">
                                        {/* Show page numbers */}
                                        {Array.from(
                                            { length: Math.min(5, totalPages) },
                                            (_, i) => {
                                                let pageNum;
                                                if (totalPages <= 5) {
                                                    pageNum = i + 1;
                                                } else if (currentPage <= 3) {
                                                    pageNum = i + 1;
                                                } else if (
                                                    currentPage >=
                                                    totalPages - 2
                                                ) {
                                                    pageNum =
                                                        totalPages - 4 + i;
                                                } else {
                                                    pageNum =
                                                        currentPage - 2 + i;
                                                }

                                                return (
                                                    <Button
                                                        key={pageNum}
                                                        variant={
                                                            currentPage ===
                                                            pageNum
                                                                ? "default"
                                                                : "outline"
                                                        }
                                                        size="sm"
                                                        onClick={() =>
                                                            handlePageChange(
                                                                pageNum
                                                            )
                                                        }
                                                        className="w-8 h-8 p-0 text-sm"
                                                    >
                                                        {pageNum}
                                                    </Button>
                                                );
                                            }
                                        )}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                        disabled={currentPage === totalPages}
                                        className="h-8 px-3 text-sm"
                                    >
                                        Selanjutnya
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedUserLayout>
    );
}

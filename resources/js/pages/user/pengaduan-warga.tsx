import { useState, useMemo } from "react";
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
} from "lucide-react";
import AuthenticatedUserLayout from "@/layouts/authenticatedUserLayout";
import { Head } from "@inertiajs/react";
import { IoMegaphone, IoMegaphoneOutline } from "react-icons/io5";

// Mock data for complaints
const mockComplaints = [
    {
        id: 1,
        title: "Pothole on Main Street causing vehicle damage",
        description:
            "There's a large pothole on Main Street near the intersection with Oak Avenue that has been causing damage to vehicles. Multiple residents have reported tire damage and the hole continues to grow larger with each rainfall. This is becoming a serious safety hazard for drivers.",
        category: "Infrastructure",
        status: "Pending",
        submitter: "John Smith",
        date: "2024-01-15",
        upvotes: 23,
        isLiked: false,
    },
    {
        id: 2,
        title: "Pothole on Main Street causing vehicle damage",
        description:
            "There's a large pothole on Main Street near the intersection with Oak Avenue that has been causing damage to vehicles. Multiple residents have reported tire damage and the hole continues to grow larger with each rainfall. This is becoming a serious safety hazard for drivers.",
        category: "Infrastructure",
        status: "Pending",
        submitter: "John Smith",
        date: "2024-01-15",
        upvotes: 23,
        isLiked: false,
    },
    {
        id: 3,
        title: "Pothole on Main Street causing vehicle damage",
        description:
            "There's a large pothole on Main Street near the intersection with Oak Avenue that has been causing damage to vehicles. Multiple residents have reported tire damage and the hole continues to grow larger with each rainfall. This is becoming a serious safety hazard for drivers.",
        category: "Infrastructure",
        status: "Pending",
        submitter: "John Smith",
        date: "2024-01-15",
        upvotes: 23,
        isLiked: false,
    },
    {
        id: 4,
        title: "Pothole on Main Street causing vehicle damage",
        description:
            "There's a large pothole on Main Street near the intersection with Oak Avenue that has been causing damage to vehicles. Multiple residents have reported tire damage and the hole continues to grow larger with each rainfall. This is becoming a serious safety hazard for drivers.",
        category: "Infrastructure",
        status: "Pending",
        submitter: "John Smith",
        date: "2024-01-15",
        upvotes: 23,
        isLiked: false,
    },
    {
        id: 5,
        title: "Pothole on Main Street causing vehicle damage",
        description:
            "There's a large pothole on Main Street near the intersection with Oak Avenue that has been causing damage to vehicles. Multiple residents have reported tire damage and the hole continues to grow larger with each rainfall. This is becoming a serious safety hazard for drivers.",
        category: "Infrastructure",
        status: "Pending",
        submitter: "John Smith",
        date: "2024-01-15",
        upvotes: 23,
        isLiked: false,
    },
    {
        id: 6,
        title: "Pothole on Main Street causing vehicle damage",
        description:
            "There's a large pothole on Main Street near the intersection with Oak Avenue that has been causing damage to vehicles. Multiple residents have reported tire damage and the hole continues to grow larger with each rainfall. This is becoming a serious safety hazard for drivers.",
        category: "Infrastructure",
        status: "Pending",
        submitter: "John Smith",
        date: "2024-01-15",
        upvotes: 23,
        isLiked: false,
    },
    {
        id: 7,
        title: "Pothole on Main Street causing vehicle damage",
        description:
            "There's a large pothole on Main Street near the intersection with Oak Avenue that has been causing damage to vehicles. Multiple residents have reported tire damage and the hole continues to grow larger with each rainfall. This is becoming a serious safety hazard for drivers.",
        category: "Infrastructure",
        status: "Pending",
        submitter: "John Smith",
        date: "2024-01-15",
        upvotes: 23,
        isLiked: false,
    },
    {
        id: 8,
        title: "Pothole on Main Street causing vehicle damage",
        description:
            "There's a large pothole on Main Street near the intersection with Oak Avenue that has been causing damage to vehicles. Multiple residents have reported tire damage and the hole continues to grow larger with each rainfall. This is becoming a serious safety hazard for drivers.",
        category: "Infrastructure",
        status: "Pending",
        submitter: "John Smith",
        date: "2024-01-15",
        upvotes: 23,
        isLiked: false,
    },
    {
        id: 9,
        title: "Pothole on Main Street causing vehicle damage",
        description:
            "There's a large pothole on Main Street near the intersection with Oak Avenue that has been causing damage to vehicles. Multiple residents have reported tire damage and the hole continues to grow larger with each rainfall. This is becoming a serious safety hazard for drivers.",
        category: "Infrastructure",
        status: "Pending",
        submitter: "John Smith",
        date: "2024-01-15",
        upvotes: 23,
        isLiked: false,
    },
    {
        id: 10,
        title: "Illegal dumping in Central Park area",
        description:
            "Someone has been illegally dumping construction waste and household items in the wooded area behind Central Park. This is creating an environmental hazard and attracting pests. The area needs immediate cleanup and better monitoring.",
        category: "Environment",
        status: "In Progress",
        submitter: "Sarah Johnson",
        date: "2024-01-12",
        upvotes: 45,
        isLiked: true,
    },
    {
        id: 11,
        title: "Noise complaints from late-night construction",
        description:
            "Construction work is being conducted at unreasonable hours (past 10 PM) in the residential area on Elm Street. This is disturbing residents' sleep and violating city noise ordinances. Please enforce proper construction hours.",
        category: "Social",
        status: "Resolved",
        submitter: "Mike Davis",
        date: "2024-01-10",
        upvotes: 12,
        isLiked: false,
    },
    {
        id: 12,
        title: "Broken streetlight creating safety hazard",
        description:
            "The streetlight at the corner of Pine and 5th Street has been out for over two weeks. This area is poorly lit at night and creates a safety concern for pedestrians and drivers. Multiple residents have requested repair.",
        category: "Infrastructure",
        status: "In Progress",
        submitter: "Lisa Chen",
        date: "2024-01-08",
        upvotes: 31,
        isLiked: true,
    },
    {
        id: 13,
        title: "Speeding vehicles on residential street",
        description:
            "Cars are consistently speeding through Maple Avenue, which is a residential area with children playing. We need speed bumps or increased police patrol to ensure the safety of our neighborhood.",
        category: "Traffic",
        status: "Pending",
        submitter: "Robert Wilson",
        date: "2024-01-05",
        upvotes: 67,
        isLiked: false,
    },
    {
        id: 14,
        title: "Vandalism at community center",
        description:
            "The community center has been vandalized with graffiti on the exterior walls. This damages the appearance of our neighborhood and needs to be addressed promptly with proper cleanup and security measures.",
        category: "Safety",
        status: "Pending",
        submitter: "Emma Thompson",
        date: "2024-01-03",
        upvotes: 19,
        isLiked: false,
    },
];

const categories = [
    "All",
    "Infrastructure",
    "Environment",
    "Social",
    "Traffic",
    "Safety",
    "Other",
];
const statuses = ["All", "Pending", "In Progress", "Resolved"];
const sortOptions = [
    { value: "terbaru", label: "Terbaru" },
    { value: "terlama", label: "Terlama" },
    { value: "terfavorit", label: "Terfavorit" },
];

const categoryIcons = {
    Infrastructure: Construction,
    Environment: TreePine,
    Social: Users,
    Traffic: Car,
    Safety: Shield,
    Other: Lightbulb,
};

const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
    Resolved: "bg-green-100 text-green-800 border-green-200",
};

function ComplaintCard({
    complaint,
    onUpvote,
    isLoading = false,
}: {
    complaint: any;
    onUpvote: (id: number) => void;
    isLoading: boolean;
}) {
    if (isLoading) {
        return (
            <Card className="h-80 flex flex-col">
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                        <Skeleton className="w-8 h-8 rounded" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div className="space-y-1">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                        <Skeleton className="h-8 w-16" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    const IconComponent =
        categoryIcons[complaint.category as keyof typeof categoryIcons] ||
        Lightbulb;

    return (
        <Card className="h-80 flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
            <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary group-hover:bg-primary/80 transition-colors">
                        <IconComponent
                            className="w-4 h-4 text-primary-foreground"
                            aria-hidden="true"
                        />
                    </div>
                    <Badge
                        className={`${
                            statusColors[
                                complaint.status as keyof typeof statusColors
                            ]
                        } text-xs font-medium`}
                        aria-label={`Status: ${complaint.status}`}
                    >
                        {complaint.status}
                    </Badge>
                </div>
                <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary/80 transition-colors">
                    {complaint.title}
                </h3>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {complaint.description}
                </p>
                <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 space-y-1">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" aria-hidden="true" />
                            <span>
                                {new Date(complaint.date).toLocaleDateString(
                                    "id-ID",
                                    {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <User className="w-3 h-3" aria-hidden="true" />
                            <span>{complaint.submitter}</span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-1 transition-all duration-200 hover:scale-105 ${
                            complaint.isLiked
                                ? "text-red-500 hover:text-red-600"
                                : "text-gray-500 hover:text-red-500"
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onUpvote(complaint.id);
                        }}
                        aria-label={`${
                            complaint.isLiked ? "Unlike" : "Like"
                        } complaint. Current likes: ${complaint.upvotes}`}
                    >
                        <IoMegaphoneOutline
                            className={`w-4 h-4 transition-all duration-200 ${
                                complaint.isLiked ? "fill-current" : ""
                            }`}
                        />
                        <span className="font-medium">{complaint.upvotes}</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function EmptyState() {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No complaints found
            </h3>
            <p className="text-gray-500 max-w-md">
                Try adjusting your search terms or filters to find what you're
                looking for.
            </p>
        </div>
    );
}

export default function PengaduanWargaPage() {
    const [complaints, setComplaints] = useState(mockComplaints);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [sortBy, setSortBy] = useState("terbaru");
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const filteredComplaints = useMemo(() => {
        return complaints.filter((complaint) => {
            const matchesSearch =
                complaint.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                complaint.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            const matchesCategory =
                selectedCategory === "All" ||
                complaint.category === selectedCategory;
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
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    );
                case "terfavorit":
                    return b.upvotes - a.upvotes;
                case "terbaru":
                default:
                    return (
                        new Date(b.date).getTime() - new Date(a.date).getTime()
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

    const handleUpvote = (complaintId: number) => {
        setComplaints((prev) =>
            prev.map((complaint) => {
                if (complaint.id === complaintId) {
                    return {
                        ...complaint,
                        isLiked: !complaint.isLiked,
                        upvotes: complaint.isLiked
                            ? complaint.upvotes - 1
                            : complaint.upvotes + 1,
                    };
                }
                return complaint;
            })
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
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2 text-secondary-foreground">
                            Pengaduan Warga
                        </h1>
                        <p className="text-secondary-foreground">
                            Lihat dan dukung keluhan masyarakat
                        </p>
                    </div>

                    {/* Filters and Search */}
                    <div className="rounded-lg shadow-sm border p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category}
                                            value={category}
                                        >
                                            {category}
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
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t">
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
                                    className="text-xs h-6 px-2"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {isLoading ? (
                            // Loading skeletons
                            Array.from({ length: itemsPerPage }).map(
                                (_, index) => (
                                    <ComplaintCard
                                        key={index}
                                        complaint={null}
                                        onUpvote={() => {}}
                                        isLoading={true}
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
                                />
                            ))
                        ) : (
                            <EmptyState />
                        )}
                    </div>

                    {/* Pagination */}
                    {filteredAndSortedComplaints.length > 0 && (
                        <div className="flex items-center justify-between rounded-lg shadow-sm border p-4 mt-8">
                            {/* Page Info */}
                            <div className="text-sm">
                                Halaman {currentPage} dari {totalPages} (
                                {filteredAndSortedComplaints.length} pengaduan)
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex items-center gap-4">
                                {/* Items per page selector */}
                                <div className="flex items-center gap-2">
                                    <Select
                                        value={itemsPerPage.toString()}
                                        onValueChange={(value) => {
                                            setItemsPerPage(Number(value));
                                            setCurrentPage(1); // Reset to first page when changing items per page
                                        }}
                                    >
                                        <SelectTrigger className=" h-8 text-sm">
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
                                                        className="h-8 w-8 p-0 text-sm"
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

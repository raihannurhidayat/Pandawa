import { useState } from "react";
import { Search, Filter, Plus, Calendar, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, Link, router } from "@inertiajs/react";
import { Issue } from "@/types/issue";
import { Category } from "@/types/category";
import { cn } from "@/lib/utils";

enum ComplaintStatus {
    Open = "open",
    Pending = "pending",
    Resolved = "resolved",
    Closed = "closed",
}

export default function Component({
    categories,
    status,
    issues,
}: {
    categories: Category[];
    status: string[];
    issues: Issue[];
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("latest");
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const getStatusColor = (status: ComplaintStatus | string) => {
        switch (status) {
            case ComplaintStatus.Open:
            case "open":
                return "bg-blue-500/10 backdrop-blur-sm text-blue-800 border border-blue-200/50 shadow-lg ring-1 ring-white/20";
            case ComplaintStatus.Pending:
            case "pending":
                return "bg-amber-500/10 backdrop-blur-sm text-amber-800 border border-amber-200/50 shadow-lg ring-1 ring-white/20";
            case ComplaintStatus.Resolved:
            case "resolved":
                return "bg-green-500/10 backdrop-blur-sm text-green-800 border border-green-200/50 shadow-lg ring-1 ring-white/20";
            case ComplaintStatus.Closed:
            case "closed":
                return "bg-slate-500/10 backdrop-blur-sm text-slate-800 border border-slate-200/50 shadow-lg ring-1 ring-white/20";
            default:
                return "bg-gray-500/10 backdrop-blur-sm text-gray-800 border border-gray-200/50 shadow-lg ring-1 ring-white/20";
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "Jalan":
                return "bg-blue-600/20 backdrop-blur-md text-blue-900 border border-blue-300/60 shadow-xl ring-2 ring-blue-100/30";
            case "Sampah":
                return "bg-red-600/20 backdrop-blur-md text-red-900 border border-red-300/60 shadow-xl ring-2 ring-red-100/30";
            case "Lainnya":
                return "bg-purple-600/20 backdrop-blur-md text-purple-900 border border-purple-300/60 shadow-xl ring-2 ring-purple-100/30";
            default:
                return "bg-gray-600/20 backdrop-blur-md text-gray-900 border border-gray-300/60 shadow-xl ring-2 ring-gray-100/30";
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleCategoryChange = (category: string, checked: boolean) => {
        if (checked) {
            setSelectedCategories([...selectedCategories, category]);
        } else {
            setSelectedCategories(
                selectedCategories.filter((c) => c !== category)
            );
        }
    };

    const handleStatusChange = (status: string, checked: boolean) => {
        if (checked) {
            setSelectedStatuses([...selectedStatuses, status]);
        } else {
            setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
        }
    };

    const applyFilters = () => {
        setIsFilterOpen(false);
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedStatuses([]);
        setSortBy("latest");
        setSearchQuery("");
    };

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(1);
        setSearchQuery(e.target.value);
    };

    const filteredComplaints = issues
        .filter((complaint) =>
            complaint.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(
            (complaint) =>
                selectedCategories.length === 0 ||
                selectedCategories.includes(complaint.issue_category.name)
        )
        .filter(
            (complaint) =>
                selectedStatuses.length === 0 ||
                selectedStatuses.includes(complaint.status)
        )
        .sort((a, b) => {
            const dateA = new Date(a.updated_at).getTime();
            const dateB = new Date(b.updated_at).getTime();
            return sortBy === "latest" ? dateB - dateA : dateA - dateB;
        });

    const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedComplaints = filteredComplaints.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <AuthenticatedLayout header="Pengaduan">
            <Head title="Pengaduan" />
            <div className="min-h-screen">
                <div className="">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Pengaduan
                        </h1>
                        <p className="text-gray-600">
                            Kelola dan pantau pengaduan masyarakat dengan mudah
                        </p>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="p-6 mb-6 bg-white border rounded-lg shadow-sm">
                        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                            <div className="flex flex-col flex-1 w-full gap-3 sm:flex-row lg:w-auto">
                                {/* Search Bar */}
                                <div className="relative flex-1 max-w-full min-w-0 overflow-hidden">
                                    <Search className="absolute z-10 w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none left-3 top-1/2" />
                                    <Input
                                        placeholder="Cari pengaduan berdasarkan judul..."
                                        value={searchQuery}
                                        onChange={handleChangeSearch}
                                        className="w-full pl-10 truncate"
                                    />
                                </div>

                                {/* Filter Button */}
                                <Popover
                                    open={isFilterOpen}
                                    onOpenChange={setIsFilterOpen}
                                >
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="shrink-0"
                                        >
                                            <Filter className="w-4 h-4 mr-2" />
                                            Filter
                                            <Badge
                                                variant="secondary"
                                                className={cn(
                                                    "flex items-center justify-center w-5 h-5 p-0 ml-2 text-xs rounded-full",
                                                    selectedCategories.length ===
                                                        0 &&
                                                        selectedStatuses.length ===
                                                            0 &&
                                                        "invisible"
                                                )}
                                            >
                                                {selectedCategories.length +
                                                    selectedStatuses.length}
                                            </Badge>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-80"
                                        align="start"
                                    >
                                        <div className="space-y-4">
                                            <div>
                                                <Label className="block mb-3 text-sm font-medium">
                                                    Kategori
                                                </Label>
                                                <div className="space-y-2 overflow-y-auto max-h-32">
                                                    {categories.map(
                                                        (category, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                <Checkbox
                                                                    id={`category-${category.name}`}
                                                                    checked={selectedCategories.includes(
                                                                        category.name
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked
                                                                    ) =>
                                                                        handleCategoryChange(
                                                                            category.name,
                                                                            checked as boolean
                                                                        )
                                                                    }
                                                                />
                                                                <Label
                                                                    htmlFor={`category-${category.name}`}
                                                                    className="text-sm"
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </Label>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <Label className="block mb-3 text-sm font-medium">
                                                    Status
                                                </Label>
                                                <div className="space-y-2">
                                                    {status.map(
                                                        (status, index) => (
                                                            <div
                                                                key={status}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                <Checkbox
                                                                    id={`status-${status}`}
                                                                    checked={selectedStatuses.includes(
                                                                        status
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked
                                                                    ) =>
                                                                        handleStatusChange(
                                                                            status,
                                                                            checked as boolean
                                                                        )
                                                                    }
                                                                />
                                                                <Label
                                                                    htmlFor={`status-${status}`}
                                                                    className="text-sm"
                                                                >
                                                                    {status}
                                                                </Label>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex gap-2 pt-2">
                                                <Button
                                                    onClick={applyFilters}
                                                    size="sm"
                                                    className="flex-1"
                                                >
                                                    Terapkan
                                                </Button>
                                                <Button
                                                    onClick={resetFilters}
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1"
                                                >
                                                    Reset
                                                </Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                                {/* Sort Dropdown */}
                                <Select
                                    value={sortBy}
                                    onValueChange={setSortBy}
                                >
                                    <SelectTrigger className="w-full sm:w-48">
                                        <SelectValue placeholder="Urutkan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="latest">
                                            Terbaru
                                        </SelectItem>
                                        <SelectItem value="oldest">
                                            Terlama
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Create Complaint Button */}
                            <Button
                                className="w-full sm:w-auto shrink-0"
                                asChild
                            >
                                <Link href={route("pengaduan.create")}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Buat Pengaduan
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Results Summary */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-600">
                            Menampilkan {paginatedComplaints.length} dari{" "}
                            {filteredComplaints.length} pengaduan
                        </p>
                    </div>

                    {/* Complaint Cards Grid */}
                    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                        {paginatedComplaints.map((complaint) => (
                            <Link href={route("pengaduan.show", complaint.id)}>
                                <Card
                                    key={complaint.id}
                                    className="transition-shadow duration-200 cursor-pointer hover:shadow-lg group"
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-secondary-foreground line-clamp-2">
                                                    {complaint.title}
                                                </h3>
                                            </div>
                                            {/* {complaint.image && (
                                            <img
                                                src={
                                                    complaint.image ||
                                                    "/placeholder.svg"
                                                }
                                                alt="Complaint thumbnail"
                                                className="flex-shrink-0 object-cover w-12 h-12 rounded-lg"
                                            />
                                        )} */}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className={`w-fit ${getStatusColor(
                                                    complaint.status
                                                )}`}
                                            >
                                                {complaint.status}
                                            </Badge>
                                            <Badge
                                                variant="outline"
                                                className={`w-fit ${getCategoryColor(
                                                    complaint.issue_category
                                                        .name
                                                )}`}
                                            >
                                                {complaint.issue_category.name}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                                            {complaint.body}
                                        </p>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Tag className="w-3 h-3" />
                                                <span>
                                                    {
                                                        complaint.issue_category
                                                            .name
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Calendar className="w-3 h-3" />
                                                <span>
                                                    Diperbarui{" "}
                                                    {formatDate(
                                                        complaint.updated_at
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredComplaints.length === 0 && (
                        <div className="py-12 text-center">
                            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                Tidak ada pengaduan ditemukan
                            </h3>
                            <p className="mb-4 text-gray-600">
                                Coba ubah kata kunci pencarian atau filter yang
                                digunakan
                            </p>
                            <Button onClick={resetFilters} variant="outline">
                                Reset Filter
                            </Button>
                        </div>
                    )}

                    {/* Pagination */}
                    {/* {totalPages > 1 && ( */}
                    <div className="flex flex-col items-center justify-between gap-4 p-4 mt-6 bg-white border rounded-lg shadow-sm sm:flex-row">
                        <div className="text-sm text-gray-500">
                            Halaman {currentPage} dari {totalPages} (
                            {filteredComplaints.length} pengaduan)
                        </div>

                        <div className="flex items-center gap-2">
                            <Select
                                value={itemsPerPage.toString()}
                                onValueChange={(value) => {
                                    setItemsPerPage(Number.parseInt(value));
                                    setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Per halaman" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="6">
                                        6 per halaman
                                    </SelectItem>
                                    <SelectItem value="12">
                                        12 per halaman
                                    </SelectItem>
                                    <SelectItem value="24">
                                        24 per halaman
                                    </SelectItem>
                                    <SelectItem value="48">
                                        48 per halaman
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (currentPage > 1)
                                                    setCurrentPage(
                                                        currentPage - 1
                                                    );
                                            }}
                                            className={
                                                currentPage === 1
                                                    ? "pointer-events-none opacity-50"
                                                    : ""
                                            }
                                        />
                                    </PaginationItem>

                                    {totalPages <= 7 ? (
                                        // Show all pages if 7 or fewer
                                        Array.from(
                                            { length: totalPages },
                                            (_, i) => i + 1
                                        ).map((page) => (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(page);
                                                    }}
                                                    isActive={
                                                        currentPage === page
                                                    }
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))
                                    ) : (
                                        // Show limited pages with ellipsis for many pages
                                        <>
                                            {/* First page */}
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(1);
                                                    }}
                                                    isActive={currentPage === 1}
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>

                                            {/* Ellipsis or page 2 */}
                                            {currentPage > 3 && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}

                                            {/* Pages around current page */}
                                            {Array.from(
                                                {
                                                    length: Math.min(
                                                        5,
                                                        totalPages
                                                    ),
                                                },
                                                (_, i) => {
                                                    const pageNum =
                                                        Math.max(
                                                            2,
                                                            Math.min(
                                                                currentPage -
                                                                    Math.floor(
                                                                        Math.min(
                                                                            5,
                                                                            totalPages -
                                                                                2
                                                                        ) / 2
                                                                    ),
                                                                totalPages -
                                                                    Math.min(
                                                                        5,
                                                                        totalPages -
                                                                            1
                                                                    )
                                                            )
                                                        ) + i;
                                                    return pageNum > 1 &&
                                                        pageNum < totalPages
                                                        ? pageNum
                                                        : null;
                                                }
                                            )
                                                .filter(Boolean)
                                                .map((page) => (
                                                    <PaginationItem key={page}>
                                                        <PaginationLink
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setCurrentPage(
                                                                    page as number
                                                                );
                                                            }}
                                                            isActive={
                                                                currentPage ===
                                                                page
                                                            }
                                                        >
                                                            {page}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                ))}

                                            {/* Ellipsis or second-to-last page */}
                                            {currentPage < totalPages - 2 && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}

                                            {/* Last page */}
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(
                                                            totalPages
                                                        );
                                                    }}
                                                    isActive={
                                                        currentPage ===
                                                        totalPages
                                                    }
                                                >
                                                    {totalPages}
                                                </PaginationLink>
                                            </PaginationItem>
                                        </>
                                    )}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (currentPage < totalPages)
                                                    setCurrentPage(
                                                        currentPage + 1
                                                    );
                                            }}
                                            className={
                                                currentPage === totalPages
                                                    ? "pointer-events-none opacity-50"
                                                    : ""
                                            }
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                    {/* )} */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

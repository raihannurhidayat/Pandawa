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
import { Head, router } from "@inertiajs/react";
import { Issue } from "@/types/issue";
import { Category } from "@/types/category";

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

    const handleRedirectToCreateIssue = () => {
        router.get(route("pengaduan.create"));
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Pengaduan
                        </h1>
                        <p className="text-gray-600">
                            Kelola dan pantau pengaduan masyarakat dengan mudah
                        </p>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                            <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full lg:w-auto">
                                {/* Search Bar */}
                                <div className="relative flex-1 min-w-0 max-w-full overflow-hidden">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10 pointer-events-none" />
                                    <Input
                                        placeholder="Cari pengaduan berdasarkan judul..."
                                        value={searchQuery}
                                        onChange={handleChangeSearch}
                                        className="pl-10 w-full truncate"
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
                                            <Filter className="h-4 w-4 mr-2" />
                                            Filter
                                            {(selectedCategories.length > 0 ||
                                                selectedStatuses.length >
                                                    0) && (
                                                <Badge
                                                    variant="secondary"
                                                    className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                                                >
                                                    {selectedCategories.length +
                                                        selectedStatuses.length}
                                                </Badge>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-80"
                                        align="start"
                                    >
                                        <div className="space-y-4">
                                            <div>
                                                <Label className="text-sm font-medium mb-3 block">
                                                    Kategori
                                                </Label>
                                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                                    {categories.map(
                                                        (category, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                <Checkbox
                                                                    id={`category-${index}`}
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
                                                <Label className="text-sm font-medium mb-3 block">
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
                                onClick={handleRedirectToCreateIssue}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Buat Pengaduan
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {paginatedComplaints.map((complaint) => (
                            <Card
                                key={complaint.id}
                                className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 group-hover:text-secondary-foreground transition-colors line-clamp-2">
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
                                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
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
                                                complaint.issue_category.name
                                            )}`}
                                        >
                                            {complaint.issue_category.name}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                        {complaint.body}
                                    </p>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Tag className="h-3 w-3" />
                                            <span>
                                                {complaint.issue_category.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Calendar className="h-3 w-3" />
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
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredComplaints.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <Search className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Tidak ada pengaduan ditemukan
                            </h3>
                            <p className="text-gray-600 mb-4">
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
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border mt-6">
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

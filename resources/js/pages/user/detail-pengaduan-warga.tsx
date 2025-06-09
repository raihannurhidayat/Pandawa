import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock,
    Construction,
    Mail,
    MapPin,
    Phone,
    ThumbsUp,
    User,
    Wrench,
    CheckCircle,
    XCircle,
    AlertCircle,
} from "lucide-react";
import AuthenticatedUserLayout from "@/layouts/authenticatedUserLayout";
import { Head } from "@inertiajs/react";

// Mock data for the complaint
const complaintData = {
    id: "CMP-2024-001",
    title: "Broken Street Light on Main Street",
    description:
        "The street light at the intersection of Main Street and Oak Avenue has been flickering for the past week and completely went out yesterday evening. This creates a safety hazard for pedestrians and drivers, especially during nighttime hours. The area becomes very dark and difficult to navigate safely.",
    category: "Infrastructure",
    status: "In Progress",
    upvotes: 23,
    submissionDate: "2024-01-15",
    lastUpdated: "2024-01-18",
    location: {
        address: "Main Street & Oak Avenue, Downtown District",
        coordinates: { lat: 40.7128, lng: -74.006 },
    },
    attachments: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
    ],
    reporter: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        address: "123 Oak Avenue, Downtown District",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    comments: [
        {
            id: 1,
            author: "City Maintenance Dept",
            date: "2024-01-16",
            message:
                "Thank you for reporting this issue. We have dispatched a team to assess the situation and will provide an update within 48 hours.",
            isOfficial: true,
        },
        {
            id: 2,
            author: "Mike Chen",
            date: "2024-01-17",
            message:
                "I live nearby and can confirm this is a real safety concern. Thank you Sarah for reporting it!",
            isOfficial: false,
        },
        {
            id: 3,
            author: "City Maintenance Dept",
            date: "2024-01-18",
            message:
                "Update: Our technician has identified the issue as a faulty transformer. Replacement parts have been ordered and installation is scheduled for January 20th.",
            isOfficial: true,
        },
    ],
};

// Enhanced status configuration with individual steps
const statusSteps = [
    { name: "Open", icon: AlertCircle, description: "Report submitted" },
    { name: "Pending", icon: Clock, description: "Under review" },
    { name: "In Progress", icon: Wrench, description: "Being addressed" },
    { name: "Resolved", icon: CheckCircle, description: "Issue fixed" },
    { name: "Closed", icon: XCircle, description: "Case closed" },
];

// Mock status history to show progress (you can modify this based on your data)
const statusHistory = {
    Open: { status: "completed", date: "2024-01-15" },
    Pending: { status: "completed", date: "2024-01-16" },
    "In Progress": { status: "current", date: "2024-01-17" },
    Resolved: { status: "pending", date: null },
    Closed: { status: "pending", date: null },
};

// You can also simulate a rejected case by uncommenting below:
// const statusHistory = {
//   "Open": { status: "completed", date: "2024-01-15" },
//   "Pending": { status: "completed", date: "2024-01-16" },
//   "In Progress": { status: "rejected", date: "2024-01-17", reason: "Insufficient information" },
//   "Resolved": { status: "pending", date: null },
//   "Closed": { status: "pending", date: null },
// }

const categoryIcons = {
    Infrastructure: Construction,
    Environment: MapPin,
    Safety: AlertCircle,
};

export default function DetailPengaduanWarga() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState(complaintData.comments);

    const currentStatus = complaintData.status as keyof typeof statusHistory;
    const CategoryIcon =
        categoryIcons[complaintData.category as keyof typeof categoryIcons];

    const handleSubmitComment = () => {
        if (newComment.trim()) {
            const comment = {
                id: comments.length + 1,
                author: "Current User",
                date: new Date().toISOString().split("T")[0],
                message: newComment,
                isOfficial: false,
            };
            setComments([...comments, comment]);
            setNewComment("");
        }
    };

    const navigateImage = (direction: "prev" | "next") => {
        if (selectedImage === null) return;

        if (direction === "prev") {
            setSelectedImage(
                selectedImage > 0
                    ? selectedImage - 1
                    : complaintData.attachments.length - 1
            );
        } else {
            setSelectedImage(
                selectedImage < complaintData.attachments.length - 1
                    ? selectedImage + 1
                    : 0
            );
        }
    };

    return (
        <AuthenticatedUserLayout header="Detail Pengaduan Warga">
            <Head title="Detail Pengaduan Warga" />
            <div className="min-h-screen p-4 md:p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content - Left 2/3 */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Complaint Overview */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-lg">
                                            <CategoryIcon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <CardTitle className="text-2xl font-bold">
                                                    {complaintData.title}
                                                </CardTitle>
                                                <div className="flex items-center gap-1 text-destructive">
                                                    <ThumbsUp className="h-4 w-4" />
                                                    <span className="text-sm font-medium">
                                                        {complaintData.upvotes}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm mb-4">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    Submitted:{" "}
                                                    {
                                                        complaintData.submissionDate
                                                    }
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    {
                                                        complaintData.location
                                                            .address
                                                    }
                                                </span>
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className="mb-4"
                                            >
                                                {complaintData.category}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="leading-relaxed">
                                        {complaintData.description}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Enhanced Status Display */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Construction className="h-5 w-5" />
                                        Status Progress
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {/* Current Status Badge */}
                                        <div className="flex items-center justify-between">
                                            <Badge
                                                className={`${
                                                    statusHistory[
                                                        complaintData.status as keyof typeof statusHistory
                                                    ]?.status === "completed"
                                                        ? "bg-green-500"
                                                        : statusHistory[
                                                              complaintData.status as keyof typeof statusHistory
                                                          ]?.status ===
                                                          "current"
                                                        ? "bg-blue-500"
                                                        : statusHistory[
                                                              complaintData.status as keyof typeof statusHistory
                                                          ]?.status ===
                                                          "rejected"
                                                        ? "bg-red-500"
                                                        : "bg-gray-500"
                                                } px-3 py-1`}
                                            >
                                                {complaintData.status}
                                            </Badge>
                                            <span className="text-sm">
                                                Last updated:{" "}
                                                {complaintData.lastUpdated}
                                            </span>
                                        </div>

                                        {/* Step-by-step Progress */}
                                        <div className="space-y-4">
                                            {statusSteps.map((step, index) => {
                                                const stepStatus =
                                                    statusHistory[
                                                        step.name as keyof typeof statusHistory
                                                    ];
                                                const StepIcon = step.icon;

                                                return (
                                                    <div
                                                        key={step.name}
                                                        className="flex items-center gap-4"
                                                    >
                                                        {/* Step Icon with Status Color */}
                                                        <div
                                                            className={`
                            flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                            ${
                                stepStatus.status === "completed"
                                    ? "bg-green-100 border-green-500 text-green-700"
                                    : stepStatus.status === "current"
                                    ? "bg-blue-100 border-blue-500 text-blue-700 ring-4 ring-blue-100"
                                    : stepStatus.status === "rejected"
                                    ? "bg-red-100 border-red-500 text-red-700"
                                    : "bg-gray-100 border-gray-300 text-gray-500"
                            }
                          `}
                                                        >
                                                            <StepIcon className="h-5 w-5" />
                                                        </div>

                                                        {/* Step Content */}
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <h4
                                                                        className={`font-medium ${
                                                                            stepStatus.status ===
                                                                            "completed"
                                                                                ? "text-green-700"
                                                                                : stepStatus.status ===
                                                                                  "current"
                                                                                ? "text-blue-700"
                                                                                : stepStatus.status ===
                                                                                  "rejected"
                                                                                ? "text-red-700"
                                                                                : "text-gray-500"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            step.name
                                                                        }
                                                                    </h4>
                                                                    <p className="text-sm">
                                                                        {
                                                                            step.description
                                                                        }
                                                                    </p>
                                                                    {stepStatus.status ===
                                                                        "rejected" && (
                                                                        <p className="text-sm text-red-600 mt-1">
                                                                            Reason:{" "}
                                                                            {(
                                                                                statusHistory as any
                                                                            )[
                                                                                step
                                                                                    .name
                                                                            ]
                                                                                ?.reason ||
                                                                                "See comments for details"}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                {stepStatus.date && (
                                                                    <span className="text-xs text-gray-500">
                                                                        {
                                                                            stepStatus.date
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Progress Bar */}
                                                            {index <
                                                                statusSteps.length -
                                                                    1 && (
                                                                <div className="mt-3 ml-5">
                                                                    <div className="w-0.5 h-8 bg-gray-200 relative">
                                                                        <div
                                                                            className={`
                                    absolute top-0 w-full transition-all duration-500
                                    ${
                                        stepStatus.status === "completed"
                                            ? "h-full bg-green-500"
                                            : stepStatus.status === "current"
                                            ? "h-1/2 bg-blue-500"
                                            : stepStatus.status === "rejected"
                                            ? "h-full bg-red-500"
                                            : "h-0 bg-gray-300"
                                    }
                                  `}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Status Indicator */}
                                                        <div className="flex items-center">
                                                            {stepStatus.status ===
                                                                "completed" && (
                                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                            )}
                                                            {stepStatus.status ===
                                                                "current" && (
                                                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                                                            )}
                                                            {stepStatus.status ===
                                                                "rejected" && (
                                                                <XCircle className="h-5 w-5 text-red-500" />
                                                            )}
                                                            {stepStatus.status ===
                                                                "pending" && (
                                                                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Overall Progress Bar */}
                                        <div className="pt-4 border-t">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium">
                                                    Overall Progress
                                                </span>
                                                <span className="text-sm">
                                                    {
                                                        Object.values(
                                                            statusHistory
                                                        ).filter(
                                                            (s) =>
                                                                s.status ===
                                                                "completed"
                                                        ).length
                                                    }{" "}
                                                    of {statusSteps.length}{" "}
                                                    completed
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-700"
                                                    style={{
                                                        width: `${
                                                            (Object.values(
                                                                statusHistory
                                                            ).filter(
                                                                (s) =>
                                                                    s.status ===
                                                                    "completed"
                                                            ).length /
                                                                statusSteps.length) *
                                                            100
                                                        }%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Image Attachments */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Evidence Photos</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {complaintData.attachments.map(
                                            (image, index) => (
                                                <Dialog key={index}>
                                                    <DialogTrigger asChild>
                                                        <div
                                                            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                                            onClick={() =>
                                                                setSelectedImage(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src={
                                                                    image ||
                                                                    "/placeholder.svg"
                                                                }
                                                                alt={`Evidence ${
                                                                    index + 1
                                                                }`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-4xl w-full p-0">
                                                        <div className="relative">
                                                            <img
                                                                src={
                                                                    complaintData
                                                                        .attachments[
                                                                        selectedImage ||
                                                                            0
                                                                    ]
                                                                }
                                                                alt="Evidence"
                                                                className="w-full h-auto max-h-[80vh] object-contain"
                                                            />
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                                                                onClick={() =>
                                                                    navigateImage(
                                                                        "prev"
                                                                    )
                                                                }
                                                            >
                                                                <ChevronLeft className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                                                                onClick={() =>
                                                                    navigateImage(
                                                                        "next"
                                                                    )
                                                                }
                                                            >
                                                                <ChevronRight className="h-4 w-4" />
                                                            </Button>
                                                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                                                {(selectedImage ||
                                                                    0) + 1}{" "}
                                                                of{" "}
                                                                {
                                                                    complaintData
                                                                        .attachments
                                                                        .length
                                                                }
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            )
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Comments Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Updates & Comments</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="flex gap-3"
                                        >
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback>
                                                    {comment.author
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-sm">
                                                        {comment.author}
                                                    </span>
                                                    {comment.isOfficial && (
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            Official
                                                        </Badge>
                                                    )}
                                                    <span className="text-xs">
                                                        {comment.date}
                                                    </span>
                                                </div>
                                                <div className="rounded-lg p-3 text-sm">
                                                    {comment.message}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <Separator />

                                    <div className="space-y-3">
                                        <Textarea
                                            placeholder="Add a comment or update..."
                                            value={newComment}
                                            onChange={(e) =>
                                                setNewComment(e.target.value)
                                            }
                                            className="min-h-[80px]"
                                        />
                                        <Button
                                            onClick={handleSubmitComment}
                                            disabled={!newComment.trim()}
                                        >
                                            Post Comment
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar - Right 1/3 */}
                        <div className="space-y-6">
                            {/* Reporter Profile Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Reporter Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage
                                                src={
                                                    complaintData.reporter
                                                        .avatar ||
                                                    "/placeholder.svg"
                                                }
                                            />
                                            <AvatarFallback>
                                                <User className="h-6 w-6" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold">
                                                {complaintData.reporter.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Citizen Reporter
                                            </p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="h-4 w-4 text-gray-500" />
                                            <span>
                                                {complaintData.reporter.email}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="h-4 w-4 text-gray-500" />
                                            <span>
                                                {complaintData.reporter.phone}
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm">
                                            <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                                            <span>
                                                {complaintData.reporter.address}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <span>
                                                Submitted on{" "}
                                                {complaintData.submissionDate}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Location Map Preview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Location
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                        <div className="text-center text-gray-500">
                                            <MapPin className="h-8 w-8 mx-auto mb-2" />
                                            <p className="text-sm">
                                                Map Preview
                                            </p>
                                            <p className="text-xs">
                                                {complaintData.location.address}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Quick Actions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                    >
                                        <ThumbsUp className="h-4 w-4 mr-2" />
                                        Support This Report
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                    >
                                        <MapPin className="h-4 w-4 mr-2" />
                                        View on Map
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                    >
                                        <Mail className="h-4 w-4 mr-2" />
                                        Contact Reporter
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedUserLayout>
    );
}

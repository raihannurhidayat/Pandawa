import { FormEventHandler, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { BiMessageCheck } from "react-icons/bi";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
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
    LucideIcon,
    MegaphoneIcon,
    Megaphone,
    Settings,
    ThumbsDown,
    FileCheck,
    CheckSquare,
    FileX,
    Hammer,
    Ban,
    FileClock,
    MessageCircleX,
    MessageSquare,
    Plus,
} from "lucide-react";
import AuthenticatedUserLayout from "@/layouts/authenticatedUserLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { Issue } from "@/types/issue";
import { Send, Hourglass, ClipboardList, HelpCircle } from "lucide-react";
import { IoMegaphoneOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import FeedbackComponent from "@/components/shared/tabbed-feedback";
import { toast } from "sonner";
import UserAvatar from "@/components/user-avatar";
import UsernameLink from "@/components/username-link";
import { useLocation } from "@/hooks/use-location";
import LocationInput from "@/components/forms/location-utils";

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
};

const statusColorMap: Record<string, string> = {
    pending: "text-gray-500",
    in_progress: "text-blue-700",
    resolved: "text-green-700",
    closed: "text-red-600",
};

const StatusIconMap: Record<string, LucideIcon | IconType> = {
    // Step 1: Pengajuan
    "Pengaduan diajukan": Send,
    "Pengaduan diproses": Settings,
    "Pengaduan diterima": CheckCircle,
    "Pengaduan ditolak": ThumbsDown,

    // Step 2: Tindak lanjut / Penyusunan solusi
    "Menunggu tindak lanjut": Hourglass,
    "Penyusunan solusi": FileCheck,
    "Solusi disetujui": CheckSquare,
    "Solusi ditolak": FileX,

    // Step 3: Eksekusi solusi
    "Persiapan pelaksanaan": ClipboardList,
    "Pelaksanaan solusi": Hammer,
    "Pelaksanaan selesai": CheckCircle,
    "Pelaksanaan dibatalkan": Ban,

    // Step 4: Penyelesaian
    "Menunggu konfirmasi": HelpCircle,
    "Konfirmasi diproses": FileClock,
    "Pengaduan selesai": BiMessageCheck,
    "Pengaduan ditutup": MessageCircleX,
};

const statusIconColor: Record<string, string> = {
    pending: "bg-gray-100 border-gray-300 text-gray-500",
    in_progress:
        "bg-blue-100 border-blue-500 text-blue-700 ring-4 ring-blue-100",
    resolved: "bg-green-100 border-green-500 text-green-700",
    closed: "bg-red-200 border-red-400 text-red-600",
};

const statusBarColorMap: Record<string, string> = {
    pending: "h-0 bg-gray-300",
    in_progress: "h-1/2 bg-blue-500",
    resolved: "h-full bg-green-500",
    closed: "h-full bg-red-400",
};

const categoryIcons = {
    Infrastructure: Construction,
    Environment: MapPin,
    Safety: AlertCircle,
};

export default function DetailPengaduanWarga({ issue }: { issue: Issue }) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [newComment, setNewComment] = useState("");
    const [isHandleSubmitLoading, setIsHandleSubmitLoading] = useState(false);

    const CategoryIcon =
        categoryIcons[complaintData.category as keyof typeof categoryIcons];

    const { data, setData } = useForm({
        comment: "",
    });

    const { coordinats } = useLocation(issue.location);

    console.log(issue);

    const handleSubmitComment: FormEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();

        router.post(
            route("comments.store"),
            {
                commentable_type: "App\\Models\\Issue",
                id: issue.id,
                comment: data.comment,
            },
            {
                only: ["comments"],
                preserveScroll: true,
                onStart: () => {
                    setIsHandleSubmitLoading(true);
                    toast.loading("Updating...", { id: "update" });
                },
                onSuccess: () => {
                    toast.success("Update successful", {
                        id: "update",
                        richColors: true,
                    });

                    router.reload();
                },
                onError: () => toast.error("Update failed", { id: "update" }),
                onFinish: () => {
                    setNewComment("");
                    setIsHandleSubmitLoading(false);
                },
            }
        );
    };

    const navigateImage = (direction: "prev" | "next") => {
        if (selectedImage === null) return;

        if (direction === "prev") {
            setSelectedImage(
                selectedImage > 0
                    ? selectedImage - 1
                    : issue.attachments.length - 1
            );
        } else {
            setSelectedImage(
                selectedImage < issue.attachments.length - 1
                    ? selectedImage + 1
                    : 0
            );
        }
    };

    const isIssueClosed = issue.phases.some(
        (phase) => phase.status === "closed"
    );

    const currentIssue =
        issue?.phases
            ?.filter((item) => item?.is_active === 1)
            .sort((a: any, b: any) => {
                const aTime = new Date(
                    a?.activated_at || a?.created_at
                ).getTime();
                const bTime = new Date(
                    b?.activated_at || b?.created_at
                ).getTime();

                return bTime - aTime;
            })[0]?.title ?? "Pengaduan Telah Selesai";

    const [visibleComments, setVisibleComments] = useState(5);
    const COMMENTS_PER_LOAD = 5;
    const totalComments = issue.comments.length;
    const hasMoreComments = visibleComments < totalComments;

    const handleShowMore = () => {
        setVisibleComments((prev) =>
            Math.min(prev + COMMENTS_PER_LOAD, totalComments)
        );
    };

    const displayedComments = issue.comments.slice(0, visibleComments);

    return (
        <AuthenticatedUserLayout header="Detail Pengaduan Warga">
            <Head title="Detail Pengaduan Warga" />
            <div className="min-h-screen p-4 md:p-6">
                <div className="mx-auto space-y-6 max-w-7xl">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Main Content - Left 2/3 */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Complaint Overview */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-lg">
                                            <CategoryIcon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between gap-3 mb-2">
                                                <CardTitle className="text-2xl font-bold">
                                                    {issue.title}
                                                </CardTitle>
                                                <div
                                                    className={`flex items-center gap-1 text-destructive ${buttonVariants(
                                                        { variant: "outline" }
                                                    )} hover:bg-transparent hover:shadow-none hover:opacity-100 hover:ring-0 hover:border-inherit hover:text-destructive`}
                                                >
                                                    <IoMegaphoneOutline className="w-4 h-4 text-destructive" />
                                                    <span className="text-sm font-medium">
                                                        {issue.likes_count}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 mb-4 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    Diajukan:{" "}
                                                    {issue.created_at_relative}
                                                </span>
                                                {/* <span className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {
                                                        complaintData.location
                                                            .address
                                                    }
                                                </span> */}
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className="mb-4"
                                            >
                                                {issue.issue_category.name}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="leading-relaxed">
                                        {issue.body}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Enhanced Status Display */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Construction className="w-5 h-5" />
                                        Status Progress
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {/* Current Status Badge */}
                                        <div className="flex items-center justify-between">
                                            <Badge
                                                className={`${
                                                    isIssueClosed
                                                        ? "bg-destructive text-destructive-foreground hover:bg-destructive hover:shadow-none hover:opacity-100 hover:ring-0 hover:border-inherit"
                                                        : "bg-primary"
                                                } px-3 py-1 hidden md:block`}
                                            >
                                                {currentIssue}
                                            </Badge>
                                            <span className="text-sm">
                                                Last updated:{" "}
                                                {issue.updated_at_formatted}
                                            </span>
                                        </div>

                                        {/* Step-by-step Progress */}
                                        <div className="space-y-4">
                                            {issue.phases
                                                .filter((p) => !!p.activated_at)
                                                .map((phase, index) => {
                                                    const StepIconPhase =
                                                        StatusIconMap[
                                                            phase?.title!
                                                        ];

                                                    const activatedPhase =
                                                        issue.phases.filter(
                                                            (phase) =>
                                                                !!phase.activated_at
                                                        );

                                                    return (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-4 "
                                                        >
                                                            <div className="flex flex-col w-full">
                                                                <div className="flex items-center justify-between gap-4">
                                                                    {/* Icon */}
                                                                    <div
                                                                        className={`
    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
    ${
        statusIconColor[phase.status] ||
        "bg-gray-100 border-gray-300 text-gray-500"
    }
  `}
                                                                    >
                                                                        <StepIconPhase className="w-5 h-5" />
                                                                    </div>
                                                                    {/* Step */}
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center justify-between ">
                                                                            <div>
                                                                                <h4
                                                                                    className={`font-medium ${
                                                                                        statusColorMap[
                                                                                            phase
                                                                                                .status
                                                                                        ] ||
                                                                                        " border-gray-300 text-gray-500"
                                                                                    }`}
                                                                                >
                                                                                    {
                                                                                        phase.title
                                                                                    }
                                                                                </h4>
                                                                                <p className="text-sm">
                                                                                    {
                                                                                        phase.status
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                            {phase.created_at && (
                                                                                <span className="text-xs text-gray-500">
                                                                                    {
                                                                                        phase.created_at_formatted
                                                                                    }
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    {/* Status indikator */}
                                                                    <div className="flex items-center">
                                                                        {phase.status ===
                                                                            "pending" && (
                                                                            <div className="w-5 h-5 bg-gray-300 rounded-full" />
                                                                        )}
                                                                        {phase.status ===
                                                                            "in_progress" && (
                                                                            <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse" />
                                                                        )}
                                                                        {phase.status ===
                                                                            "resolved" && (
                                                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                                                        )}
                                                                        {phase.status ===
                                                                            "closed" && (
                                                                            <XCircle className="w-5 h-5 text-gray-500" />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {/* Progress Bar */}
                                                                {index <
                                                                    activatedPhase.length -
                                                                        1 && (
                                                                    <div className="mt-3 ml-5">
                                                                        <div className="w-0.5 h-8 bg-gray-200 relative">
                                                                            <div
                                                                                className={`
                                    absolute top-0 w-full transition-all duration-500
                                    ${statusBarColorMap[phase.status]}
                                  `}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                        </div>

                                        {/* Overall Progress Bar */}
                                        <div className="pt-4 border-t">
                                            {isIssueClosed ? (
                                                <div className="flex items-center justify-between px-2 py-1 mb-2 rounded-md text-destructive bg-secondary">
                                                    <h2 className="text-sm text-red-600">
                                                        Pengaduan Ditolak
                                                    </h2>
                                                    <div
                                                        className={`${buttonVariants(
                                                            { variant: "ghost" }
                                                        )} bg-secondary`}
                                                    >
                                                        <XCircle className="text-red-600 size-6" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-medium">
                                                            Overall Progress
                                                        </span>
                                                        <span className="text-sm">
                                                            {
                                                                issue.phases.filter(
                                                                    (s) =>
                                                                        s.status ===
                                                                        "resolved"
                                                                ).length
                                                            }{" "}
                                                            of{" "}
                                                            {
                                                                issue.phases
                                                                    .length
                                                            }{" "}
                                                            Resolved
                                                        </span>
                                                    </div>
                                                    <div className="w-full h-2 bg-gray-200 rounded-full">
                                                        <div
                                                            className="h-2 transition-all duration-700 rounded-full bg-gradient-to-r from-green-500 to-blue-500"
                                                            style={{
                                                                width: `${
                                                                    (issue.phases.filter(
                                                                        (s) =>
                                                                            s.status ===
                                                                            "resolved"
                                                                    ).length /
                                                                        issue
                                                                            .phases
                                                                            .length) *
                                                                    100
                                                                }%`,
                                                            }}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Image Attachments */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Bukti Pendukung</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {issue.attachments.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                            {issue.attachments.map(
                                                (image, index) => (
                                                    <Dialog key={index}>
                                                        <DialogTrigger asChild>
                                                            <div
                                                                className="relative overflow-hidden transition-opacity rounded-lg cursor-pointer aspect-square hover:opacity-90"
                                                                onClick={() =>
                                                                    setSelectedImage(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <img
                                                                    src={
                                                                        image.url
                                                                    }
                                                                    alt={`Evidence ${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                    className="object-cover w-full h-full"
                                                                />
                                                            </div>
                                                        </DialogTrigger>
                                                        <DialogContent className="w-full max-w-4xl p-0">
                                                            <div className="relative">
                                                                <img
                                                                    src={
                                                                        issue
                                                                            .attachments[
                                                                            selectedImage ||
                                                                                0
                                                                        ].url
                                                                    }
                                                                    alt="Evidence"
                                                                    className="w-full h-auto max-h-[80vh] object-contain"
                                                                />
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="absolute transform -translate-y-1/2 left-4 top-1/2 "
                                                                    onClick={() =>
                                                                        navigateImage(
                                                                            "prev"
                                                                        )
                                                                    }
                                                                >
                                                                    <ChevronLeft className="w-4 h-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="absolute transform -translate-y-1/2 right-4 top-1/2 "
                                                                    onClick={() =>
                                                                        navigateImage(
                                                                            "next"
                                                                        )
                                                                    }
                                                                >
                                                                    <ChevronRight className="w-4 h-4" />
                                                                </Button>
                                                                <div className="absolute px-3 py-1 text-sm text-white transform -translate-x-1/2 rounded-full bottom-4 left-1/2 bg-black/50">
                                                                    {(selectedImage ||
                                                                        0) +
                                                                        1}{" "}
                                                                    of{" "}
                                                                    {
                                                                        issue
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
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed">
                                            <div className="p-4 mb-4 rounded-full bg-muted">
                                                <FileX className="md:h-8 md:w-8 size-6 text-muted-foreground" />
                                            </div>
                                            <h3 className="mb-2 text-sm font-medium md:text-lg text-foreground">
                                                Tidak Ada Bukti Pendukung
                                            </h3>
                                            <p className="max-w-sm mb-4 text-xs md:text-sm text-muted-foreground">
                                                Tidak ada file atau gambar yang
                                                diunggah sebagai bukti pendukung
                                                untuk pengaduan ini.
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Comments Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Comments</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {issue.comments.length > 0 ? (
                                        <div className="">
                                            <div className="space-y-4">
                                                {displayedComments.map(
                                                    (comment) => (
                                                        <div
                                                            key={comment.id}
                                                            className="flex gap-3"
                                                        >
                                                            <UserAvatar
                                                                user={
                                                                    comment.user
                                                                }
                                                                size="sm"
                                                            />

                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="text-sm font-medium">
                                                                        {
                                                                            comment
                                                                                .user
                                                                                .name
                                                                        }
                                                                    </span>
                                                                    {comment
                                                                        .user
                                                                        .role ===
                                                                        "admin" && (
                                                                        <Badge
                                                                            variant="outline"
                                                                            className="text-xs"
                                                                        >
                                                                            Official
                                                                        </Badge>
                                                                    )}
                                                                    <span className="text-xs text-muted-foreground">
                                                                        {
                                                                            comment.updated_at_formatted
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="p-3 text-sm rounded-lg bg-muted">
                                                                    {
                                                                        comment.body
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>

                                            {hasMoreComments && (
                                                <div className="mt-6 text-center">
                                                    <Button
                                                        variant="link"
                                                        onClick={handleShowMore}
                                                        className="w-full sm:w-auto"
                                                    >
                                                        Show (
                                                        {Math.min(
                                                            COMMENTS_PER_LOAD,
                                                            totalComments -
                                                                visibleComments
                                                        )}
                                                        ) more comments
                                                    </Button>
                                                </div>
                                            )}

                                            {!hasMoreComments &&
                                                totalComments > 5 && (
                                                    <div className="mt-6 text-center">
                                                        <p className="text-sm text-muted-foreground">
                                                            All {totalComments}{" "}
                                                            comments loaded
                                                        </p>
                                                    </div>
                                                )}
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center border rounded-xl ">
                                            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full">
                                                <MessageSquare className="w-6 h-6 text-secondary-foreground" />
                                            </div>

                                            <h3 className="mb-2 text-base font-medium">
                                                No comments
                                            </h3>

                                            <p className="max-w-xs mx-auto mb-6 text-sm text-secondary-foreground">
                                                Start a conversation by sharing
                                                your thoughts or asking a
                                                question.
                                            </p>
                                        </div>
                                    )}

                                    <Separator />

                                    <form
                                        onSubmit={handleSubmitComment}
                                        className="space-y-3"
                                    >
                                        <Textarea
                                            placeholder="Add a comment or update..."
                                            value={newComment}
                                            onChange={(e) => {
                                                setNewComment(e.target.value);
                                                setData(
                                                    "comment",
                                                    e.target.value
                                                );
                                            }}
                                            className="min-h-[80px]"
                                        />
                                        <Button
                                            type="submit"
                                            disabled={
                                                !newComment.trim() ||
                                                isHandleSubmitLoading
                                            }
                                        >
                                            Post Comment
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar - Right 1/3 */}
                        <div className="space-y-6">
                            {/* Reporter Profile Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Informasi Pengadu
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage
                                            // src={
                                            //     complaintData.reporter
                                            //         .avatar
                                            // }
                                            />
                                            <AvatarFallback>
                                                <User className="w-6 h-6" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold">
                                                {issue.user.name}
                                            </h3>
                                            <UsernameLink user={issue.user} />
                                            <p className="text-sm text-gray-600">
                                                Masyarakat
                                            </p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="w-4 h-4 text-gray-500" />
                                            <span>{issue.user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            <span>
                                                Diajukan{" "}
                                                {issue.created_at_relative}
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
                                    {coordinats ? (
                                        <LocationInput
                                            isEditable={false}
                                            value={coordinats?.location}
                                            defaultLocation={
                                                coordinats?.location
                                            }
                                            placeholder="Click to select your location"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center rounded-lg aspect-video border-2 border-dashed">
                                            <div className="text-center text-gray-500">
                                                <MapPin className="w-8 h-8 mx-auto mb-2" />
                                                <p className="text-sm">
                                                    Tidak Ada Map Preview
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Feedback Section */}
                    <div className="max-w-md sm:max-w-full">
                        <FeedbackComponent phasesData={issue.phases} />
                    </div>
                </div>
            </div>
        </AuthenticatedUserLayout>
    );
}

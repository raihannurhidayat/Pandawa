import CTAHeader from "@/components/cta-header";
import UpdatePhase from "@/components/forms/issues/update-phase";
import ImageGallery from "@/components/image-gallery";
import { ResponsiveDialog } from "@/components/responsive-dialog";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Auth } from "@/types/auth";
import { Issue, Phase, PhaseStatus } from "@/types/issue";
import { Head, Link, router, usePage } from "@inertiajs/react";
import {
    AlertTriangle,
    CheckCircle,
    EditIcon,
    MoreHorizontal,
    PlusCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ShowIssue({ issue }: { issue: Issue }) {
    const { auth } = usePage<PageProps<{ auth: Auth }>>().props;

    const [galleryOpen, setGalleryOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [phaseGalleryOpen, setPhaseGalleryOpen] = useState(false);
    const [phaseGalleryIndex, setPhaseGalleryIndex] = useState(0);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [activePhase, setActivePhase] = useState<Phase>(() => {
        const index = issue.phases.findIndex((phase) => phase.is_active);
        return issue.phases[index !== -1 ? index : 0]; // Fallback to 0 if no active phase is found
    });

    // whenever issue.phases changes, pick up the new "active" one
    useEffect(() => {
        const idx = issue.phases.findIndex((p) => p.is_active);
        setActivePhase(issue.phases[idx !== -1 ? idx : 0]);
    }, [issue.phases]);

    function toggleGallery(e: any) {
        setGalleryIndex(0);
        setGalleryOpen(true);
    }

    function togglePhaseGallery(e: any) {
        setPhaseGalleryIndex(0);
        setPhaseGalleryOpen(true);
    }

    function resolvePhase() {
        router.post(
            route("phase.resolve", activePhase.id),
            { _method: "put" },
            {
                onSuccess: () => {
                    toast.success("Update successful", {
                        id: "Update",
                        richColors: true,
                    });
                    router.reload();
                },
                onError: () => {
                    toast.error("Update failed", { id: "Update" });
                },
                onStart: () => {
                    toast.loading("Updating in...", { id: "Update" });
                },
            }
        );
    }

    // to be deleted in prod
    console.log(issue);
    console.log(activePhase.status === PhaseStatus.Resolved);

    function PhaseCard({
        phase,
        isActive = false,
        onClick,
        className,
    }: {
        phase: Phase;
        isActive?: boolean;
        onClick?: () => void;
        className?: string;
    }) {
        return (
            <Card
                className={cn(
                    "flex flex-1 transition-colors ease-in-out cursor-pointer h-full",
                    isActive
                        ? "bg-green-50 border-green-200 hover:bg-green-100"
                        : "bg-transparent shadow-none border-transparent hover:border-inherit hover:bg-gray-50",
                    className
                )}
                onClick={onClick}
            >
                <CardHeader className="w-full p-3 xl:p-6">
                    <div className="flex flex-row justify-between flex-1 w-full gap-4">
                        <div className="flex flex-col justify-between w-full gap-2">
                            <CardTitle className={cn(
                                "font-semibold text-start text-sm xl:text-base",
                                isActive ? "text-green-800" : "text-gray-600"
                            )}>
                                {phase.title}
                            </CardTitle>
                            <CardDescription className={cn(
                                "text-start text-xs xl:text-sm",
                                isActive ? "text-green-600" : "text-gray-500"
                            )}>
                                {phase.body}
                            </CardDescription>
                        </div>
                        <div className="flex flex-col items-end justify-between h-full">
                            <Badge className={cn(
                                "text-xs uppercase select-none h-fit",
                                isActive
                                    ? "bg-green-100 text-green-800 border-green-300"
                                    : "bg-gray-100 text-gray-500 border-gray-300"
                            )}>
                                {phase.status}
                            </Badge>
                            <h3 className="text-sm text-muted-foreground">
                                {phase.order + 1}
                            </h3>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        );
    }

    return (
        <AuthenticatedLayout
            header={
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href={route("pengaduan.index")} className="text-sm sm:text-base">
                                Pengaduan
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem className="text-sm sm:text-base truncate max-w-[200px] sm:max-w-none">
                            {issue.title}
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
        >
            <div className="min-h-screen p-2 sm:p-4 font-poppins bg-slate-50 relative overflow-visible">
                <Head title={issue.title} />

                {/* Background decoration */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-blue-200 rounded-full blur-3xl"></div>
                    <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-purple-200 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 sm:bottom-40 left-16 sm:left-32 w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-pink-200 rounded-full blur-3xl"></div>
                </div>

                {/* Image gallery */}
                <ImageGallery
                    images={issue.attachments}
                    isOpen={galleryOpen}
                    onClose={() => setGalleryOpen(false)}
                    initialIndex={galleryIndex}
                />

                {/* Phase Image gallery */}
                <ImageGallery
                    images={activePhase.attachments}
                    isOpen={phaseGalleryOpen}
                    onClose={() => setPhaseGalleryOpen(false)}
                    initialIndex={phaseGalleryIndex}
                />

                {/* Edit phase dialog */}
                <ResponsiveDialog
                    isOpen={isEditOpen}
                    setIsOpen={setIsEditOpen}
                    title="Update Issue"
                >
                    <div className="px-4">
                        <UpdatePhase
                            setIsOpen={setIsEditOpen}
                            phase={activePhase}
                        />
                    </div>
                </ResponsiveDialog>

                <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8 relative z-10 max-w-7xl">
                    {/* Header Section */}
                    <div className="mb-6">
                        <CTAHeader />
                    </div>

                    {/* Phase Progress - Mobile */}
                    <div className="block lg:hidden mb-6 sm:mb-8">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="flex items-center justify-between w-full p-0 h-fit bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100"
                                >
                                    <PhaseCard phase={activePhase} className="border-none shadow-none" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="p-0 mx-4 w-[calc(100vw-3rem)] bg-white/95 backdrop-blur-sm border border-gray-200">
                                {issue.phases.map((phase) => (
                                    <DropdownMenuItem
                                        key={phase.id}
                                        onSelect={() => setActivePhase(phase)}
                                        className="w-full p-0 focus:bg-transparent"
                                    >
                                        <PhaseCard
                                            phase={phase}
                                            isActive={phase === activePhase}
                                            onClick={() => setActivePhase(phase)}
                                            className="w-full border-none shadow-none"
                                        />
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Phase Progress - Desktop */}
                    <div className="hidden lg:flex items-center gap-2 xl:gap-4 p-2 rounded-lg shadow-sm bg-white/80 backdrop-blur-sm border border-gray-200 mb-6 sm:mb-8 lg:mb-10">
                        {issue.phases.map((phase) => (
                            <PhaseCard
                                key={phase.id}
                                phase={phase}
                                isActive={phase === activePhase}
                                onClick={() => setActivePhase(phase)}
                            />
                        ))}
                    </div>

                    {/* Main Section */}
                    <Card className="gap-y-4 bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100 mb-6">
                        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4 p-4 sm:p-6">
                            <div className="flex flex-col gap-4 lg:items-center w-fit lg:w-full lg:flex-row">
                                <h1 className="flex-1 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                                    {issue.title}
                                </h1>
                                <div className="flex gap-2 shrink-0">
                                    <Badge className={cn(
                                        "text-sm font-semibold capitalize select-none",
                                        issue.status === 'open' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                            issue.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                                issue.status === 'resolved' ? 'bg-green-100 text-green-800 border-green-200' :
                                                    'bg-gray-100 text-gray-800 border-gray-200'
                                    )}>
                                        {issue.status}
                                    </Badge>
                                    <Badge className="text-sm font-semibold capitalize select-none bg-blue-100 text-blue-800 border-blue-200">
                                        {issue.issue_category.name}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex md:hidden">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="bg-muted"
                                        >
                                            <MoreHorizontal className="w-5 h-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href={route("pengaduan.index")}
                                            >
                                                <EditIcon className="w-4 h-4 mr-2" />
                                                <span>Edit</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href={route("pengaduan.index")}
                                            >
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                <span>Tandai Selesai</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            {/* Desktop: inline buttons */}
                            <div className="hidden gap-2 md:flex">
                                <Button variant="outline" asChild>
                                    <Link href={route("pengaduan.index")}>
                                        <EditIcon className="w-4 h-4" />
                                        <span>Edit</span>
                                    </Link>
                                </Button>
                                <Button variant="default" asChild>
                                    <Link href={route("pengaduan.index")}>
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Tandai Selesai</span>
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col xl:flex-row w-full gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
                            <Card className="flex-1">
                                <CardContent className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6">
                                    <Label className="font-semibold leading-tight text-base sm:text-lg text-gray-900">
                                        Deskripsi
                                    </Label>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                                        {issue.body}
                                    </p>
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
                                </CardContent>
                            </Card>
                            <Card className="bg-gray-50 border-gray-200 xl:w-80 xl:shrink-0">
                                <CardHeader className="p-4 sm:p-6">
                                    <CardTitle className="font-semibold text-base sm:text-lg text-gray-900">
                                        Detail
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                                        <div className="space-y-3">
                                            <div>
                                                <Label className="leading-tight text-xs sm:text-sm text-gray-600 font-medium block mb-1">
                                                    ID
                                                </Label>
                                                <p className="text-gray-900 font-mono text-xs sm:text-sm break-all">
                                                    {issue.id}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="leading-tight text-xs sm:text-sm text-gray-600 font-medium block mb-1">
                                                    Dibuat
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
                                                    Pembuat
                                                </Label>
                                                <Link
                                                    href={route("onboarding", issue.user.id)}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    <p className="text-gray-900 text-xs sm:text-sm font-medium break-words">
                                                        {issue.user.name}
                                                    </p>
                                                </Link>
                                            </div>
                                            <div>
                                                <Label className="leading-tight text-xs sm:text-sm text-gray-600 font-medium block mb-1">
                                                    Lokasi
                                                </Label>
                                                <p className="break-words whitespace-pre-wrap text-gray-900 text-xs sm:text-sm">
                                                    test
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>

                    {/* Updates */}
                    <Card className="bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100">
                        <CardHeader className="p-4 sm:p-6">
                            <div className="flex items-center justify-between w-full">
                                <h1 className="text-xl sm:text-2xl font-medium leading-none tracking-tight text-gray-900">
                                    {activePhase.title}
                                </h1>
                                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                                    {/* Mobile: dropdown menu */}
                                    <div className="flex md:hidden">
                                        <DropdownMenu modal={false}>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    disabled={
                                                        !activePhase.is_active
                                                    }
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            setIsEditOpen(true)
                                                        }
                                                    >
                                                        <EditIcon className="w-4 h-4 mr-2" />
                                                        Add Update
                                                    </Button>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    disabled={
                                                        !activePhase.is_active
                                                    }
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={resolvePhase}
                                                        disabled={
                                                            activePhase.status !==
                                                            PhaseStatus.Resolved
                                                        }
                                                    >
                                                        <CheckCircle className="w-4 h-4 mr-2" />
                                                        {activePhase.status ===
                                                            PhaseStatus.Resolved
                                                            ? "Resolved"
                                                            : "Resolve Phase"}
                                                    </Button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Desktop: inline actions */}
                                    <div className="hidden gap-4 md:flex">
                                        <Button
                                            variant="secondary"
                                            disabled={!activePhase.is_active}
                                            onClick={() => setIsEditOpen(true)}
                                        >
                                            <PlusCircle className="w-4 h-4" />
                                            <span>Add Update</span>
                                        </Button>

                                        {activePhase.is_active ? (
                                            <Button
                                                variant="default"
                                                disabled={
                                                    activePhase.status !==
                                                    PhaseStatus.Resolved
                                                }
                                                onClick={resolvePhase}
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                <span>Resolve Phase</span>
                                            </Button>
                                        ) : (
                                            <Button variant="secondary" disabled>
                                                <CheckCircle className="w-4 h-4" />
                                                <span>
                                                    {activePhase.status ===
                                                        PhaseStatus.Resolved
                                                        ? "Resolved"
                                                        : "Resolve Phase"}
                                                </span>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <Separator className="mb-4" />
                        <CardContent className="p-4 sm:p-6 pt-0">
                            {activePhase.reason ? (
                                <div className="flex flex-col gap-4 sm:gap-6">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                                        {activePhase.reason}
                                    </p>
                                    {activePhase.attachments.length > 0 ? (
                                        <div className="flex flex-col gap-4">
                                            <Label className="font-semibold leading-tight text-base sm:text-lg text-gray-900">
                                                Lampiran ({activePhase.attachments.length})
                                            </Label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-6 gap-3 sm:gap-4">
                                                {activePhase.attachments.map(
                                                    (attachment) => (
                                                        <Button
                                                            key={attachment.id}
                                                            className="p-0 transition-opacity hover:bg-black/10 h-auto"
                                                            onClick={
                                                                togglePhaseGallery
                                                            }
                                                            asChild
                                                        >
                                                            <div className="w-full aspect-[4/3] overflow-hidden rounded-md outline outline-1 outline-neutral-400">
                                                                <img
                                                                    src={
                                                                        attachment.url
                                                                    }
                                                                    alt={
                                                                        attachment.filename
                                                                    }
                                                                    className="object-cover w-full h-full transition-transform hover:scale-105"
                                                                />
                                                            </div>
                                                        </Button>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-4">
                                            <Label className="font-semibold leading-tight text-base sm:text-lg text-gray-900">
                                                Tidak ada file terlampir
                                            </Label>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center w-full gap-4 text-secondary-foreground py-8">
                                    <div className="flex items-center justify-center rounded-full bg-muted">
                                        <AlertTriangle className="w-6 h-6 m-4 text-muted-foreground" />
                                    </div>
                                    <p className="text-gray-500 text-center">
                                        Oops! Fase ini belum diupdate
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default ShowIssue;
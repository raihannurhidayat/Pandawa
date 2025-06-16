import CTAHeader from "@/components/cta-header";
import UpdatePhase from "@/components/forms/issues/update-phase";
import ImageGallery from "@/components/image-gallery";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import StatusBadge from "@/components/status-badge";
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
import UsernameLink from "@/components/username-link";
import { useIsMobile } from "@/hooks/use-mobile";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Auth } from "@/types/auth";
import { CaseStatus, Issue, Phase, PhaseStatus } from "@/types/issue";
import { Head, Link, router, usePage } from "@inertiajs/react";
import {
    AlertTriangle,
    CheckCircle,
    EditIcon,
    MoreHorizontal,
    PlusCircle,
    Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ShowIssue({ issue }: { issue: Issue }) {
    const { auth } = usePage<PageProps<{ auth: Auth }>>().props;

    const isMobile = useIsMobile();

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
                        ? "bg-green-50 border-green-200 hover:bg-green-100 dark:bg-secondary dark:border-transparent dark:hover:bg-accent"
                        : "bg-transparent shadow-none border-transparent hover:border-inherit hover:bg-gray-50 dark:hover:bg-muted dark:sm:hover:border-accent",
                    className
                )}
                onClick={onClick}
            >
                <CardHeader className="w-full max-md:p-4">
                    <div className="flex flex-col justify-between h-full gap-4">
                        {/* Top row: Title and Status */}
                        <div className="flex flex-wrap items-center justify-between w-full gap-2">
                            <CardTitle className="font-semibold text-start max-md:text-lg">
                                {phase.title}
                            </CardTitle>
                            <StatusBadge
                                status={phase.status}
                                className="uppercase"
                                size={isMobile ? "sm" : "md"}
                            />
                        </div>

                        {/* Bottom row: Description and Order */}
                        <div className="flex items-end justify-between w-full gap-2">
                            <CardDescription className="line-clamp-3 text-start max-md:text-sm">
                                {phase.body}
                            </CardDescription>
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
                            <Link
                                href={route("pengaduan.index")}
                                className="text-sm sm:text-base"
                            >
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
            <div className="relative min-h-screen overflow-visible sm:p-4">
                <Head title={issue.title} />

                {/* Background decoration */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute w-16 h-16 bg-blue-200 rounded-full top-10 left-10 sm:w-24 sm:h-24 lg:w-32 lg:h-32 blur-3xl"></div>
                    <div className="absolute w-24 h-24 bg-purple-200 rounded-full top-20 sm:top-40 right-10 sm:right-20 sm:w-36 sm:h-36 lg:w-48 lg:h-48 blur-3xl"></div>
                    <div className="absolute w-20 h-20 bg-pink-200 rounded-full bottom-20 sm:bottom-40 left-16 sm:left-32 sm:w-32 sm:h-32 lg:w-40 lg:h-40 blur-3xl"></div>
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

                <div className="container relative z-10 flex flex-col gap-4 px-2 py-4 mx-auto sm:gap-6 sm:px-4 sm:py-6 lg:py-8 max-w-7xl">
                    {/* Header Section */}
                    <CTAHeader />

                    {/* Main Section */}
                    <Card className="max-md:bg-transparent max-md:border-none max-md:shadow-none">
                        <CardHeader className="max-md:px-0 max-md:pt-0">
                            <div className="flex flex-row justify-between w-full gap-2 ">
                                <div className="flex flex-col gap-4 lg:items-center w-fit lg:w-full lg:flex-row">
                                    <h1 className="flex-1 text-xl font-bold leading-tight text-secondary-foreground sm:text-2xl lg:text-3xl">
                                        {issue.title}
                                    </h1>
                                    <div className="flex gap-2">
                                        <StatusBadge
                                            status={issue.status}
                                            size={"sm"}
                                        />

                                        <Badge className="font-semibold select-none">
                                            {issue.issue_category.name}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex md:hidden">
                                    {auth.user?.id === issue.user_id && (
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
                                                <DropdownMenuItem>
                                                    <Button
                                                        variant={"ghost"}
                                                        size={"sm"}
                                                        asChild
                                                    >
                                                        <Link
                                                            href={route(
                                                                "pengaduan.edit",
                                                                issue.id
                                                            )}
                                                        >
                                                            <EditIcon className="w-4 h-4 mr-2" />
                                                            <span>Edit</span>
                                                        </Link>
                                                    </Button>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Button
                                                        variant={"ghost"}
                                                        size={"sm"}
                                                        asChild
                                                    >
                                                        <Link
                                                            href={route(
                                                                "pengaduan.index"
                                                            )}
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            <span>Hapus</span>
                                                        </Link>
                                                    </Button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </div>
                                {/* Desktop: inline buttons */}
                                <div className="hidden gap-2 md:flex">
                                    {auth.user?.id === issue.user_id && (
                                        <>
                                            <Button variant="outline" asChild>
                                                <Link
                                                    href={route(
                                                        "pengaduan.edit",
                                                        issue.id
                                                    )}
                                                >
                                                    <EditIcon className="w-4 h-4" />
                                                    <span>Edit</span>
                                                </Link>
                                            </Button>
                                            <Button variant="default" asChild>
                                                <Link
                                                    href={route(
                                                        "pengaduan.index"
                                                    )}
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span>Tandai Selesai</span>
                                                </Link>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col w-full gap-4 lg:flex-row max-md:px-0 max-md:pb-0">
                            <Card className="flex-1">
                                <CardContent className="flex flex-col gap-4 p-4">
                                    <p className="">{issue.body}</p>
                                    <div className="flex flex-col gap-4">
                                        <Label className="font-semibold leading-tight text-md">
                                            Lampiran
                                        </Label>
                                        <div className="flex flex-row flex-wrap gap-4">
                                            {issue.attachments.map(
                                                (attachment, index) => (
                                                    <Button
                                                        key={attachment.id}
                                                        className="p-0 transition-opacity hover:bg-black/10"
                                                        onClick={() => {
                                                            setGalleryIndex(
                                                                index
                                                            );
                                                            setGalleryOpen(
                                                                true
                                                            );
                                                        }}
                                                        asChild
                                                    >
                                                        <div className="w-32 h-24 overflow-hidden rounded-md outline outline-1 outline-neutral-400">
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
                                </CardContent>
                            </Card>
                            <Card className="bg-muted">
                                <CardHeader>
                                    <CardTitle className="font-semibold text-md">
                                        Detail
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-[auto,minmax(0,320px)] gap-x-4 gap-y-2 px-6 place-items-start">
                                    <Label className="leading-tight text-md text-muted-foreground">
                                        ID
                                    </Label>
                                    <p className="">{issue.id}</p>
                                    <Label className="leading-tight text-md text-muted-foreground">
                                        Dibuat
                                    </Label>
                                    <p className="">
                                        {issue.created_at_formatted} (
                                        {issue.created_at_relative})
                                    </p>
                                    <Label className="leading-tight text-md text-muted-foreground">
                                        Pembuat
                                    </Label>
                                    <UsernameLink user={issue.user} />
                                    <Label className="leading-tight text-md text-muted-foreground">
                                        Lokasi
                                    </Label>
                                    <p className="break-words whitespace-pre-wrap">
                                        {/* {issue.location} */}
                                        test
                                        {/* TODO: fix location */}
                                    </p>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>

                    {/* Mobile */}
                    <div className="block lg:hidden">
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="flex items-center justify-between w-full p-0 h-fit"
                                >
                                    <PhaseCard
                                        phase={activePhase}
                                        className=""
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="p-0 mx-4 w-[calc(100vw-4rem)]">
                                {issue.phases.map((phase) => (
                                    <DropdownMenuItem
                                        key={phase.id}
                                        onSelect={() => setActivePhase(phase)}
                                        className="w-full p-0"
                                    >
                                        <PhaseCard
                                            phase={phase}
                                            isActive={phase === activePhase}
                                            onClick={() =>
                                                setActivePhase(phase)
                                            }
                                            className="w-full"
                                        />
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Desktop */}
                    <div className="items-center hidden grid-cols-1 gap-4 p-2 rounded-lg shadow-sm lg:grid lg:grid-cols-4 bg-muted outline outline-1 outline-secondary">
                        {issue.phases.map((phase) => (
                            <PhaseCard
                                key={phase.id}
                                phase={phase}
                                isActive={phase === activePhase}
                                onClick={() => setActivePhase(phase)}
                            />
                        ))}
                    </div>

                    {/* Updates */}
                    <Card>
                        <CardHeader className="p-4 sm:p-6">
                            <div className="flex items-center justify-between w-full">
                                <h1 className="text-lg font-medium leading-none tracking-tight text-secondary-foreground sm:text-2xl">
                                    {activePhase.title}
                                </h1>
                                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                                    {/* Mobile: dropdown menu */}
                                    <div className="flex md:hidden">
                                        <DropdownMenu modal={false}>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                >
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
                                            <Button
                                                variant="secondary"
                                                disabled
                                            >
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
                        <CardContent>
                            {activePhase.reason ? (
                                <div className="flex flex-col gap-4">
                                    <p className="text-base whitespace-pre-wrap">
                                        {activePhase.reason}
                                    </p>
                                    {activePhase.attachments.length > 0 ? (
                                        <div className="flex flex-col gap-4">
                                            <Label className="text-lg leading-tight">
                                                Lampiran
                                            </Label>
                                            <div className="flex flex-row flex-wrap gap-4">
                                                {activePhase.attachments.map(
                                                    (attachment, index) => (
                                                        <Button
                                                            key={attachment.id}
                                                            className="p-0 transition-opacity hover:bg-black/10"
                                                            onClick={() => {
                                                                setPhaseGalleryIndex(
                                                                    index
                                                                );
                                                                setPhaseGalleryOpen(
                                                                    true
                                                                );
                                                            }}
                                                            asChild
                                                        >
                                                            <div className="w-32 h-24 overflow-hidden rounded-md outline outline-1 outline-neutral-400">
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
                                            <Label className="font-semibold leading-tight text-md">
                                                Tidak ada file terlampir
                                            </Label>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center w-full gap-4 text-secondary-foreground">
                                    <div className="flex items-center justify-center rounded-full bg-muted">
                                        <AlertTriangle className="w-6 h-6 m-4 text-muted-foreground" />
                                    </div>
                                    Oops! Fase ini belum diupdate
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Comments */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default ShowIssue;

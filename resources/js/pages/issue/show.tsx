// TODO: fix location parsing

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

    const [galleryOpen, setGalleryOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [phaseGalleryOpen, setPhaseGalleryOpen] = useState(false);
    const [phaseGalleryIndex, setPhaseGalleryIndex] = useState(0);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [activePhase, setActivePhase] = useState<Phase>(() => {
        const index = issue.phases.findIndex((phase) => phase.is_active);
        return issue.phases[index !== -1 ? index : 0]; // Fallback to 0 if no active phase is found
    });

    // whenever issue.phases changes, pick up the new “active” one
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
                        ? "bg-secondary hover:bg-secondary/80"
                        : "bg-transparent shadow-none border-transparent hover:border-inherit",
                    className
                )}
                onClick={onClick}
            >
                <CardHeader className="w-full">
                    <div className="flex flex-row justify-between flex-1 w-full gap-4 p-1 md:p-2">
                        <div className="flex flex-col justify-between w-full gap-2">
                            <CardTitle className="font-semibold text-start">
                                {phase.title}
                            </CardTitle>
                            <CardDescription className="text-start">
                                {phase.body}
                            </CardDescription>
                        </div>
                        <div className="flex flex-col items-end justify-between h-full">
                            <StatusBadge
                                status={phase.status}
                                className="uppercase"
                            />
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
                            <Link href={route("pengaduan.index")}>
                                Pengaduan
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>{issue.title}</BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
        >
            <Head title={issue.title} />

            {/* Image gallery */}
            <ImageGallery
                images={issue.attachments}
                isOpen={galleryOpen}
                onClose={() => setGalleryOpen(false)}
                initialIndex={galleryIndex}
            />

            {/* Image gallery */}
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

            <div className="flex flex-col w-full gap-2 lg:gap-6">
                {/* Header Section */}
                <CTAHeader />

                {/* Main Section */}
                <Card className="max-md:bg-transparent max-md:border-none max-md:shadow-none">
                    <CardHeader className="max-md:px-0">
                        <div className="flex flex-row justify-between w-full gap-2 ">
                            <div className="flex flex-col gap-4 lg:items-center w-fit lg:w-full lg:flex-row">
                                <h1 className="max-w-full text-2xl font-bold leading-none tracking-normal truncate text-start">
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
                                                href={route("pengaduan.index")}
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
                    <CardContent className="flex flex-col w-full gap-4 lg:flex-row max-md:px-0">
                        <Card className="flex-1">
                            <CardContent className="flex flex-col gap-4 p-4">
                                <p className="">{issue.body}</p>
                                <div className="flex flex-col gap-4">
                                    <Label className="font-semibold leading-tight text-md">
                                        Lampiran
                                    </Label>
                                    <div className="flex flex-row flex-wrap gap-4">
                                        {issue.attachments.map((attachment) => (
                                            <Button
                                                key={attachment.id}
                                                className="p-0 transition-opacity hover:bg-black/10"
                                                onClick={toggleGallery}
                                                asChild
                                            >
                                                <div className="w-32 h-24 overflow-hidden rounded-md outline outline-1 outline-neutral-400">
                                                    <img
                                                        src={attachment.url}
                                                        alt={
                                                            attachment.filename
                                                        }
                                                        className="object-cover w-full h-full transition-transform hover:scale-105"
                                                    />
                                                </div>
                                            </Button>
                                        ))}
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
                                <Link
                                    href={route("onboarding", issue.user.id)}
                                    className="text-blue-500 hover:underline"
                                >
                                    {issue.user.name}
                                </Link>
                                <Label className="leading-tight text-md text-muted-foreground">
                                    Lokasi
                                </Label>
                                <p className="break-words whitespace-pre-wrap">
                                    {/* {issue.location} */}
                                    test
                                </p>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>

                {/* Mobile */}
                <div className="block md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="flex items-center justify-between w-full p-0 h-fit"
                            >
                                <PhaseCard phase={activePhase} className="" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-0 mx-4 w-[calc(100vw-3rem)]">
                            {issue.phases.map((phase) => (
                                <DropdownMenuItem
                                    key={phase.id}
                                    onSelect={() => setActivePhase(phase)}
                                    className="w-full p-0"
                                >
                                    <PhaseCard
                                        phase={phase}
                                        isActive={phase === activePhase}
                                        onClick={() => setActivePhase(phase)}
                                        className="w-full"
                                    />
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Desktop */}
                <div className="items-center hidden grid-cols-1 gap-4 p-2 rounded-lg shadow-sm md:grid md:grid-cols-4 md:mt-1 bg-muted outline outline-1 outline-secondary">
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
                <Card className="mt-2">
                    <CardHeader className="p-4">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="text-xl font-medium leading-none tracking-tight">
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
                                                (attachment) => (
                                                    <Button
                                                        key={attachment.id}
                                                        className="p-0 transition-opacity hover:bg-black/10"
                                                        onClick={
                                                            togglePhaseGallery
                                                        }
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
        </AuthenticatedLayout>
    );
}

export default ShowIssue;

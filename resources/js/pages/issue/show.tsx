import CTAHeader from "@/components/cta-header";
import ImageGallery from "@/components/image-gallery";
import PhaseCreate from "@/components/phase-create";
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
import { Separator } from "@/components/ui/separator";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Auth } from "@/types/auth";
import { Issue } from "@/types/issue";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    AlertTriangle,
    CheckCircle,
    ChevronRight,
    EditIcon,
    EllipsisVertical,
    PlusCircle,
    Trash2,
} from "lucide-react";
import { useState } from "react";

function ShowIssue({ issue }: { issue: Issue }) {
    const { auth } = usePage<PageProps<{ auth: Auth }>>().props;

    const [galleryOpen, setGalleryOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [phaseGalleryOpen, setPhaseGalleryOpen] = useState(false);
    const [phaseGalleryIndex, setPhaseGalleryIndex] = useState(0);
    const [activePhase, setActivePhase] = useState(() => {
        const index = issue.phases.findIndex((phase) => phase.is_active);
        return index !== -1 ? index : 0; // Fallback to 0 if no active phase is found
    });

    function toggleGallery(e: any) {
        setGalleryIndex(0);
        setGalleryOpen(true);
    }

    function togglePhaseGallery(e: any) {
        setPhaseGalleryIndex(0);
        setPhaseGalleryOpen(true);
    }

    console.log(issue);

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
                images={issue.phases[activePhase].attachments}
                isOpen={phaseGalleryOpen}
                onClose={() => setPhaseGalleryOpen(false)}
                initialIndex={phaseGalleryIndex}
            />

            <div className="flex flex-col w-full gap-6">
                {/* Header Section */}
                <CTAHeader />

                {/* Main Section */}
                <Card className="gap-y-4">
                    <CardHeader className="flex flex-row items-center justify-between w-full gap-2">
                        <div className="flex items-center w-full gap-4">
                            <h1 className="text-2xl font-bold leading-none tracking-normal">
                                {issue.title}
                            </h1>
                            <div className="flex gap-2">
                                <Badge className="text-sm font-semibold capitalize select-none">
                                    {issue.status}
                                </Badge>
                                <Badge className="text-sm font-semibold capitalize select-none">
                                    {issue.issue_category.name}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route("pengaduan.index")}>
                                    <EditIcon className="w-4 h-4" />
                                    Edit
                                </Link>
                            </Button>
                            <Button variant="default" asChild>
                                <Link href={route("pengaduan.index")}>
                                    <CheckCircle className="w-4 h-4" />
                                    Tandai Selesai
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="flex w-full gap-4">
                        <Card className="flex-1">
                            <CardContent className="flex flex-col gap-4 p-4">
                                <Label className="font-semibold leading-tight text-md">
                                    Deskripsi
                                </Label>
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
                                    {issue.location}
                                </p>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>

                {/* Phases tracker */}
                <div className="flex items-center flex-1 gap-4 p-2 mt-1 rounded-lg shadow-sm bg-muted outline outline-1 outline-secondary">
                    {issue.phases.map((phase, index) => (
                        <Card
                            key={phase.id}
                            className={cn(
                                "flex flex-1 transition-colors ease-in-out hover:cursor-pointer",
                                index === activePhase
                                    ? "bg-secondary hover:bg-secondary/80"
                                    : "bg-transparent shadow-none border-transparent hover:border-inherit"
                            )}
                            onClick={() => setActivePhase(index)}
                        >
                            <CardHeader>
                                <div className="flex flex-row justify-between flex-1 w-full gap-4">
                                    <div className="flex flex-col w-full gap-2">
                                        <CardTitle className="font-semibold">
                                            {phase.title}
                                        </CardTitle>
                                        <CardDescription>
                                            {phase.body}
                                        </CardDescription>
                                    </div>
                                    <div className="flex flex-col items-end justify-between h-full">
                                        <Badge className="text-sm uppercase select-none h-fit">
                                            {phase.status}
                                        </Badge>
                                        <h3 className="text-sm text-muted-foreground">
                                            {phase.order + 1}
                                        </h3>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                {/* Updates */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between w-full">
                            <h1 className="text-2xl font-semibold leading-none tracking-tight">
                                Updates
                            </h1>
                            <div className="flex gap-4">
                                <Button variant="outline" size="icon">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                                <PhaseCreate phase={issue.phases[activePhase]}>
                                    <Button variant="secondary">
                                        <PlusCircle className="w-4 h-4" />
                                        Add Update
                                    </Button>
                                </PhaseCreate>
                                <Button variant="default" disabled>
                                    <CheckCircle className="w-4 h-4" />
                                    Resolve Phase
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <Separator className="mb-4" />
                    <CardContent>
                        {/* {issue.phases.map((phase) => (
                            <div key={phase.id}>
                                <div className="flex items-center justify-between w-full gap-4">
                                    <div className="flex flex-col w-full gap-2">
                                        <CardTitle className="font-semibold">
                                            {phase.title}
                                        </CardTitle>
                                        <CardDescription>
                                            {phase.body}
                                        </CardDescription>
                                    </div>
                                    <div className="flex flex-col items-end justify-between h-full">
                                        <Badge className="text-sm uppercase select-none h-fit">
                                            {phase.status}
                                        </Badge>
                                        <h3 className="text-sm text-muted-foreground">
                                            {phase.order + 1}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))} */}
                        {issue.phases[activePhase].reason ? (
                            <div className="flex flex-col gap-4">
                                <p className="whitespace-pre-wrap">
                                    {issue.phases[activePhase].reason}
                                </p>
                                {issue.phases[activePhase].attachments.length >
                                0 ? (
                                    <div className="flex flex-col gap-4">
                                        <Label className="font-semibold leading-tight text-md">
                                            Lampiran
                                        </Label>
                                        <div className="flex flex-row flex-wrap gap-4">
                                            {issue.phases[
                                                activePhase
                                            ].attachments.map((attachment) => (
                                                <Button
                                                    key={attachment.id}
                                                    className="p-0 transition-opacity hover:bg-black/10"
                                                    onClick={togglePhaseGallery}
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

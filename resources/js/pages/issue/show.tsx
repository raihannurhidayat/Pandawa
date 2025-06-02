import ImageGallery from "@/components/image-gallery";
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
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { cn } from "@/lib/utils";
import { Issue } from "@/types/issue";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

function ShowIssue({ issue }: { issue: Issue }) {
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);

    function toggleGallery(e: any) {
        setGalleryIndex(0);
        setGalleryOpen(true);
    }

    // console.log(issue);

    const isActive = (index: number) => {
        if (index === 0) {
            return !issue.progress.some(
                (prog, i) => i < index && prog.status === "resolved"
            );
        }
        return issue.progress[index - 1].status === "resolved";
    };

    const getCardStyle = (index: number) =>
        cn(
            "flex flex-1 transition-colors ease-in-out",
            isActive(index)
                ? "bg-secondary hover:bg-secondary/80"
                : "bg-transparent shadow-none border-transparent hover:border-inherit"
        );

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

            {/* Progress tracker */}
            <div className="flex items-center flex-1 gap-4 p-2 mt-1 mb-10 rounded-lg shadow-sm bg-muted outline outline-1 outline-secondary">
                {issue.progress.map((progress, index) => (
                    <Card id={progress.id} className={getCardStyle(index)}>
                        <CardHeader className="flex flex-row justify-between flex-1 w-full gap-4">
                            <div className="flex flex-col w-full gap-2">
                                <CardTitle className="font-semibold">
                                    {progress.title}
                                </CardTitle>
                                <CardDescription>
                                    {progress.body}
                                </CardDescription>
                            </div>
                            <div className="flex justify-end">
                                <Badge className="text-sm uppercase select-none h-fit">
                                    {progress.status}
                                </Badge>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
            <Card className="gap-y-4">
                <CardHeader className="flex flex-row items-center justify-between w-full gap-2">
                    <CardTitle className="flex-1 h-full">
                        {issue.title}
                    </CardTitle>
                    {/* <div className="flex flex-row gap-2">
                        <Badge className="text-sm font-bold uppercase select-none">
                            {issue.issue_category.name}
                        </Badge>
                        <Badge className="text-sm font-bold uppercase select-none">
                            {issue.status}
                        </Badge>
                    </div> */}
                    <div className="flex gap-2">
                        <Button variant="secondary" asChild className="text-sm">
                            <Link href={route("pengaduan.index")}>Kembali</Link>
                        </Button>
                        <Button variant="secondary" asChild className="text-sm">
                            <Link href={route("pengaduan.index")}>Kembali</Link>
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
        </AuthenticatedLayout>
    );
}

export default ShowIssue;

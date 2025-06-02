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
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Issue } from "@/types/issue";
import { Head, Link } from "@inertiajs/react";

function ShowIssue({ issue }: { issue: Issue }) {
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

            <div className="flex items-center flex-1 gap-4 p-2 rounded-lg bg-muted">
                <Card className="flex flex-1 bg-accent">
                    <CardHeader className="flex flex-row justify-between flex-1 w-full gap-4">
                        <div className="flex flex-col w-full gap-2">
                            <CardTitle className="font-semibold">
                                Pengaduan diterima
                            </CardTitle>
                            <CardDescription>
                                Pengaduan diterima dan telah diverifikasi
                            </CardDescription>
                        </div>
                        <div className="flex justify-end">
                            <Badge className="text-sm uppercase select-none h-fit">
                                {issue.status}
                            </Badge>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="flex flex-1 transition-colors ease-in-out bg-transparent border-none shadow-none outline-none hover:bg-accent">
                    <CardHeader className="flex flex-row justify-between flex-1 w-full gap-4">
                        <div className="flex flex-col w-full gap-2">
                            <CardTitle className="font-semibold">
                                Pengaduan diterima
                            </CardTitle>
                            <CardDescription>
                                Pengaduan diterima dan telah diverifikasi
                            </CardDescription>
                        </div>
                        <div className="flex justify-end">
                            <Badge className="text-sm uppercase select-none h-fit">
                                {issue.status}
                            </Badge>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="flex flex-1 bg-transparent border-none shadow-none outline-none">
                    <CardHeader className="flex flex-row justify-between flex-1 w-full gap-4">
                        <div className="flex flex-col w-full gap-2">
                            <CardTitle className="font-semibold">
                                Pengaduan diterima
                            </CardTitle>
                            <CardDescription>
                                Pengaduan diterima dan telah diverifikasi
                            </CardDescription>
                        </div>
                        <div className="flex justify-end">
                            <Badge className="text-sm uppercase select-none h-fit">
                                {issue.status}
                            </Badge>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="flex flex-1 bg-transparent border-none shadow-none outline-none">
                    <CardHeader className="flex flex-row justify-between flex-1 w-full gap-4">
                        <div className="flex flex-col w-full gap-2">
                            <CardTitle className="font-semibold">
                                Pengaduan diterima
                            </CardTitle>
                            <CardDescription>
                                Pengaduan diterima dan telah diverifikasi
                            </CardDescription>
                        </div>
                        <div className="flex justify-end">
                            <Badge className="text-sm uppercase select-none h-fit">
                                {issue.status}
                            </Badge>
                        </div>
                    </CardHeader>
                </Card>
            </div>
            <div>
                <h1>{issue.title}</h1>
                <p>{issue.body}</p>
            </div>
        </AuthenticatedLayout>
    );
}

export default ShowIssue;

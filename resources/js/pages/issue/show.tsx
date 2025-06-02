import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Issue } from "@/types/issue";
import { Head, Link } from "@inertiajs/react";

function ShowIssue({ issue }: { issue: Issue }) {
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
        </AuthenticatedLayout>
    );
}

export default ShowIssue;

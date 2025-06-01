import CardIssue from "@/components/card-issue";
import { ScrollArea } from "@/components/ui/scroll-area";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { PageProps, User } from "@/types";
import { Head, usePage } from "@inertiajs/react";

function Issue({ issues }: { issues: any[] }) {
    return (
        <AuthenticatedLayout header="Pengaduan">
            <Head title="Pengaduan" />
            <ScrollArea>
                <div className="flex flex-col gap-4">
                    {issues.map((issue: any) => (
                        <CardIssue key={issue.id} issue={issue} />
                    ))}
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}

export default Issue;

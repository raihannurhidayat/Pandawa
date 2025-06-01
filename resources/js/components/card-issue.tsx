import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";

function CardIssue({
    issue,
}: {
    issue: {
        id: number;
        title: string;
        body: string;
        location: string;
        attachments: [];
        issue_category: { name: string };
        status: string;
        updated_at: string;
    };
}) {
    const { auth } = usePage<PageProps>().props;

    return (
        <Link href={route("pengaduan.show", issue.id)}>
            <Card key={issue.id} className="bg-neutral-800">
                <CardHeader className="flex justify-between w-full gap-2">
                    <div className="flex items-center gap-2">
                        <Badge className="text-xs font-bold uppercase select-none">
                            {issue.issue_category.name}
                        </Badge>
                        <Badge className="text-xs font-bold uppercase select-none">
                            {issue.status}
                        </Badge>
                    </div>
                    <CardTitle>{issue.title}</CardTitle>
                    <CardDescription>{issue.location}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <div className="flex gap-1">
                        <div className="overflow-hidden text-ellipsis line-clamp-3">
                            {issue.body}
                        </div>
                        {issue.body.length > 250 && "..." && (
                            <Link
                                href={route("pengaduan.show", issue.id)}
                                className="underline text-primary-500"
                            >
                                Selengkapnya
                            </Link>
                        )}
                    </div>
                    <span>Terlampir {issue.attachments.length} file</span>
                </CardContent>
                <Separator className="bg-neutral-600" />
                <CardFooter className="flex gap-2 py-2">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="w-8 h-8 rounded-lg">
                            {/*<AvatarImage src={user.avatar} alt={user.name} />*/}
                            <AvatarFallback className="rounded-lg">
                                AC
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-sm leading-tight text-left">
                            <span className="font-semibold truncate">
                                {auth.user.name}
                            </span>
                            <span className="text-xs truncate">
                                {auth.user.email}
                            </span>
                        </div>
                    </div>
                    <span>
                        {new Intl.DateTimeFormat("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }).format(new Date(issue.updated_at))}
                    </span>
                </CardFooter>
            </Card>
        </Link>
    );
}

export default CardIssue;

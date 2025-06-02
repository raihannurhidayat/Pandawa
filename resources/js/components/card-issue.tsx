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
import { Link } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import { Issue } from "@/types/issue";

function CardIssue({ issue }: { issue: Issue }) {
    return (
        <Link href={route("pengaduan.show", issue.id)}>
            <Card
                key={issue.id}
                className="transition-colors duration-300 ease-in-out bg-neutral-800 hover:bg-neutral-700"
            >
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
                    <div className="grid grid-cols-[auto_1fr] gap-x-1 gap-y-1 text-sm py-2 items-center text-neutral-400">
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <Label className="font-normal">Diubah</Label>
                        </div>
                        <span>{issue.updated_at_relative}</span>
                        {/* <Label>Dibuat</Label> */}
                        {/* <span>
                            {issue.created_at_formatted} (
                            {issue.created_at_relative}) oleh{" "}
                            <span className="font-bold text-blue-500 hover:underline hover:text-blue-600">
                                {auth.user.email}
                            </span>
                        </span> */}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}

export default CardIssue;

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
import { Link } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import { Issue } from "@/types/issue";

function CardIssue({ issue }: { issue: Issue }) {
    return (
        <Link href={route("pengaduan.show", issue.id)}>
            <Card
                key={issue.id}
                className="transition-colors duration-300 ease-in-out bg-accent hover:bg-accent/80"
            >
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
                    <span className="text-sm underline">
                        Terlampir {issue.attachments.length} file
                    </span>
                </CardContent>
                <Separator className="bg-accent" />
                <CardFooter className="flex gap-2 py-2">
                    <div className="grid grid-cols-[auto_1fr] gap-x-1 gap-y-1 text-sm py-2 items-center text-muted-foreground">
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <Label className="font-normal">Diubah</Label>
                        </div>
                        <span>{issue.updated_at_relative}</span>
                        {/* <Label>Dibuat</Label> */}
                        {/* <span>
                            {issue.created_at_formatted} (
                            {issue.created_at_relative}) oleh{" "}
                            <span className="font-bold text-blue-500 hover:underline hover:text-blue-600">
                                {auth.user.email}
                            </span>
                        </span> */}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}

export default CardIssue;

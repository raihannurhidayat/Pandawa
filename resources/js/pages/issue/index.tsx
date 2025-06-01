import CardIssue from "@/components/card-issue";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectValue } from "@/components/ui/select";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, Link } from "@inertiajs/react";
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { Plus, Search, Settings2Icon, X } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import MultichoiceDropdown from "@/components/multichoice-dropdown";

function Issue({
    categories,
    status,
    issues,
}: {
    categories: any[];
    status: [];
    issues: any[];
}) {
    const [selected, setSelected] = useState<string[]>([]);

    return (
        <AuthenticatedLayout header="Pengaduan">
            <Head title="Pengaduan" />

            <form
                action={route("pengaduan.index", { title: "" })}
                method="get"
                className="flex justify-between mb-4"
            >
                <Input
                    type="text"
                    placeholder="Cari pengaduan"
                    iconRight={<Search />}
                    className="flex flex-1"
                />
                <div className="flex gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-[200px] justify-between"
                            >
                                Filter
                                <Settings2Icon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-2 flex flex-col gap-3">
                            <header className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">
                                    Filter
                                </h3>
                            </header>
                            <MultichoiceDropdown
                                items={categories.map((category: any) => {
                                    return {
                                        id: category.id,
                                        name: category.name,
                                    };
                                })}
                                label="Kategori"
                                placeholder="Pilih Kategori"
                            />
                        </PopoverContent>
                    </Popover>
                    <Button variant="outline" asChild>
                        <Link href={route("pengaduan.create")}>
                            <Plus />
                            Buat Pengaduan
                        </Link>
                    </Button>
                </div>
            </form>

            <span className="text-4xl">this is tes</span>

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

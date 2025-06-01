import CardIssue from "@/components/card-issue";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, Link } from "@inertiajs/react";
import { Plus, Search, Settings2Icon, X } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
    const [searchTitle, setSearchTitle] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

    return (
        <AuthenticatedLayout header="Pengaduan">
            <Head title="Pengaduan" />

            <div className="flex flex-col justify-between w-full gap-2 mb-4 lg:flex-row lg:justify-between">
                <div className="flex gap-2">
                    <h1 className="text-2xl font-semibold">Pengaduan</h1>
                </div>
                <div className="flex gap-4">
                    <form
                        action={route("pengaduan.index", {
                            title: searchTitle,
                            category: selectedCategory,
                            status: selectedStatus,
                        })}
                        method="get"
                        className="flex gap-2"
                    >
                        <Input
                            type="text"
                            placeholder="Cari pengaduan"
                            iconLeft={<Search />}
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            className="flex flex-1 w-full"
                        />
                        <div className="flex gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="justify-between w-fit"
                                    >
                                        Filter
                                        <Settings2Icon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-3 flex flex-col gap-3">
                                    <header className="flex items-center justify-between">
                                        <h3 className="font-semibold">
                                            Filter
                                        </h3>
                                    </header>
                                    <MultichoiceDropdown
                                        items={categories.map(
                                            (category: any) => ({
                                                id: category.id,
                                                name: category.name,
                                            })
                                        )}
                                        selectedItems={selectedCategory}
                                        onChange={setSelectedCategory}
                                        label="Kategori"
                                        placeholder="Pilih Kategori"
                                    />
                                    <MultichoiceDropdown
                                        items={status.map(
                                            (statusName: string) => ({
                                                id: statusName,
                                                name: statusName,
                                            })
                                        )}
                                        selectedItems={selectedStatus}
                                        onChange={setSelectedStatus}
                                        label="Status"
                                        placeholder="Pilih Status"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </form>
                    <Button variant="outline" asChild>
                        <Link href={route("pengaduan.create")}>
                            <Plus />
                            Buat Pengaduan
                        </Link>
                    </Button>
                </div>
            </div>

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

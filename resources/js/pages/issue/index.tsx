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
import { useMemo, useState } from "react";
import MultichoiceDropdown from "@/components/multichoice-dropdown";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function Issue({
    categories,
    status,
    issues,
}: {
    categories: any[];
    status: string[];
    issues: any[];
}) {
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const sortedItems = useMemo(() => {
        return [...issues].sort((a, b) => {
            const aDate = new Date(a.updated_at as string);
            const bDate = new Date(b.updated_at as string);

            return sortOrder === "asc"
                ? aDate.getTime() - bDate.getTime()
                : bDate.getTime() - aDate.getTime();
        });
    }, [issues, sortOrder]);

    const params = new URLSearchParams(window.location.search);

    const titleParams = params.get("title");
    const catParams = params.get("category")
        ? params
              .get("category")
              ?.split(",")
              .map((slug) => {
                  const category = categories.find((cat) => cat.slug === slug);
                  return category ? category.slug : null;
              })
              .filter((category) => category !== null)
        : [];
    const statusParams = params.get("status")
        ? params
              .get("status")
              ?.split(",")
              .filter((name: string) => status.includes(name))
        : [];

    const [searchTitle, setSearchTitle] = useState<string>(titleParams ?? "");
    const [selectedCategory, setSelectedCategory] = useState<string[]>(
        catParams ?? []
    );
    const [selectedStatus, setSelectedStatus] = useState<string[]>(
        statusParams ?? []
    );

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const url = new URL(location.href);

        if (searchTitle) {
            url.searchParams.set("title", searchTitle);
        } else {
            url.searchParams.delete("title");
        }

        if (selectedCategory.length > 0) {
            url.searchParams.set("category", selectedCategory.join(","));
        } else {
            url.searchParams.delete("category");
        }

        if (selectedStatus.length > 0) {
            url.searchParams.set("status", selectedStatus.join(","));
        } else {
            url.searchParams.delete("status");
        }

        location.href = url.toString();
    };

    return (
        <AuthenticatedLayout header="Pengaduan">
            <Head title="Pengaduan" />

            <div className="flex flex-col justify-between w-full gap-2 mb-4 lg:flex-row lg:justify-between">
                <div className="flex gap-2">
                    <h1 className="text-2xl font-semibold">Pengaduan</h1>
                </div>
                <div className="flex gap-4">
                    <Select
                        onValueChange={(value) =>
                            setSortOrder(value as "asc" | "desc")
                        }
                        value={sortOrder}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Sortir" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Pembuatan</SelectLabel>
                                <SelectItem id="desc" value="desc">
                                    Terbaru
                                </SelectItem>
                                <SelectItem id="asc" value="asc">
                                    Terlama
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            type="text"
                            placeholder="Cari pengaduan"
                            iconLeft={<Search />}
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            className="flex w-fit"
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
                                                id: category.slug,
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
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            type="reset"
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => {
                                                setSelectedCategory([]);
                                                setSelectedStatus([]);
                                            }}
                                        >
                                            Reset
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="default"
                                            className="w-full"
                                            onClick={handleSubmit}
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </form>
                    <Button variant="default" asChild>
                        <Link href={route("pengaduan.create")}>
                            <Plus />
                            Buat Pengaduan
                        </Link>
                    </Button>
                </div>
            </div>

            <ScrollArea>
                <div className="flex flex-col gap-4">
                    {sortedItems.map((issue: any) => (
                        <CardIssue key={issue.id} issue={issue} />
                    ))}
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}

export default Issue;

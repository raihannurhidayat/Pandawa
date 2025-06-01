import CardIssue from "@/components/card-issue";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectValue } from "@/components/ui/select";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head } from "@inertiajs/react";
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { Search, Settings2Icon, X } from "lucide-react";
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
    const categoriesItems = categories.map((category: any) => {
        return {
            id: category.id,
            name: category.name,
        };
    });

    console.log(categoriesItems);

    const [selected, setSelected] = useState<string[]>([]);

    const toggleCategory = (category: string) => {
        setSelected((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    return (
        <AuthenticatedLayout header="Pengaduan">
            <Head title="Pengaduan" />

            <form
                action={route("pengaduan.index", { title: "" })}
                method="get"
                className="flex flex-col gap-4"
            >
                <Input
                    type="text"
                    placeholder="Cari pengaduan"
                    iconRight={<Search />}
                />
                <div className="flex gap-3 w-fit">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category: any) => (
                                <SelectItem
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {status.map((stat: string) => (
                                <SelectItem
                                    key={stat}
                                    value={stat}
                                    className="capitalize"
                                >
                                    <span className="capitalize">{stat}</span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
                                items={categoriesItems}
                                label="Kategori"
                                placeholder="Pilih Kategori"
                            />
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    onClick={() => toggleCategory(category.id)}
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    <Checkbox
                                        checked={selected.includes(category.id)}
                                        onCheckedChange={() =>
                                            toggleCategory(category.id)
                                        }
                                        id={category.id}
                                    />
                                    <Label htmlFor={category.id}>
                                        {category.name}
                                    </Label>
                                </div>
                            ))}
                        </PopoverContent>
                    </Popover>
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

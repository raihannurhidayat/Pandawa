import { FormEventHandler, useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectItem,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import LocationFilter from "@/components/location-filter";
import { AttachmentInput } from "@/components/attachments-input";
import AuthenticatedLayout from "@/layouts/authenticated-layout";

function CreateIssue({ categories }: { categories: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        body: "",
        issue_category_id: "",
        location: "",
        attachments: [] as File[],
    });

    const handleIssueCategoryChange = (e: any) => {
        setData("issue_category_id", e);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("pengaduan.store"));
    };

    return (
        <AuthenticatedLayout header="Pengaduan">
            <Head title="Pengaduan" />

            <div className="flex items-center justify-center w-full">
                <form onSubmit={submit}>
                    <Card className="flex flex-col max-w-sm gap-4 mx-auto">
                        <CardHeader className="flex flex-col items-center justify-center gap-2">
                            <CardTitle className="text-2xl">
                                Ajukan Pengaduan
                            </CardTitle>
                            <CardDescription>
                                Buat pengaduan baru
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Select
                                    onValueChange={handleIssueCategoryChange}
                                    required
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {categories?.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category?.id}
                                                >
                                                    {category?.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="title">Judul Pengaduan</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Judul..."
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="body">
                                    Deskripsi Pengaduan
                                </Label>
                                <Textarea
                                    id="body"
                                    rows={4}
                                    placeholder="Deskripsikan pengaduanmu..."
                                    value={data.body}
                                    onChange={(e) =>
                                        setData("body", e.target.value)
                                    }
                                    required
                                    className="resize-none"
                                />
                            </div>

                            <LocationFilter
                                onChange={(loc: any) =>
                                    setData("location", JSON.stringify(loc))
                                }
                            />

                            <div className="grid gap-2">
                                <Label htmlFor="attachments">Attachments</Label>
                                {/* <Input
                                id="attachments"
                                type="file"
                                required
                                onChange={(e: any) =>
                                    setData("attachments", e?.target?.files[0])
                                }
                            /> */}
                                <AttachmentInput
                                    attachments={data.attachments}
                                    setAttachments={(files) =>
                                        setData("attachments", files)
                                    }
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Ajukan</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

export default CreateIssue;

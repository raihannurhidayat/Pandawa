import type React from "react";

import { useState, useCallback, useEffect } from "react";
import { Upload, X, FileText, ImageIcon, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, router } from "@inertiajs/react";
import { Category } from "@/types/category";
import { IssueCategory } from "@/types/issue";
import { useForm } from "react-hook-form";
import { CreateIssueFormSchema, createIssueFormSchema } from "@/forms/issue";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { API_WILAYAH } from "@/constant/api-wilayah";
import { Provinsi } from "@/types/wilayah";


interface FileWithPreview extends File {
    preview?: string;
}

export default function CreateIssue({
    categories: data,
}: {
    categories: Category[];
}) {
    const [provinsi, setProvinsi] = useState<Provinsi[] | []>([]);
    const [kota, setKota] = useState<any[]>([]);
    const [kelurahan, setKelurahan] = useState<any[]>([]);
    const [kecamatan, setKecamatan] = useState<any[]>([]);

    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);

    const [isLoadingHandleCreateIssue, setIsLoadingHandleCreateIssue] = useState(false);

    const form = useForm<CreateIssueFormSchema>({
        resolver: zodResolver(createIssueFormSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            body: "",
            issue_category_id: "",
            location: {
                provinsi: "",
                kota: "",
                kelurahan: "",
                kecamatan: "",
            },
        },
    });

    useEffect(() => {
        console.log(import.meta.env.VITE_API_WILAYAH);

        const fetchWilayah = async () => {
            const response = await fetch(`${API_WILAYAH}/provinsi`, {
                headers: {
                    "X-API-KEY": import.meta.env.VITE_API_WILAYAH,
                },
            });
            const data = await response.json();
            setProvinsi(data.data);

            if (form.watch("location.provinsi")) {
                const response = await fetch(
                    `${API_WILAYAH}/kota?provinsi_id=${form.watch(
                        "location.provinsi"
                    )}`,
                    {
                        headers: {
                            "X-API-KEY": import.meta.env.VITE_API_WILAYAH,
                        },
                    }
                );
                const data = await response.json();
                setKota(data.data);
            }

            if (form.watch("location.kota")) {
                const response = await fetch(
                    `${API_WILAYAH}/kecamatan?kota_id=${form.watch(
                        "location.kota"
                    )}`,
                    {
                        headers: {
                            "X-API-KEY": import.meta.env.VITE_API_WILAYAH,
                        },
                    }
                );
                const data = await response.json();
                setKecamatan(data.data);
            }

            if (form.watch("location.kecamatan")) {
                const response = await fetch(
                    `${API_WILAYAH}/kelurahan?kecamatan_id=${form.watch(
                        "location.kecamatan"
                    )}`,
                    {
                        headers: {
                            "X-API-KEY": import.meta.env.VITE_API_WILAYAH,
                        },
                    }
                );
                const data = await response.json();
                setKelurahan(data.data);
            }
        };

        fetchWilayah();
    }, [form.watch("location.provinsi"), form.watch("location.kota"), form.watch("location.kecamatan")]);

    const handleSubmitCreateIssue = (data: CreateIssueFormSchema) => {
        setIsLoadingHandleCreateIssue(true);
        const newissueData = {
            ...data,
            location: JSON.stringify(data.location),
            attachments: files,
        };

        router.post(route("pengaduan.store"), newissueData, {
            onSuccess: () => {
                toast.success("Pengaduan berhasil dibuat", {
                    id: "create-issues",
                });
            },
            onError: () => {
                toast.error("Pengaduan gagal dibuat", {
                    id: "create-issues",
                });
            },
            onStart: () => {
                toast.loading("Pengaduan sedang diproses", {
                    id: "create-issues",
                });
            },
            onFinish: () => {
                setIsLoadingHandleCreateIssue(false);
            },
        });
    };

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        addFiles(droppedFiles);
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            addFiles(selectedFiles);
        }
    };

    const addFiles = (newFiles: File[]) => {
        const filesWithPreview = newFiles.map((file) => {
            const fileWithPreview = file as FileWithPreview;
            if (file.type.startsWith("image/")) {
                fileWithPreview.preview = URL.createObjectURL(file);
            }
            return fileWithPreview;
        });

        setFiles((prev) => [...prev, ...filesWithPreview]);
    };

    const removeFile = (index: number) => {
        setFiles((prev) => {
            const newFiles = [...prev];
            if (newFiles[index].preview) {
                URL.revokeObjectURL(newFiles[index].preview!);
            }
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
            Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) +
            " " +
            sizes[i]
        );
    };

    return (
        <AuthenticatedLayout header="Pengaduan">
            <Head title="Pengaduan" />
            <div className="min-h-screen">
                <div className="">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.history.back()}
                                className="flex items-center gap-2  hover:text-gray-900"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-primary-foreground">
                                Pengaduan Baru
                            </h1>
                            <p className="">
                                Buat pengaduan baru dengan mengisi formulir
                                berikut.
                            </p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                Formulir Pengaduan
                            </CardTitle>
                            <CardDescription>
                                Silakan isi form pengaduan dengan lengkap dan
                                benar.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form
                                    className="space-y-6"
                                    onSubmit={form.handleSubmit(
                                        handleSubmitCreateIssue
                                    )}
                                >
                                    {/* Category */}
                                    <FormField
                                        control={form.control}
                                        name="issue_category_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="space-y-2">
                                                    <FormLabel
                                                        htmlFor="category"
                                                        className="text-sm font-medium"
                                                    >
                                                        Kategori{" "}
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            value={field.value}
                                                            onValueChange={(
                                                                value
                                                            ) => {
                                                                field.onChange(
                                                                    value
                                                                );
                                                            }}
                                                        >
                                                            <SelectTrigger
                                                                className={`w-full ${
                                                                    form
                                                                        .formState
                                                                        .errors
                                                                        .issue_category_id
                                                                        ? ""
                                                                        : ""
                                                                }`}
                                                            >
                                                                <SelectValue placeholder="Pilih Kategori" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {data.map(
                                                                    (
                                                                        category
                                                                    ) => (
                                                                        <SelectItem
                                                                            key={
                                                                                category.id
                                                                            }
                                                                            value={
                                                                                category.id
                                                                            }
                                                                        >
                                                                            {
                                                                                category.name
                                                                            }
                                                                        </SelectItem>
                                                                    )
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Judul pengaduan */}
                                    <FormField
                                        name={"title"}
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="space-y-2">
                                                    <FormLabel
                                                        htmlFor="title"
                                                        className="text-sm font-medium"
                                                    >
                                                        Judul Pengaduan
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </FormLabel>

                                                    <FormControl>
                                                        <Input
                                                            placeholder="Masukkan judul pengaduan"
                                                            className={`w-full ${
                                                                form.formState
                                                                    .errors
                                                                    .title
                                                                    ? ""
                                                                    : ""
                                                            }`}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Deskripsi pengaduan */}
                                    <FormField
                                        name={"body"}
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="space-y-2">
                                                    <FormLabel
                                                        htmlFor="description"
                                                        className="text-sm font-medium"
                                                    >
                                                        Deskripsi Pengaduan
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </FormLabel>

                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            placeholder="Masukkan deskripsi pengaduan"
                                                            className={`w-full min-h-[120px] resize-none ${
                                                                form.formState
                                                                    .errors.body
                                                                    ? ""
                                                                    : ""
                                                            }`}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Detail Lokasi */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium ">
                                            Detail Lokasi
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Provinsi */}
                                            <FormField
                                                name={"location.provinsi"}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="space-y-2">
                                                            <FormLabel
                                                                htmlFor="province"
                                                                className="text-sm font-medium"
                                                            >
                                                                Provinsi{" "}
                                                                <span className="text-red-500">
                                                                    *
                                                                </span>
                                                            </FormLabel>

                                                            <FormControl>
                                                                <Select
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    disabled={
                                                                        !provinsi
                                                                    }
                                                                    onValueChange={(
                                                                        value
                                                                    ) =>
                                                                        field.onChange(
                                                                            value
                                                                        )
                                                                    }
                                                                >
                                                                    <SelectTrigger
                                                                        className={`w-full ${
                                                                            form
                                                                                .formState
                                                                                .errors
                                                                                .location
                                                                                ?.provinsi
                                                                                ? ""
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        <SelectValue placeholder="Pilih Provinsi" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {provinsi.map(
                                                                            (
                                                                                province
                                                                            ) => (
                                                                                <SelectItem
                                                                                    key={
                                                                                        province.id
                                                                                    }
                                                                                    value={
                                                                                        province.id
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        province.name
                                                                                    }
                                                                                </SelectItem>
                                                                            )
                                                                        )}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Kota */}
                                            <FormField
                                                name={"location.kota"}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="space-y-2">
                                                            <FormLabel
                                                                htmlFor="city"
                                                                className="text-sm font-medium"
                                                            >
                                                                Kota{" "}
                                                                <span className="text-red-500">
                                                                    *
                                                                </span>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    onValueChange={(
                                                                        value
                                                                    ) =>
                                                                        field.onChange(
                                                                            value
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        !form.getValues(
                                                                            "location.provinsi"
                                                                        ) || !kota
                                                                    }
                                                                >
                                                                    <SelectTrigger
                                                                        className={`w-full ${
                                                                            form
                                                                                .formState
                                                                                .errors
                                                                                .location
                                                                                ?.kota
                                                                                ? ""
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        <SelectValue placeholder="Pilih Kota" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {form.getValues(
                                                                            "location.provinsi"
                                                                        ) &&
                                                                            kota?.map(
                                                                                (
                                                                                    city
                                                                                ) => (
                                                                                    <SelectItem
                                                                                        key={
                                                                                            city.id
                                                                                        }
                                                                                        value={
                                                                                            city.id
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            city.name
                                                                                        }
                                                                                    </SelectItem>
                                                                                )
                                                                            )}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />

                                            {/* kecamatan */}
                                            <FormField
                                                name={"location.kecamatan"}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="space-y-2">
                                                            <FormLabel
                                                                htmlFor="district"
                                                                className="text-sm font-medium"
                                                            >
                                                                Kecamatan{" "}
                                                                <span className="text-red-500">
                                                                    *
                                                                </span>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    onValueChange={(
                                                                        value
                                                                    ) =>
                                                                        field.onChange(
                                                                            value
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        !form.getValues(
                                                                            "location.kota"
                                                                        ) ||
                                                                        !kecamatan.length
                                                                    }
                                                                >
                                                                    <SelectTrigger
                                                                        className={`w-full ${
                                                                            form
                                                                                .formState
                                                                                .errors
                                                                                .location
                                                                                ?.kecamatan
                                                                                ? ""
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        <SelectValue placeholder="Pilih Kecamatan" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {form.getValues(
                                                                            "location.kota"
                                                                        ) &&
                                                                            kecamatan?.map(
                                                                                (
                                                                                    district
                                                                                ) => (
                                                                                    <SelectItem
                                                                                        key={
                                                                                            district.id
                                                                                        }
                                                                                        value={
                                                                                            district.id
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            district.name
                                                                                        }
                                                                                    </SelectItem>
                                                                                )
                                                                            )}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />

                                            {/* kelurahan */}
                                            <FormField
                                                name={"location.kelurahan"}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="space-y-2">
                                                            <FormLabel
                                                                htmlFor="subdistrict"
                                                                className="text-sm font-medium"
                                                            >
                                                                Kelurahan{" "}
                                                                <span className="text-red-500">
                                                                    *
                                                                </span>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    onValueChange={(
                                                                        value
                                                                    ) =>
                                                                        field.onChange(
                                                                            value
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        !form.getValues(
                                                                            "location.kecamatan"
                                                                        ) || !kelurahan
                                                                    }
                                                                >
                                                                    <SelectTrigger
                                                                        className={`w-full ${
                                                                            form
                                                                                .formState
                                                                                .errors
                                                                                .location
                                                                                ?.kelurahan
                                                                                ? ""
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        <SelectValue placeholder="Pilih Kelurahan" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {form.getValues(
                                                                            "location.kecamatan"
                                                                        ) &&
                                                                            kelurahan?.map(
                                                                                (
                                                                                    subdistrict
                                                                                ) => (
                                                                                    <SelectItem
                                                                                        key={
                                                                                            subdistrict.id
                                                                                        }
                                                                                        value={
                                                                                            subdistrict.id
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            subdistrict.name
                                                                                        }
                                                                                    </SelectItem>
                                                                                )
                                                                            )}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* File Upload */}
                                    <div className="space-y-4">
                                        <Label className="text-sm font-medium">
                                            File Attachments
                                        </Label>
                                        <div
                                            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                                                isDragOver
                                                    ? "border-blue-400 bg-blue-50"
                                                    : "border-gray-300 hover:border-gray-400"
                                            }`}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                        >
                                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                            <div className="space-y-2">
                                                <p className="text-sm ">
                                                    Drag and drop files here, or{" "}
                                                    <label className="text-primary hover:text-primary/80 cursor-pointer font-medium">
                                                        browse
                                                        <input
                                                            type="file"
                                                            multiple
                                                            accept="image/*,.pdf,.doc,.docx"
                                                            onChange={
                                                                handleFileSelect
                                                            }
                                                            className="hidden"
                                                        />
                                                    </label>
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Supports: Images, PDF, DOC,
                                                    DOCX (Max 10MB each)
                                                </p>
                                            </div>
                                        </div>

                                        {/* File List */}
                                        {files.length > 0 && (
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-medium">
                                                    Attached Files:
                                                </h4>
                                                <div className="space-y-2">
                                                    {files.map(
                                                        (file, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center justify-between p-3 bg-accent rounded-lg"
                                                            >
                                                                <div className="flex items-center space-x-3">
                                                                    {file.type.startsWith(
                                                                        "image/"
                                                                    ) ? (
                                                                        <ImageIcon className="h-5 w-5 text-primary" />
                                                                    ) : (
                                                                        <FileText className="h-5 w-5 text-gray-500" />
                                                                    )}
                                                                    <div>
                                                                        <p className="text-sm font-medium  truncate max-w-[200px]">
                                                                            {
                                                                                file.name
                                                                            }
                                                                        </p>
                                                                        <p className="text-xs text-gray-500">
                                                                            {formatFileSize(
                                                                                file.size
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        removeFile(
                                                                            index
                                                                        )
                                                                    }
                                                                    className="text-red-500 hover:text-red-700"
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-6">
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={isLoadingHandleCreateIssue}
                                        >
                                            {isLoadingHandleCreateIssue ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                "Kirim Pengaduan"
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

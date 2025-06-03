import type React from "react";

import { useState, useCallback } from "react";
import { Upload, X, FileText, ImageIcon, ArrowLeft } from "lucide-react";
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
import CTAHeader from "@/components/cta-header";

const locationData = {
    provinces: [
        { id: "jawa-barat", name: "Jawa Barat" },
        { id: "jawa-tengah", name: "Jawa Tengah" },
        { id: "jawa-timur", name: "Jawa Timur" },
        { id: "dki-jakarta", name: "DKI Jakarta" },
    ],
    cities: {
        "jawa-barat": [
            { id: "bandung", name: "Bandung" },
            { id: "bekasi", name: "Bekasi" },
            { id: "bogor", name: "Bogor" },
        ],
        "jawa-tengah": [
            { id: "semarang", name: "Semarang" },
            { id: "solo", name: "Solo" },
            { id: "yogyakarta", name: "Yogyakarta" },
        ],
        "jawa-timur": [
            { id: "surabaya", name: "Surabaya" },
            { id: "malang", name: "Malang" },
            { id: "kediri", name: "Kediri" },
        ],
        "dki-jakarta": [
            { id: "jakarta-pusat", name: "Jakarta Pusat" },
            { id: "jakarta-utara", name: "Jakarta Utara" },
            { id: "jakarta-selatan", name: "Jakarta Selatan" },
        ],
    },
    districts: {
        bandung: [
            { id: "coblong", name: "Coblong" },
            { id: "cicendo", name: "Cicendo" },
        ],
        bekasi: [
            { id: "bekasi-timur", name: "Bekasi Timur" },
            { id: "bekasi-barat", name: "Bekasi Barat" },
        ],
        semarang: [
            { id: "semarang-tengah", name: "Semarang Tengah" },
            { id: "semarang-utara", name: "Semarang Utara" },
        ],
        surabaya: [
            { id: "surabaya-pusat", name: "Surabaya Pusat" },
            { id: "surabaya-timur", name: "Surabaya Timur" },
        ],
    },
    subdistricts: {
        coblong: [
            { id: "dago", name: "Dago" },
            { id: "lebak-siliwangi", name: "Lebak Siliwangi" },
        ],
        cicendo: [
            { id: "arjuna", name: "Arjuna" },
            { id: "husen-sastranegara", name: "Husen Sastranegara" },
        ],
        "semarang-tengah": [
            { id: "kauman", name: "Kauman" },
            { id: "sekayu", name: "Sekayu" },
        ],
    },
};

interface FileWithPreview extends File {
    preview?: string;
}

export default function CreateIssue({
    categories: data,
}: {
    categories: Category[];
}) {
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

    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleSubmitCreateIssue = (data: CreateIssueFormSchema) => {
        console.log({ data, files });
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
                    <CTAHeader>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-gray-900">
                                Pengaduan Baru
                            </h1>
                            <p className="text-gray-600">
                                Buat pengaduan baru dengan mengisi formulir
                                berikut.
                            </p>
                        </div>
                    </CTAHeader>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-gray-900">
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
                                                        className="text-sm font-medium text-gray-700"
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
                                                                        ? "border-red-500"
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
                                                        className="text-sm font-medium text-gray-700"
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
                                                                    ? "border-red-500"
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
                                                        className="text-sm font-medium text-gray-700"
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
                                                                    ? "border-red-500"
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
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Detail Lokasi
                                        </h3>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {/* Provinsi */}
                                            <FormField
                                                name={"location.provinsi"}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="space-y-2">
                                                            <FormLabel
                                                                htmlFor="province"
                                                                className="text-sm font-medium text-gray-700"
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
                                                                                ? "border-red-500"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        <SelectValue placeholder="Pilih Provinsi" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {locationData.provinces.map(
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
                                                                className="text-sm font-medium text-gray-700"
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
                                                                        )
                                                                    }
                                                                >
                                                                    <SelectTrigger
                                                                        className={`w-full ${
                                                                            form
                                                                                .formState
                                                                                .errors
                                                                                .location
                                                                                ?.kota
                                                                                ? "border-red-500"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        <SelectValue placeholder="Pilih Kota" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {form.getValues(
                                                                            "location.provinsi"
                                                                        ) &&
                                                                            locationData.cities[
                                                                                form.getValues(
                                                                                    "location.provinsi"
                                                                                ) as keyof typeof locationData.cities
                                                                            ]?.map(
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
                                                                className="text-sm font-medium text-gray-700"
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
                                                                        )
                                                                    }
                                                                >
                                                                    <SelectTrigger
                                                                        className={`w-full ${
                                                                            form
                                                                                .formState
                                                                                .errors
                                                                                .location
                                                                                ?.kecamatan
                                                                                ? "border-red-500"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        <SelectValue placeholder="Pilih Kecamatan" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {form.getValues(
                                                                            "location.kota"
                                                                        ) &&
                                                                            locationData.districts[
                                                                                form.getValues(
                                                                                    "location.kota"
                                                                                ) as keyof typeof locationData.districts
                                                                            ]?.map(
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
                                                                className="text-sm font-medium text-gray-700"
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
                                                                        )
                                                                    }
                                                                >
                                                                    <SelectTrigger
                                                                        className={`w-full ${
                                                                            form
                                                                                .formState
                                                                                .errors
                                                                                .location
                                                                                ?.kelurahan
                                                                                ? "border-red-500"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        <SelectValue placeholder="Pilih Kelurahan" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {form.getValues(
                                                                            "location.kecamatan"
                                                                        ) &&
                                                                            locationData.subdistricts[
                                                                                form.getValues(
                                                                                    "location.kecamatan"
                                                                                ) as keyof typeof locationData.subdistricts
                                                                            ]?.map(
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
                                        <Label className="text-sm font-medium text-gray-700">
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
                                            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-600">
                                                    Drag and drop files here, or{" "}
                                                    <label className="font-medium text-blue-600 cursor-pointer hover:text-blue-500">
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
                                                <h4 className="text-sm font-medium text-gray-700">
                                                    Attached Files:
                                                </h4>
                                                <div className="space-y-2">
                                                    {files.map(
                                                        (file, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                                                            >
                                                                <div className="flex items-center space-x-3">
                                                                    {file.type.startsWith(
                                                                        "image/"
                                                                    ) ? (
                                                                        <ImageIcon className="w-5 h-5 text-blue-500" />
                                                                    ) : (
                                                                        <FileText className="w-5 h-5 text-gray-500" />
                                                                    )}
                                                                    <div>
                                                                        <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
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
                                                                    <X className="w-4 h-4" />
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
                                            className="w-full text-white bg-blue-600 hover:bg-blue-700"
                                        >
                                            Kirim Pengaduan
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

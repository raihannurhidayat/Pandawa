import React, { useState, useEffect } from "react";
import {
    UseFormReturn,
    Controller,
    useFormContext,
    useWatch,
} from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { API_WILAYAH } from "@/constant/api-wilayah";
import { Provinsi } from "@/types/wilayah";
import { LocationFormSchema } from "@/forms/location";

export function LocationSelector() {
    const { control, reset, setValue, getValues } =
        useFormContext<LocationFormSchema>();

    const provinsiValue = useWatch({ control, name: "location.provinsi" });
    const kotaValue = useWatch({ control, name: "location.kota" });
    const kecamatanValue = useWatch({ control, name: "location.kecamatan" });

    const [provinsiList, setProvinsiList] = useState<Provinsi[]>([]);
    const [kotaList, setKotaList] = useState<any[]>([]);
    const [kecamatanList, setKecamatanList] = useState<any[]>([]);
    const [kelurahanList, setKelurahanList] = useState<any[]>([]);

    const headers = { "X-API-KEY": import.meta.env.VITE_API_WILAYAH };

    useEffect(() => {
        setTimeout(() => {
            reset();
        }, 100);
    }, [reset]);

    const fetchList = async (url: string) => {
        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error("Failed to fetch " + url);
        const body = await res.json();
        return body.data as any[];
    };

    // 1) Load provinces once
    useEffect(() => {
        fetchList(`${API_WILAYAH}/provinsi`)
            .then(setProvinsiList)
            .catch(console.error);
    }, []);

    // 2) When provinsi changes, clear everything below it, then fetch kota
    useEffect(() => {
        // clear downstream selects & values
        setKotaList([]);
        setKecamatanList([]);
        setKelurahanList([]);
        setValue("location.kota", undefined);
        setValue("location.kecamatan", undefined);
        setValue("location.kelurahan", undefined);

        if (!provinsiValue) return;

        fetchList(`${API_WILAYAH}/kota?provinsi_id=${provinsiValue}`)
            .then(setKotaList)
            .catch(console.error);
    }, [provinsiValue, setValue]);

    // 3) When kota changes, clear kecamatan+kelurahan, then fetch kecamatan
    useEffect(() => {
        setKecamatanList([]);
        setKelurahanList([]);
        setValue("location.kecamatan", undefined);
        setValue("location.kelurahan", undefined);

        if (!kotaValue) return;

        fetchList(`${API_WILAYAH}/kecamatan?kota_id=${kotaValue}`)
            .then(setKecamatanList)
            .catch(console.error);
    }, [kotaValue, setValue]);

    // 4) When kecamatan changes, clear kelurahan, then fetch kelurahan
    useEffect(() => {
        setKelurahanList([]);
        setValue("location.kelurahan", undefined);

        if (!kecamatanValue) return;

        fetchList(`${API_WILAYAH}/kelurahan?kecamatan_id=${kecamatanValue}`)
            .then(setKelurahanList)
            .catch(console.error);
    }, [kecamatanValue, setValue]);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Detail Lokasi</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Provinsi */}
                <Controller
                    control={control}
                    name="location.provinsi"
                    defaultValue={getValues("location.provinsi")}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Provinsi <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value || ""}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Provinsi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {provinsiList.map((p) => (
                                            <SelectItem key={p.id} value={p.id}>
                                                {p.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Kota */}
                <Controller
                    control={control}
                    name="location.kota"
                    defaultValue={getValues("location.kota")}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Kota <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value || ""}
                                    onValueChange={field.onChange}
                                    disabled={!kotaList.length}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Kota" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kotaList.map((c) => (
                                            <SelectItem key={c.id} value={c.id}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Kecamatan */}
                <Controller
                    control={control}
                    name="location.kecamatan"
                    defaultValue={getValues("location.kecamatan")}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Kecamatan{" "}
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value || ""}
                                    onValueChange={field.onChange}
                                    disabled={!kecamatanList.length}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Kecamatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kecamatanList.map((d) => (
                                            <SelectItem key={d.id} value={d.id}>
                                                {d.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Kelurahan */}
                <Controller
                    control={control}
                    name="location.kelurahan"
                    defaultValue={getValues("location.kelurahan")}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Kelurahan{" "}
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value || ""}
                                    onValueChange={field.onChange}
                                    disabled={!kelurahanList.length}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Kelurahan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kelurahanList.map((s) => (
                                            <SelectItem key={s.id} value={s.id}>
                                                {s.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}

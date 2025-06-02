import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectItem,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from "@/components/ui/select";
import axios from "axios";

const LocationFilter = ({ onChange }: any) => {
    const apiUrl = "https://emsifa.github.io/api-wilayah-indonesia/api";

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    const [selected, setSelected] = useState({
        province: "",
        city: "",
        district: "",
        village: "",
    });

    function getUrl(endpoint: string) {
        return `${apiUrl}/${endpoint}`;
    }

    // Fetch Provinsi
    useEffect(() => {
        axios.get(getUrl("provinces.json")).then((res) => {
            setProvinces(res.data);
        });
    }, []);

    const handleChange = async ({
        level,
        value,
    }: {
        level: string;
        value: string;
    }) => {
        const updated = { ...selected, [level]: value };

        if (level === "province") {
            updated.city = "";
            updated.district = "";
            updated.village = "";
            setCities([]);
            setDistricts([]);
            setVillages([]);
            const res = await axios.get(getUrl(`/regencies/${value}.json`));
            setCities(res.data);
        }

        if (level === "city") {
            updated.district = "";
            updated.village = "";
            setDistricts([]);
            setVillages([]);
            const res = await axios.get(getUrl(`/districts/${value}.json`));
            setDistricts(res.data);
        }

        if (level === "district") {
            updated.village = "";
            setVillages([]);
            const res = await axios.get(getUrl(`/villages/${value}.json`));
            setVillages(res.data);
        }

        setSelected(updated);
        onChange({
            province: updated.province,
            city: updated.city,
            district: updated.district,
            village: updated.village,
        });
    };

    const renderOptions = ({ data }: any) =>
        data.map((item: { id: string; name: string }) => (
            <option key={item.id} value={item.id}>
                {item.name}
            </option>
        ));

    return (
        <div className="grid gap-4">
            {/* Provinsi */}
            <div className="grid gap-2">
                <Label>Provinsi</Label>
                <Select
                    // required
                    value={selected.province}
                    onValueChange={(value) =>
                        handleChange({
                            level: "province",
                            value,
                        })
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih provinsi" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                        <SelectGroup>
                            {provinces.map(
                                (prov: { id: string; name: string }) => (
                                    <SelectItem key={prov.id} value={prov.id}>
                                        {prov.name}
                                    </SelectItem>
                                )
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Kabupaten/Kota */}
            <div className="grid gap-2">
                <Label>Kabupaten/Kota</Label>
                <Select
                    // required
                    value={selected.city}
                    onValueChange={(value) =>
                        handleChange({
                            level: "city",
                            value,
                        })
                    }
                    disabled={!selected.province}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kabupaten/kota" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                        <SelectGroup>
                            {cities.map(
                                (city: { id: string; name: string }) => (
                                    <SelectItem key={city.id} value={city.id}>
                                        {city.name}
                                    </SelectItem>
                                )
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Kecamatan */}
            <div className="grid gap-2">
                <Label>Kecamatan</Label>
                <Select
                    // required
                    value={selected.district}
                    onValueChange={(value) =>
                        handleChange({
                            level: "district",
                            value,
                        })
                    }
                    disabled={!selected.city}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kecamatan" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                        <SelectGroup>
                            {districts.map(
                                (district: { id: string; name: string }) => (
                                    <SelectItem
                                        key={district.id}
                                        value={district.id}
                                    >
                                        {district.name}
                                    </SelectItem>
                                )
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Kelurahan */}
            <div className="grid gap-2">
                <Label>Kelurahan</Label>
                <Select
                    // required
                    value={selected.village}
                    onValueChange={(value) =>
                        handleChange({
                            level: "village",
                            value,
                        })
                    }
                    disabled={!selected.district}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kelurahan" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                        <SelectGroup>
                            {villages.map(
                                (village: { id: string; name: string }) => (
                                    <SelectItem
                                        key={village.id}
                                        value={village.id}
                                    >
                                        {village.name}
                                    </SelectItem>
                                )
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default LocationFilter;

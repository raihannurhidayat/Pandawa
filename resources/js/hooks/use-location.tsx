import { API_WILAYAH } from "@/constant/api-wilayah";
import { JsonStringified, PartialAddress, Address } from "@/types/location";
import { useEffect, useState } from "react";

export function useLocation(
    location:
        | JsonStringified<PartialAddress | Address>
        | PartialAddress
        | Address
) {
    const [provinsi, setProvinsi] = useState("");
    const [kota, setKota] = useState("");
    const [kecamatan, setKecamatan] = useState("");
    const [kelurahan, setKelurahan] = useState("");

    let locationObjeck: PartialAddress | Address;

    if (typeof location === "string") {
        locationObjeck = JSON.parse(location);
    } else {
        locationObjeck = location;
    }

    useEffect(() => {
        const fetchWilayah = async () => {
            const responseProvinsi = await fetch(`${API_WILAYAH}/provinsi`, {
                headers: {
                    "X-API-KEY": import.meta.env.VITE_API_WILAYAH,
                },
            });
            const dataProvinsi = await responseProvinsi.json();
            const provinsi = dataProvinsi.data.find(
                (value: any) => value.id === locationObjeck.provinsi
            );

            setProvinsi(provinsi.name);

            const responseKota = await fetch(
                `${API_WILAYAH}/kota?provinsi_id=${provinsi.id}`,
                {
                    headers: {
                        "X-API-KEY": import.meta.env.VITE_API_WILAYAH,
                    },
                }
            );
            const dataKota = await responseKota.json();
            const kota = dataKota.data.find(
                (value: any) => value.id === locationObjeck.kota
            );

            setKota(kota.name);

            const responseKecamatan = await fetch(
                `${API_WILAYAH}/kecamatan?kota_id=${kota.id}`,
                {
                    headers: {
                        "X-API-KEY": import.meta.env.VITE_API_WILAYAH,
                    },
                }
            );
            const dataKecamatan = await responseKecamatan.json();
            const kecamatan = dataKecamatan.data.find(
                (value: any) => value.id === locationObjeck.kecamatan
            );

            setKecamatan(kecamatan.name);

            const responseKelurahan = await fetch(
                `${API_WILAYAH}/kelurahan?kecamatan_id=${kecamatan.id}`,
                {
                    headers: {
                        "X-API-KEY": import.meta.env.VITE_API_WILAYAH,
                    },
                }
            );
            const dataKelurahan = await responseKelurahan.json();
            const kelurahan = dataKelurahan.data.find(
                (value: any) => value.id === locationObjeck.kelurahan
            );
            setKelurahan(kelurahan.name);
        };

        fetchWilayah();
    }, [location]);

    return {
        provinsi,
        kota,
        kecamatan,
        kelurahan,
    };
}

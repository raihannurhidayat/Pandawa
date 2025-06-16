import { API_WILAYAH } from "@/constant/api-wilayah";
import { JsonStringified, PartialAddress, Address } from "@/types/location";
import { useEffect, useState } from "react";

export function useLocation(
    location:
        | JsonStringified<PartialAddress | Address>
        | PartialAddress
        | Address
        | null
) {
    const [provinsi, setProvinsi] = useState<string | null>(null);
    const [kota, setKota] = useState<string | null>(null);
    const [kecamatan, setKecamatan] = useState<string | null>(null);
    const [kelurahan, setKelurahan] = useState<string | null>(null);


    // Parse if input is JSON string
    let locationObj: PartialAddress | Address | null;
    if (typeof location === "string") {
        try {
            locationObj = JSON.parse(location);
        } catch {
            locationObj = null;
        }
    } else {
        locationObj = location;
    }

    const [coordinats, setCoordinats] = useState(locationObj?.coordinats!)

    useEffect(() => {
        const fetchWilayah = async () => {
            try {
                // Clear all fields before fetching or when no location
                setProvinsi(null);
                setKota(null);
                setKecamatan(null);
                setKelurahan(null);

                // If location is null or empty, skip fetching
                if (!locationObj) {
                    return;
                }

                // 1. Provinsi
                if (locationObj.provinsi) {
                    const respProv = await fetch(`${API_WILAYAH}/provinsi`, {
                        headers: {
                            "X-API-KEY": import.meta.env.VITE_API_WILAYAH,
                        },
                    });
                    const dataProv = await respProv.json();
                    const foundProv = dataProv.data.find(
                        (v: any) => v.id === locationObj.provinsi
                    );
                    if (foundProv) {
                        setProvinsi(foundProv.name);
                    } else {
                        return;
                    }

                    // 2. Kota
                    if (locationObj.kota) {
                        const respKota = await fetch(
                            `${API_WILAYAH}/kota?provinsi_id=${foundProv.id}`,
                            {
                                headers: {
                                    "X-API-KEY": import.meta.env
                                        .VITE_API_WILAYAH,
                                },
                            }
                        );
                        const dataKota = await respKota.json();
                        const foundKota = dataKota.data.find(
                            (v: any) => v.id === locationObj.kota
                        );
                        if (foundKota) {
                            setKota(foundKota.name);
                        } else {
                            return;
                        }

                        // 3. Kecamatan
                        if (locationObj.kecamatan) {
                            const respKec = await fetch(
                                `${API_WILAYAH}/kecamatan?kota_id=${foundKota.id}`,
                                {
                                    headers: {
                                        "X-API-KEY": import.meta.env
                                            .VITE_API_WILAYAH,
                                    },
                                }
                            );
                            const dataKec = await respKec.json();
                            const foundKec = dataKec.data.find(
                                (v: any) => v.id === locationObj.kecamatan
                            );
                            if (foundKec) {
                                setKecamatan(foundKec.name);
                            } else {
                                return;
                            }

                            // 4. Kelurahan
                            if (locationObj.kelurahan) {
                                const respKel = await fetch(
                                    `${API_WILAYAH}/kelurahan?kecamatan_id=${foundKec.id}`,
                                    {
                                        headers: {
                                            "X-API-KEY": import.meta.env
                                                .VITE_API_WILAYAH,
                                        },
                                    }
                                );
                                const dataKel = await respKel.json();
                                const foundKel = dataKel.data.find(
                                    (v: any) => v.id === locationObj.kelurahan
                                );
                                if (foundKel) {
                                    setKelurahan(foundKel.name);
                                }
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching wilayah data:", error);
            }
        };

        fetchWilayah();
    }, [location]);

    return { provinsi, kota, kecamatan, kelurahan, coordinats };
}

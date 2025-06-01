import { FormEventHandler, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
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

function CreateIssue({ categories }: { categories: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        body: "",
        issue_category_id: "",
        location: "",
    });

    const provinsi = [
        {
            id: "11",
            name: "ACEH",
        },
        {
            id: "12",
            name: "SUMATERA UTARA",
        },
        {
            id: "13",
            name: "SUMATERA BARAT",
        },
        {
            id: "14",
            name: "RIAU",
        },
        {
            id: "15",
            name: "JAMBI",
        },
        {
            id: "16",
            name: "SUMATERA SELATAN",
        },
        {
            id: "17",
            name: "BENGKULU",
        },
        {
            id: "18",
            name: "LAMPUNG",
        },
        {
            id: "19",
            name: "KEPULAUAN BANGKA BELITUNG",
        },
        {
            id: "21",
            name: "KEPULAUAN RIAU",
        },
        {
            id: "31",
            name: "DKI JAKARTA",
        },
        {
            id: "32",
            name: "JAWA BARAT",
        },
        {
            id: "33",
            name: "JAWA TENGAH",
        },
        {
            id: "34",
            name: "DI YOGYAKARTA",
        },
        {
            id: "35",
            name: "JAWA TIMUR",
        },
        {
            id: "36",
            name: "BANTEN",
        },
        {
            id: "51",
            name: "BALI",
        },
        {
            id: "52",
            name: "NUSA TENGGARA BARAT",
        },
        {
            id: "53",
            name: "NUSA TENGGARA TIMUR",
        },
        {
            id: "61",
            name: "KALIMANTAN BARAT",
        },
        {
            id: "62",
            name: "KALIMANTAN TENGAH",
        },
        {
            id: "63",
            name: "KALIMANTAN SELATAN",
        },
        {
            id: "64",
            name: "KALIMANTAN TIMUR",
        },
        {
            id: "65",
            name: "KALIMANTAN UTARA",
        },
        {
            id: "71",
            name: "SULAWESI UTARA",
        },
        {
            id: "72",
            name: "SULAWESI TENGAH",
        },
        {
            id: "73",
            name: "SULAWESI SELATAN",
        },
        {
            id: "74",
            name: "SULAWESI TENGGARA",
        },
        {
            id: "75",
            name: "GORONTALO",
        },
        {
            id: "76",
            name: "SULAWESI BARAT",
        },
        {
            id: "81",
            name: "MALUKU",
        },
        {
            id: "82",
            name: "MALUKU UTARA",
        },
        {
            id: "91",
            name: "PAPUA BARAT",
        },
        {
            id: "94",
            name: "PAPUA",
        },
    ];

    const kabupaten = [
        {
            id: "3201",
            province_id: "32",
            name: "KABUPATEN BOGOR",
        },
        {
            id: "3202",
            province_id: "32",
            name: "KABUPATEN SUKABUMI",
        },
        {
            id: "3203",
            province_id: "32",
            name: "KABUPATEN CIANJUR",
        },
        {
            id: "3204",
            province_id: "32",
            name: "KABUPATEN BANDUNG",
        },
        {
            id: "3205",
            province_id: "32",
            name: "KABUPATEN GARUT",
        },
        {
            id: "3206",
            province_id: "32",
            name: "KABUPATEN TASIKMALAYA",
        },
        {
            id: "3207",
            province_id: "32",
            name: "KABUPATEN CIAMIS",
        },
        {
            id: "3208",
            province_id: "32",
            name: "KABUPATEN KUNINGAN",
        },
        {
            id: "3209",
            province_id: "32",
            name: "KABUPATEN CIREBON",
        },
        {
            id: "3210",
            province_id: "32",
            name: "KABUPATEN MAJALENGKA",
        },
        {
            id: "3211",
            province_id: "32",
            name: "KABUPATEN SUMEDANG",
        },
        {
            id: "3212",
            province_id: "32",
            name: "KABUPATEN INDRAMAYU",
        },
        {
            id: "3213",
            province_id: "32",
            name: "KABUPATEN SUBANG",
        },
        {
            id: "3214",
            province_id: "32",
            name: "KABUPATEN PURWAKARTA",
        },
        {
            id: "3215",
            province_id: "32",
            name: "KABUPATEN KARAWANG",
        },
        {
            id: "3216",
            province_id: "32",
            name: "KABUPATEN BEKASI",
        },
        {
            id: "3217",
            province_id: "32",
            name: "KABUPATEN BANDUNG BARAT",
        },
        {
            id: "3218",
            province_id: "32",
            name: "KABUPATEN PANGANDARAN",
        },
        {
            id: "3271",
            province_id: "32",
            name: "KOTA BOGOR",
        },
        {
            id: "3272",
            province_id: "32",
            name: "KOTA SUKABUMI",
        },
        {
            id: "3273",
            province_id: "32",
            name: "KOTA BANDUNG",
        },
        {
            id: "3274",
            province_id: "32",
            name: "KOTA CIREBON",
        },
        {
            id: "3275",
            province_id: "32",
            name: "KOTA BEKASI",
        },
        {
            id: "3276",
            province_id: "32",
            name: "KOTA DEPOK",
        },
        {
            id: "3277",
            province_id: "32",
            name: "KOTA CIMAHI",
        },
        {
            id: "3278",
            province_id: "32",
            name: "KOTA TASIKMALAYA",
        },
        {
            id: "3279",
            province_id: "32",
            name: "KOTA BANJAR",
        },
    ];

    const kecamatan = [
        {
            id: "3210010",
            regency_id: "3210",
            name: "LEMAHSUGIH",
        },
        {
            id: "3210020",
            regency_id: "3210",
            name: "BANTARUJEG",
        },
        {
            id: "3210021",
            regency_id: "3210",
            name: "MALAUSMA",
        },
        {
            id: "3210030",
            regency_id: "3210",
            name: "CIKIJING",
        },
        {
            id: "3210031",
            regency_id: "3210",
            name: "CINGAMBUL",
        },
        {
            id: "3210040",
            regency_id: "3210",
            name: "TALAGA",
        },
        {
            id: "3210041",
            regency_id: "3210",
            name: "BANJARAN",
        },
        {
            id: "3210050",
            regency_id: "3210",
            name: "ARGAPURA",
        },
        {
            id: "3210060",
            regency_id: "3210",
            name: "MAJA",
        },
        {
            id: "3210070",
            regency_id: "3210",
            name: "MAJALENGKA",
        },
        {
            id: "3210080",
            regency_id: "3210",
            name: "CIGASONG",
        },
        {
            id: "3210090",
            regency_id: "3210",
            name: "SUKAHAJI",
        },
        {
            id: "3210091",
            regency_id: "3210",
            name: "SINDANG",
        },
        {
            id: "3210100",
            regency_id: "3210",
            name: "RAJAGALUH",
        },
        {
            id: "3210110",
            regency_id: "3210",
            name: "SINDANGWANGI",
        },
        {
            id: "3210120",
            regency_id: "3210",
            name: "LEUWIMUNDING",
        },
        {
            id: "3210130",
            regency_id: "3210",
            name: "PALASAH",
        },
        {
            id: "3210140",
            regency_id: "3210",
            name: "JATIWANGI",
        },
        {
            id: "3210150",
            regency_id: "3210",
            name: "DAWUAN",
        },
        {
            id: "3210151",
            regency_id: "3210",
            name: "KASOKANDEL",
        },
        {
            id: "3210160",
            regency_id: "3210",
            name: "PANYINGKIRAN",
        },
        {
            id: "3210170",
            regency_id: "3210",
            name: "KADIPATEN",
        },
        {
            id: "3210180",
            regency_id: "3210",
            name: "KERTAJATI",
        },
        {
            id: "3210190",
            regency_id: "3210",
            name: "JATITUJUH",
        },
        {
            id: "3210200",
            regency_id: "3210",
            name: "LIGUNG",
        },
        {
            id: "3210210",
            regency_id: "3210",
            name: "SUMBERJAYA",
        },
    ];

    const kelurahan = [
        {
            id: "3210070001",
            district_id: "3210070",
            name: "BABAKAN JAWA",
        },
        {
            id: "3210070002",
            district_id: "3210070",
            name: "CIBODAS",
        },
        {
            id: "3210070004",
            district_id: "3210070",
            name: "KAWUNGGIRANG",
        },
        {
            id: "3210070005",
            district_id: "3210070",
            name: "SINDANGKASIH",
        },
        {
            id: "3210070006",
            district_id: "3210070",
            name: "CICURUG",
        },
        {
            id: "3210070007",
            district_id: "3210070",
            name: "MAJALENGKA WETAN",
        },
        {
            id: "3210070008",
            district_id: "3210070",
            name: "TONJONG",
        },
        {
            id: "3210070009",
            district_id: "3210070",
            name: "TARIKOLOT",
        },
        {
            id: "3210070010",
            district_id: "3210070",
            name: "CIKASARUNG",
        },
        {
            id: "3210070011",
            district_id: "3210070",
            name: "CIJATI",
        },
        {
            id: "3210070012",
            district_id: "3210070",
            name: "MAJALENGKA KULON",
        },
        {
            id: "3210070014",
            district_id: "3210070",
            name: "SIDAMUKTI",
        },
    ];

    const handleIssueCategoryChange = (e: any) => {
        setData("issue_category_id", e.target.value);
    };

    useEffect(() => {
        async function getLocation() {
            const response = await fetch(
                "https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json"
            );

            const data = await response.json();

            console.log("location");
        }

        // getLocation();
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("pengaduan/create"));
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <Head title="Pengaduan" />

            <form onSubmit={submit}>
                <Card className="flex flex-col max-w-sm gap-4 mx-auto">
                    <CardHeader className="flex flex-col items-center justify-center gap-2">
                        <CardTitle className="text-2xl">
                            Ajukan Pengaduan
                        </CardTitle>
                        <CardDescription>Buat pengaduan baru</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="issue_category_id">Kategori</Label>
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
                                                value={category.id}
                                            >
                                                {category.name}
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
                            <Label htmlFor="body">Deskripsi Pengaduan</Label>
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
                        <div className="grid gap-2">
                            <Label>Provinsi</Label>
                            <Select required>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih provinsi" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60">
                                    <SelectGroup>
                                        {provinsi?.map((prov) => (
                                            <SelectItem
                                                key={prov.id}
                                                value={prov.id}
                                            >
                                                {prov.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Kabupaten</Label>
                            <Select required>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih kabupaten" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60">
                                    <SelectGroup>
                                        {kabupaten?.map((kab) => (
                                            <SelectItem
                                                key={kab.id}
                                                value={kab.id}
                                            >
                                                {kab.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Kecamatan</Label>
                            <Select required>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih kecamatan" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60">
                                    <SelectGroup>
                                        {kecamatan?.map((kec) => (
                                            <SelectItem
                                                key={kec.id}
                                                value={kec.id}
                                            >
                                                {kec.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Kelurahan</Label>
                            <Select required>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih kelurahan" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60">
                                    <SelectGroup>
                                        {kelurahan?.map((kel) => (
                                            <SelectItem
                                                key={kel.id}
                                                value={kel.id}
                                            >
                                                {kel.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}

export default CreateIssue;

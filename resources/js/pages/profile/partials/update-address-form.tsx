import { LocationSelector } from "@/components/forms/location-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { locationFormSchema, LocationFormSchema } from "@/forms/location";
import { PageProps, User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, usePage } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

function UpdateAddressForm({ className }: { className?: string }) {
    const { address } = usePage<PageProps<{ user: User }>>().props.auth.user;

    const [processing, setProcessing] = useState(false);

    const form = useForm<LocationFormSchema>({
        resolver: zodResolver(locationFormSchema),
        defaultValues: {
            location: {
                provinsi: address.provinsi ?? "",
                kota: address.kota ?? "",
                kelurahan: address.kelurahan ?? "",
                kecamatan: address.kecamatan ?? "",
            },
        },
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log(address);

        const data = { ...form.getValues(), _method: "patch" };

        console.log(data);

        // return;

        router.patch(route("profile.update"), data, {
            preserveScroll: true,
            onStart: () => {
                toast.loading("Pengaduan sedang diproses", {
                    id: "create-issues",
                });
                setProcessing(true);
            },
            onSuccess: () => {
                toast.success("Pengaduan berhasil dibuat", {
                    id: "create-issues",
                });
                form.reset();
                router.reload();
            },
            onError: () => {
                toast.error("Pengaduan gagal dibuat", {
                    id: "create-issues",
                });
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={submit} className={className}>
                <FormProvider {...form}>
                    <LocationSelector />
                </FormProvider>
                <div className="flex justify-end gap-2 mt-2">
                    <Button variant="outline" type="reset">
                        Reset
                    </Button>
                    <Button type="submit" disabled={processing}>
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default UpdateAddressForm;

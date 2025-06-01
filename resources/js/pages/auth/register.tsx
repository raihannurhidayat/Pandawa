import React, { FormEventHandler, useEffect } from "react";
import GuestLayout from "@/layouts/guest-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputError } from "@/components/ui/input-error";
import { Leaf } from "lucide-react";
import registerIlustration from "@/assets/images/Consent-pana.png";
import { toast } from "sonner";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onSuccess: () => {
                toast.success("Login successful", {
                    id: "register",
                    richColors: true,
                });
            },
            onError: () => {
                toast.error("Login failed", { id: "register" });
            },
            onStart: () => {
                toast.loading("Loading...", { id: "register" });
            },
        });
    };

    return (
        <React.Fragment>
            <Head title="Register" />

            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
                {/* form register */}
                <div className="flex items-center justify-center bg-white flex-col">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Leaf className="size-8 text-primary" />
                        <h2 className="text-3xl font-semibold bg-gradient-to-tr from-primary to-ring bg-clip-text text-transparent">
                            {" "}
                            Pandawa
                        </h2>
                    </div>
                    <form onSubmit={submit}>
                        <Card className="mx-auto max-w-sm">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    Sign Up
                                </CardTitle>
                                <CardDescription>
                                    Enter your information to create an account
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            value={data.name}
                                            required
                                        />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            value={data.email}
                                            required
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            value={data.password}
                                        />
                                        <InputError message={errors.password} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">
                                            Retype Password
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            value={data.password_confirmation}
                                        />
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Create an account
                                    </Button>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Already have an account?{" "}
                                    <Link href="/login" className="underline">
                                        Sign in
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </div>
                <div className="bg-primary hidden md:flex items-center justify-center">
                    <div className="max-w-96 ">
                        <img
                            src={registerIlustration}
                            alt="login-ilustration"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

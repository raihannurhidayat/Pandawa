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
import { cn } from "@/lib/utils";
import { useUsernameAvailability } from "@/hooks/use-username-availibility";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const { available, checking, debouncedUsername } = useUsernameAvailability(
        data.username
    );

    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setData(
            "username",
            e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")
        );
    }

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

            <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
                {/* form register */}
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Leaf className="size-8 text-primary" />
                        <h2 className="text-3xl font-semibold text-transparent bg-gradient-to-tr from-primary to-ring bg-clip-text">
                            {" "}
                            Pandawa
                        </h2>
                    </div>
                    <form onSubmit={submit}>
                        <Card className="max-w-sm mx-auto">
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
                                        <div className="flex items-center gap-2">
                                            <Label htmlFor="username">
                                                Username
                                            </Label>

                                            <p
                                                className={cn(
                                                    "transition-opacity duration-200 text-sm",
                                                    debouncedUsername === "" &&
                                                        "invisible",
                                                    {
                                                        "text-primary":
                                                            available === true,
                                                        "text-destructive":
                                                            available === false,
                                                        "text-accent": checking,
                                                    }
                                                )}
                                            >
                                                {!checking
                                                    ? available === true
                                                        ? `${debouncedUsername} is available`
                                                        : available === false
                                                        ? `${debouncedUsername} is taken`
                                                        : ""
                                                    : "Checking availability..."}
                                            </p>
                                        </div>
                                        <Input
                                            id="username"
                                            placeholder="johndoe"
                                            onChange={handleUsernameChange}
                                            value={data.username}
                                            required
                                        />
                                        <InputError message={errors.username} />
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
                                            Confirm Password
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
                                <div className="mt-4 text-sm text-center">
                                    Already have an account?{" "}
                                    <Link href="/login" className="underline">
                                        Sign in
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </div>
                <div className="items-center justify-center hidden bg-primary md:flex">
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

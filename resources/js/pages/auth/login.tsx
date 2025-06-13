import { FormEventHandler, useEffect } from "react";
import GuestLayout from "@/layouts/guest-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputError } from "@/components/ui/input-error";
import { Leaf } from "lucide-react";
import loginIlustration from "@/assets/images/Consent-cuate.png";
import { toast } from "sonner";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onSuccess: () => {
                toast.success("Login successful", {
                    id: "login",
                    richColors: true,
                });
            },
            onError: () => {
                toast.error("Login failed", { id: "login" });
            },
            onStart: () => {
                toast.loading("Logging in...", { id: "login" });
            },
        });
    };

    return (
        <>
            <Head title="Login" />

            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
                {/* form login */}
                <div className="flex items-center justify-center flex-col">
                    <div className="flex items-center justify-center gap-2 mb-12">
                        <Leaf className="size-8 text-primary" />
                        <h2 className="text-3xl font-semibold bg-gradient-to-tr from-primary to-ring bg-clip-text text-transparent">
                            {" "}
                            Pandawa
                        </h2>
                    </div>
                    <form onSubmit={submit}>
                        <Card className="mx-auto max-w-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    Login
                                </CardTitle>
                                <CardDescription>
                                    Enter your email below to login to your
                                    account
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {status && (
                                    <div className="mb-4 font-medium text-sm text-green-600">
                                        {status}
                                    </div>
                                )}

                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="warga@gmail.com"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            required
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            <Link
                                                href={route("password.request")}
                                                className="ml-auto inline-block text-sm underline"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <InputError message={errors.password} />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <Link
                                        href="/register"
                                        className="underline"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </div>
                <div className="bg-primary hidden md:flex items-center justify-center">
                    <div className="max-w-96 ">
                        <img
                            src={loginIlustration}
                            alt="login-ilustration"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

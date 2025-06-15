import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler, useEffect, useState } from "react";
import { PageProps } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/input-error";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import { cn } from "@/lib/utils";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            username: user.username,
            name: user.name,
            email: user.email,
        });

    const [available, setAvailable] = useState(null);
    const [checking, setChecking] = useState(false);
    const debounceUsername = useDebounce(data.username, 500);

    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setData(
            "username",
            e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")
        );
    }

    const checkAvailability = async (username: string) => {
        if (!username) return;

        setChecking(true);

        try {
            const res = await axios.get(route("username.check"), {
                params: { username },
            });

            setAvailable(res.data.available);
        } catch (e) {
            setAvailable(null);
        } finally {
            setChecking(false);
        }
    };

    useEffect(() => {
        if (debounceUsername) {
            checkAvailability(debounceUsername);
        }
    }, [debounceUsername]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="space-x-1">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="username">Username</Label>

                        <p
                            className={cn(
                                "transition-opacity duration-200 text-base",
                                (!(
                                    data.username !== user.username &&
                                    available !== null
                                ) ||
                                    debounceUsername === "") &&
                                    "invisible",
                                {
                                    "text-primary": available === true,
                                    "text-destructive": available === false,
                                    "text-accent": checking,
                                }
                            )}
                        >
                            {!checking
                                ? available === true
                                    ? `${debounceUsername} is available`
                                    : available === false
                                    ? `${debounceUsername} is taken`
                                    : ""
                                : "Checking availability..."}
                        </p>
                    </div>

                    <Input
                        id="username"
                        className="block w-full mt-1"
                        value={data.username}
                        onChange={handleUsernameChange}
                        onBlur={() => {
                            if (!data.username)
                                setData("username", user.username);
                        }}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.username} />
                </div>

                <div>
                    <Label htmlFor="name">Name</Label>

                    <Input
                        id="name"
                        className="block w-full mt-1"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        className="block w-full mt-1"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

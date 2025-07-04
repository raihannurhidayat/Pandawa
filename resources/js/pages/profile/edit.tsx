import AuthenticatedLayout from "@/layouts/authenticated-layout";
import DeleteUserForm from "@/pages/profile/partials/delete-user-form";
import UpdatePasswordForm from "@/pages/profile/partials/update-password-form";
import UpdateProfilePhoto from "@/pages/profile/partials/update-profile-photo";
import UpdateProfileInformationForm from "@/pages/profile/partials/update-profile-information-form";
import UpdateAddressForm from "@/pages/profile/partials/update-address-form";
import { Head, usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PageProps } from "@/types";
import { Auth } from "@/types/auth";
import AuthenticatedUserLayout from "@/layouts/authenticatedUserLayout";

export default function Edit({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<PageProps<{ auth: Auth }>>().props;

    if (auth.user.role === "admin") {
        return (
            <AuthenticatedLayout header={"Edit Profile"}>
                <Head title="Profile" />

                <div className="space-y-6">
                    <Card>
                        <CardContent className="pb-0">
                            <UpdateProfilePhoto />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                Update your account's profile information and
                                email address.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Update Password</CardTitle>
                            <CardDescription>
                                Ensure your account is using a long, random
                                password to stay secure.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <UpdatePasswordForm className="max-w-xl" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Update Address</CardTitle>
                            <CardDescription>
                                Update your account's address
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <UpdateAddressForm className="max-w-xl" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Delete Account</CardTitle>
                            <CardDescription>
                                Once your account is deleted, all of its
                                resources and data will be permanently deleted.
                                Before deleting your account, please download
                                any data or information that you wish to retain.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <DeleteUserForm className="max-w-xl" />
                        </CardContent>
                    </Card>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedUserLayout header={"Edit Profile"}>
            <Head title="Profile" />

            <div className="space-y-6">
                <Card>
                    <CardContent className="pb-0">
                        <UpdateProfilePhoto />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                            Update your account's profile information and email
                            address.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Update Password</CardTitle>
                        <CardDescription>
                            Ensure your account is using a long, random password
                            to stay secure.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <UpdatePasswordForm className="max-w-xl" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Delete Account</CardTitle>
                        <CardDescription>
                            Once your account is deleted, all of its resources
                            and data will be permanently deleted. Before
                            deleting your account, please download any data or
                            information that you wish to retain.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <DeleteUserForm className="max-w-xl" />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedUserLayout>
    );
}

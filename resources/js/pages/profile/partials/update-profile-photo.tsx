import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { Edit } from "lucide-react";
import { FormEventHandler } from "react";

function UpdateProfilePhoto() {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <div className="flex flex-col items-center justify-between w-full gap-4 py-4 md:flex-row">
            <UserAvatar user={user} size="lg" showInformation={true} />
            <div>
                <Button variant="outline">
                    <Edit className="w-4 h-4" />
                    Edit
                </Button>
            </div>
        </div>
    );
}

export default UpdateProfilePhoto;

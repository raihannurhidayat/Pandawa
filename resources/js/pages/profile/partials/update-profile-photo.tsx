import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/user-avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { Edit, Edit3Icon, EllipsisVertical } from "lucide-react";
import { FormEventHandler } from "react";

function UpdateProfilePhoto() {
    const user = usePage<PageProps>().props.auth.user;

    const isMobile = useIsMobile();

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
        <div className="relative flex flex-col items-center justify-between w-full gap-4 py-4 md:flex-row">
            <UserAvatar
                size="lg"
                icon={<Edit3Icon className="w-full h-full p-1" />}
                showInformation={true}
            />
            {/* <UserAvatar size="lg" showInformation={true} /> */}

            {isMobile ? (
                <div className="absolute right-0 top-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <EllipsisVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Button variant="ghost" size="sm">
                                    Change Avatar
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button variant="ghost" size="sm">
                                    Delete Avatar
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ) : (
                <div className="flex items-end self-end gap-2">
                    <Button variant="outline">
                        Change Avatar
                        <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary">Delete Avatar</Button>
                </div>
            )}
        </div>
    );
}

export default UpdateProfilePhoto;

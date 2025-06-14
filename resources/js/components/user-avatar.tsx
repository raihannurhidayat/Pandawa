import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { PageProps, User } from "@/types";
import { usePage } from "@inertiajs/react";

interface UserAvatarProps {
    /**
     * The user to display. If not provided, display from auth user.
     */
    user?: User;

    /** numeric size for the Avatar (will be applied as `size-${size}`) */
    size?: number;
    /** extra Tailwind classes to apply to the outer wrapper */
    className?: string;
    /**
     * If false (default), only the avatar shows.
     * If true, renders a user info block from user info.
     */
    showInformation?: boolean;
}

export default function UserAvatar({
    user = usePage<PageProps>().props.auth.user,
    size,
    className = "",
    showInformation = false,
}: Partial<UserAvatarProps> = {}) {
    return (
        <div
            className={cn(
                "flex flex-col lg:flex-row items-center gap-2 lg:gap-4",
                className
            )}
        >
            <Avatar className={`size-${size}`}>
                <AvatarImage src={user?.profile_photo_path} />
                <AvatarFallback>SC</AvatarFallback>
            </Avatar>

            {showInformation && (
                <div className="flex flex-col items-center gap-1 leading-tight lg:items-start">
                    <h1 className="mb-2 text-lg">{user?.name}</h1>
                    <h2 className="text-slate-700 dark:text-slate-300">
                        {user?.role}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {user?.email}
                    </p>
                </div>
            )}
        </div>
    );
}

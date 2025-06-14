import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { PageProps, User } from "@/types";
import { usePage } from "@inertiajs/react";
import { cva, VariantProps } from "class-variance-authority";
import { User as UserIcon } from "lucide-react";

const userAvatarVariants = cva("size-10", {
    variants: {
        size: {
            sm: "size-8",
            md: "size-10",
            lg: "size-20",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export interface UserAvatarProps
    extends VariantProps<typeof userAvatarVariants> {
    /**
     * The user to display. If not provided, display from auth user.
     */
    user?: User;

    /** extra Tailwind classes to apply to the outer wrapper */
    className?: string;
    /**
     * If false (default), only the avatar shows.
     * If true, renders a user info block from user info.
     */
    showInformation?: boolean;
}

export default function UserAvatar({
    user = usePage<PageProps>().props.auth.user ?? undefined,
    size = "md",
    className = "",
    showInformation = false,
}: UserAvatarProps) {
    return (
        <div
            className={cn(
                "flex flex-col lg:flex-row items-center gap-2 lg:gap-4",
                className
            )}
        >
            <Avatar className={cn(userAvatarVariants({ size }))}>
                <AvatarImage src={user?.profile_photo_path} />
                <AvatarFallback className="flex items-center justify-center w-full h-full">
                    <UserIcon className="w-1/2 h-1/2" />
                </AvatarFallback>
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

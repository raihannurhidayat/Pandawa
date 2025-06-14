import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { PageProps, User } from "@/types";
import { usePage } from "@inertiajs/react";
import { cva, VariantProps } from "class-variance-authority";
import { Edit, User as UserIcon } from "lucide-react";

const userAvatarVariants = cva("size-10", {
    variants: {
        size: {
            sm: "size-8",
            md: "size-10",
            lg: "size-20",
        },
        indicator: {
            default: "bg-primary",
            secondary: "bg-secondary",
            danger: "bg-yellow-500 dark:bg-yellow-600",
            destructive: "bg-destructive",
            disabled: "bg-none",
        },
    },
    defaultVariants: {
        size: "md",
        indicator: "disabled",
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

    icon?: React.ReactNode;
}

export default function UserAvatar({
    user = usePage<PageProps>().props.auth.user ?? undefined,
    size = "md",
    className = "",
    showInformation = false,
    indicator = "disabled",
    icon = null,
}: UserAvatarProps) {
    return (
        <div
            className={cn(
                "flex flex-col lg:flex-row items-center gap-2 lg:gap-4",
                className
            )}
        >
            <div className="relative overflow-visible">
                <Avatar className={cn(userAvatarVariants({ size }))}>
                    <AvatarImage src={user?.profile_photo_url} />
                    <AvatarFallback className="flex items-center justify-center w-full h-full">
                        <UserIcon className="w-1/2 h-1/2" />
                    </AvatarFallback>
                </Avatar>

                {(indicator !== "disabled" || !!icon) && (
                    <div
                        className={cn(
                            icon
                                ? "bg-accent"
                                : userAvatarVariants({ indicator }),
                            "absolute rounded-full",
                            "w-[clamp(0.75rem,35%,1.5rem)] h-[clamp(0.75rem,35%,1.5rem)]",
                            "top-[calc(50%+35.36%)] left-[calc(50%+35.36%)]",
                            "transform -translate-x-1/2 -translate-y-1/2"
                            // tailwind black magic stuff , don't touch it
                        )}
                    >
                        {icon}
                    </div>
                )}
            </div>

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

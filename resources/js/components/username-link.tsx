import { cn } from "@/lib/utils";
import { User } from "@/types";
import { Link } from "@inertiajs/react";

function UsernameLink({ user, className }: { user: User; className?: string }) {
    return (
        <Link
            href={route("profile.show", { user: user.username })}
            className={cn("text-base text-blue-500", className)}
        >
            @{user.username}
        </Link>
    );
}

export default UsernameLink;

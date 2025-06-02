import { ReactNode } from "react";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Auth } from "@/types/auth";

export default function AuthenticatedUserLayout({
    children,
}: {
    children: ReactNode;
}) {
    const { auth } = usePage<PageProps<{ auth: Auth }>>().props;
    console.log(auth.user.role);

    if (auth.user.role === "admin") {
        return router.get("/onboarding");
    }

    return <div className="min-h-screen">{children}</div>;
}

import { PageProps } from "@/types";
import { router } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function Onboarding({ auth }: PageProps) {
    useEffect(() => {


        if (auth.user.role === "user") {
            // alert("user");
            console.log(auth.user.role);
            return router.get("/user/home");
        }

        if (auth.user.role === "admin") {
            return router.get("/dashboard");
        }

    }, [auth.user.role, auth]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Loader2 className="size-10 animate-spin" />
        </div>
    );
}

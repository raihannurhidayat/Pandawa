import { Button } from "@/components/ui/button";
import AuthenticatedUserLayout from "@/layouts/authenticatedUserLayout";
import { PageProps } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export default function Home() {

    const handleLogout = () => {
        router.post(
            route("logout"),
            {},
            {
                onSuccess: () => {
                    toast.success("Logged out successfully", {
                        id: "logout",
                        richColors: true,
                    });
                },
                onError: () => {
                    toast.error("Failed to logout");
                },
                onStart: () => {
                    toast.loading("Logging out...", {
                        id: "logout",
                        richColors: true,
                    });
                },
            }
        );
    };

    return (
        // @ts-ignore
        <AuthenticatedUserLayout>
            <Head title="Welcome" />
            <div>Home</div>
            <div>
                <Button onClick={handleLogout}>
                    <LogOut />
                    Log out
                </Button>
            </div>
        </AuthenticatedUserLayout>
    );
}

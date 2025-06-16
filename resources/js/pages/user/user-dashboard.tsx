import AuthenticatedUserLayout from "@/layouts/authenticatedUserLayout";
import { Head } from "@inertiajs/react";

export default function UserDashboard() {
    return (
        <AuthenticatedUserLayout>
            <Head title="Welcome" />
            <div>
                <h1>User Dashboard</h1>
            </div>
        </AuthenticatedUserLayout>
    );
}

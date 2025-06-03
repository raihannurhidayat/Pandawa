import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function CTAHeader({
    children,
}: React.PropsWithChildren<{ children?: React.ReactNode }>) {
    return (
        <>
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                </div>
                {children}
            </div>
        </>
    );
}

export default CTAHeader;

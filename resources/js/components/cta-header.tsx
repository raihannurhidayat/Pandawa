import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function CTAHeader({
    children,
}: React.PropsWithChildren<{ children?: React.ReactNode }>) {
    return (
        <>
            {/* Header Section */}
            <div className="flex flex-col w-full gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2"
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

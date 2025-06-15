import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, FileText, ImageIcon } from "lucide-react";
import { TYPE_MAP } from "@/forms/upload";
import { cn } from "@/lib/utils";

// Preview size options
type PreviewSize = "sm" | "md" | "lg" | "icon";

// Props for individual file items
export interface FileItemProps {
    file: File;
    onRemove: () => void;
    onClick?: () => void;
    preview?: PreviewSize;
}

// Reusable FileItem component
export default function FileItem({
    file,
    onRemove,
    onClick,
    preview = "icon",
}: FileItemProps) {
    const isImage = TYPE_MAP.image.includes(file.type);
    const Icon = isImage ? ImageIcon : FileText;

    // State to hold data URL for image preview
    const [urlPreview, setUrlPreview] = useState<string | null>(null);

    useEffect(() => {
        if (isImage && preview !== "icon") {
            const reader = new FileReader();
            reader.onload = () => {
                setUrlPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setUrlPreview(null);
        }
    }, [file, isImage, preview]);

    // map preview sizes to dimensions
    const sizeMap: Record<Exclude<PreviewSize, "icon">, string> = {
        sm: "h-6 w-6",
        md: "h-10 w-10",
        lg: "h-16 w-16",
    };

    // Render either image preview or icon
    const renderPreview = () => {
        if (isImage && preview !== "icon" && urlPreview) {
            const classes = `${
                sizeMap[preview as Exclude<PreviewSize, "icon">]
            } rounded`;
            return <img src={urlPreview} alt={file.name} className={classes} />;
        }

        return (
            <Icon
                className={`h-5 w-5 ${
                    isImage ? "text-primary" : "text-gray-500"
                }`}
            />
        );
    };

    return (
        <Card
            onClick={onClick}
            className={cn(
                "relative flex items-center justify-between p-3 rounded-lg bg-muted",
                "cursor-pointer"
            )}
        >
            <div className="flex items-center space-x-3">
                {renderPreview()}
                <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">
                        {file.name}
                    </p>
                </div>
            </div>
            <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    onRemove();
                }}
                className="z-50"
            >
                <X className="w-4 h-4" />
            </Button>
        </Card>
    );
}

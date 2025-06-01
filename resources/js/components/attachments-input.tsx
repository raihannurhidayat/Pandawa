import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

interface AttachmentInputProps {
    attachments: File[];
    setAttachments: (files: File[]) => void;
}

export function AttachmentInput({
    attachments,
    setAttachments,
}: AttachmentInputProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setAttachments([...attachments, ...Array.from(e.target.files)]);
    };

    const handleRemoveFile = (index: number) => {
        const newFiles = attachments.filter((_, i) => i !== index);
        setAttachments(newFiles);
    };

    return (
        <div className="space-y-4">
            <Input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
            />

            {attachments.length > 0 && (
                <div className="space-y-2">
                    {attachments.map((file, index) => (
                        <Card
                            key={index}
                            className="flex items-center justify-between p-2"
                        >
                            <CardContent className="p-0">
                                {file.name}
                            </CardContent>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveFile(index)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

interface AttachmentsInputProps {
    attachments: File[];
    setAttachments: (files: File[]) => void;
}

export function AttachmentsInput({
    attachments,
    setAttachments,
}: AttachmentsInputProps) {
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
                className="h-auto py-4"
            />

            <Collapsible className="w-full border rounded-md border-muted">
                <CollapsibleTrigger className="p-2" asChild>
                    <div className="flex items-center justify-between w-full hover:cursor-pointer">
                        <span className="ml-2 text-sm">
                            {attachments.length ?? 0} Attachments
                        </span>
                        <div className="flex items-center gap-1">
                            <Button
                                variant={"ghost"}
                                onClick={() => setAttachments([])}
                            >
                                Reset
                            </Button>
                            <Button variant={"outline"} size={"icon"}>
                                <ChevronDown className="w-3 h-3" />
                            </Button>
                        </div>
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="">
                    <Separator className="mb-2" />
                    <div className="px-1">
                        <ScrollArea className="flex flex-col justify-center w-full h-48 px-4">
                            {attachments.length > 0 && (
                                <div className="space-y-2">
                                    {attachments.map((file, index) => (
                                        <Card
                                            key={index}
                                            className="flex items-center justify-between gap-1 p-2"
                                        >
                                            <CardContent className="p-0">
                                                <span className="ml-1 text-xs truncate">
                                                    {file.name}
                                                </span>
                                            </CardContent>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleRemoveFile(index)
                                                }
                                            >
                                                <X className="w-3 h-3" />
                                            </Button>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}

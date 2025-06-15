import React, { useState, FormEventHandler } from "react";
import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/user-avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { router, useForm } from "@inertiajs/react";
import { Edit, Edit3Icon, EllipsisVertical } from "lucide-react";
import { toast } from "sonner";

interface UploadDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function UploadDialog({ open, onOpenChange }: UploadDialogProps) {
    const { data, setData, patch, processing, errors } = useForm<{
        photo: File | null;
    }>({ photo: null });
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (file: File) => {
        setData("photo", file);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // patch(route("profile.update"));
        router.post(
            route("profile.update"),
            {
                photo: data.photo,
                _method: "patch",
            },
            {
                onStart: () => toast.loading("Updating...", { id: "update" }),
                onSuccess: () => {
                    toast.success("Update successful", {
                        id: "update",
                        richColors: true,
                    });
                    setPreview(null);
                    onOpenChange(false);
                },
                onError: () => toast.error("Update failed", { id: "update" }),
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="[&>button]:hidden">
                <DialogHeader>
                    <DialogTitle>Change Avatar</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    <FileUpload
                        files={data.photo ? [data.photo] : []}
                        onFilesChange={(files) =>
                            files.length && handleFileChange(files[0])
                        }
                        presets={["image"]}
                        maxFiles={1}
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-32 h-32 mx-auto rounded-full"
                        />
                    )}
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full"
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function UpdateProfilePhoto() {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);

    return (
        <div className="relative flex flex-col items-center justify-between w-full gap-4 py-4 md:flex-row">
            <UploadDialog open={open} onOpenChange={setOpen} />

            <UserAvatar
                size="lg"
                icon={<Edit3Icon className="w-full h-full p-1" />}
                showInformation={true}
            />

            {isMobile ? (
                <div className="absolute right-0 top-4">
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <EllipsisVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setOpen(true)}
                                >
                                    Change Avatar
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button variant="ghost" size="sm">
                                    Delete Avatar
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ) : (
                <div className="flex items-end self-end gap-2">
                    <Button variant="outline" onClick={() => setOpen(true)}>
                        Change Avatar
                        <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary">Delete Avatar</Button>
                </div>
            )}
        </div>
    );
}

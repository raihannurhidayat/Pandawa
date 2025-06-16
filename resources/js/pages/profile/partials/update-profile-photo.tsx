import React, { useState, FormEventHandler, useEffect } from "react";
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
import { router, useForm, usePage } from "@inertiajs/react";
import { Edit, Edit3Icon, EllipsisVertical } from "lucide-react";
import { toast } from "sonner";
import { PageProps, User } from "@/types";

interface UploadDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function UploadDialog({ open, onOpenChange }: UploadDialogProps) {
    const user = usePage<PageProps<{ user: User }>>().props.auth.user;

    const { data, setData, patch, processing, errors } = useForm<{
        photo: File | null;
    }>({ photo: null });
    const [preview, setPreview] = useState<string | null>(
        user.profile_photo_url ?? null
    );

    // if the dialog re-opens and no new file is chosen, reset preview back to live profile URL
    useEffect(() => {
        if (open && !data.photo) {
            setPreview(user.profile_photo_url || null);
        }
    }, [open, user.profile_photo_url, data.photo]);

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
                    // clear the FileUpload and close
                    setData("photo", null);
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
                    {!data.photo ? (
                        <FileUpload
                            files={data.photo ? [data.photo] : []}
                            onFilesChange={(files) =>
                                files.length && handleFileChange(files[0])
                            }
                            presets={["image"]}
                            maxFiles={1}
                        />
                    ) : (
                        <div className="flex justify-center">
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-32 h-32 mx-auto rounded-full"
                                />
                            )}
                        </div>
                    )}
                    <DialogFooter className="flex justify-end max-md:gap-2">
                        <Button
                            variant="outline"
                            disabled={processing || !data.photo}
                            onClick={() => data.photo && setData("photo", null)}
                        >
                            Remove
                        </Button>
                        <Button type="submit" disabled={processing}>
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

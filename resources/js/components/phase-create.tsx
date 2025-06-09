import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AttachmentsInput } from "@/components/attachments-input";
import { useState } from "react";
import { Phase, PhaseStatusLabels, PhaseStatus } from "@/types/issue";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { UpdatePhaseFormSchema, updatePhaseFromSchema } from "@/forms/phase";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

function PhaseCreate({
    children,
    phase,
}: {
    children: React.ReactNode;
    phase: Phase;
}) {
    const form = useForm<UpdatePhaseFormSchema>({
        resolver: zodResolver(updatePhaseFromSchema),
        mode: "onChange",
        defaultValues: {
            reason: "",
            status: phase.status as PhaseStatus,
        },
    });

    const [attachments, setAttachments] = useState<File[]>([]);

    console.log(form.getValues("status"));
    console.log(phase.status as PhaseStatus);

    function onSubmit(values: any) {
        const data = {
            ...values,
            attachments,
        };

        console.log(values);

        console.log(data);

        router.put(route("phase.update", phase.id), data, {
            onSuccess: () => {
                toast.success("Update successful", {
                    id: "Update",
                    richColors: true,
                });
            },
            onError: () => {
                toast.error("Update failed", { id: "Update" });
            },
            onStart: () => {
                toast.loading("Updating in...", { id: "Update" });
            },
        });
    }

    return (
        <Dialog>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <DialogTrigger asChild>{children}</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Create Phase {phase.status}
                            </DialogTitle>
                            <DialogDescription>{phase.title}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center justify-between w-full mb-2">
                                                    <Label htmlFor="reason">
                                                        Set Reason
                                                    </Label>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                size={"sm"}
                                                                className="px-3 py-1 rounded-full"
                                                            >
                                                                {form.getValues(
                                                                    "status"
                                                                )}
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuRadioGroup
                                                                onValueChange={(
                                                                    value
                                                                ) => {
                                                                    field.onChange(
                                                                        value
                                                                    );
                                                                }}
                                                            >
                                                                {Object.values(
                                                                    PhaseStatus
                                                                ).map(
                                                                    (
                                                                        status
                                                                    ) => (
                                                                        <DropdownMenuRadioItem
                                                                            value={
                                                                                status
                                                                            }
                                                                            key={
                                                                                status
                                                                            }
                                                                        >
                                                                            {
                                                                                PhaseStatusLabels[
                                                                                    status
                                                                                ]
                                                                            }
                                                                        </DropdownMenuRadioItem>
                                                                    )
                                                                )}
                                                            </DropdownMenuRadioGroup>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="reason"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel />
                                            <FormControl>
                                                <Textarea
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription></FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <AttachmentsInput
                                attachments={attachments}
                                setAttachments={setAttachments}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant={"outline"}>Cancel</Button>
                            </DialogClose>
                            <Button
                                variant={"default"}
                                type="submit"
                                onClick={form.handleSubmit(onSubmit)}
                            >
                                Save Update
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    );
}

export default PhaseCreate;

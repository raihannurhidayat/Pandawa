import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Phase, PhaseStatus, PhaseStatusLabels } from "@/types/issue";
import { UpdatePhaseFormSchema, updatePhaseFromSchema } from "@/forms/phase";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { AttachmentsInput } from "@/components/attachments-input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function UpdatePhase({
    phase,
    setIsOpen,
}: {
    phase: Phase;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const form = useForm<UpdatePhaseFormSchema>({
        resolver: zodResolver(updatePhaseFromSchema),
        mode: "onChange",
        defaultValues: {
            reason: phase.reason ?? "",
            status: phase.status as PhaseStatus,
        },
    });

    useEffect(() => {
        form.reset({
            reason: phase.reason ?? "",
            status: phase.status as PhaseStatus,
        });
    }, [phase, form]);

    const [attachments, setAttachments] = useState<File[]>([]);

    function onSubmit(values: any) {
        const data = {
            ...values,
            attachments,
            _method: "put",
        };

        router.post(route("phase.update", phase.id), data, {
            onStart: () => toast.loading("Updating...", { id: "update" }),
            onSuccess: () => {
                toast.success("Update successful", {
                    id: "update",
                    richColors: true,
                });
                form.reset();
                setAttachments([]);
                setIsOpen(false);
                router.reload();
            },
            onError: () => toast.error("Update failed", { id: "update" }),
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center justify-between w-full mb-2">
                                            <Label htmlFor="status">
                                                Set Reason
                                            </Label>
                                            <Select
                                                value={form.getValues("status")}
                                                onValueChange={(value) =>
                                                    field.onChange(value)
                                                }
                                            >
                                                <SelectTrigger className="w-fit">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.entries(
                                                        PhaseStatusLabels
                                                    ).map(([value, label]) => (
                                                        <SelectItem
                                                            value={value}
                                                            key={value}
                                                        >
                                                            {label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
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
                                    <FormControl>
                                        <Textarea
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription />
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
                <Button variant="default" type="submit" className="w-full mt-4">
                    Save Update
                </Button>
            </form>
        </Form>
    );
}

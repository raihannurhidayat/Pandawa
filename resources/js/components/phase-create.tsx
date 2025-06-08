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

function PhaseCreate({
    children,
    phase,
}: {
    children: React.ReactNode;
    phase: Phase;
}) {
    const [attachments, setAttachments] = useState<File[]>([]);

    const [status, setStatus] = useState<PhaseStatus>(phase.status);

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Phase</DialogTitle>
                        <DialogDescription>
                            Add updates to this phase
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between w-full mb-2">
                                <Label htmlFor="reason">Set Reason</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            size={"sm"}
                                            className="px-3 py-1 rounded-full"
                                        >
                                            {PhaseStatusLabels[status]}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuRadioGroup
                                            value={status}
                                            onValueChange={(value) => {
                                                setStatus(value as PhaseStatus);
                                            }}
                                        >
                                            {Object.values(PhaseStatus).map(
                                                (status) => (
                                                    <DropdownMenuRadioItem
                                                        value={status}
                                                        key={status}
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
                            <Textarea id="reason" className="resize-none" />
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
                        <Button variant={"default"}>Save Update</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default PhaseCreate;

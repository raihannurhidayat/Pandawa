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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AttachmentsInput } from "@/components/attachments-input";
import { useState } from "react";

function PhaseCreate({ children }: { children: React.ReactNode }) {
    const [attachments, setAttachments] = useState<File[]>([]);

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
                            <Label htmlFor="reason">Set Reason</Label>
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

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
import { Button } from "./ui/button";

function PhaseCreate({ children }: { children: React.ReactNode }) {
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
                    <div>
                        <Label htmlFor="title">Set Title</Label>
                        <Input id="title" type="text" />
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

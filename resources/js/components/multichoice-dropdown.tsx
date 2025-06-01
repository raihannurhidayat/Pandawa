import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { X, ChevronDown } from "lucide-react";

interface MultichoiceDropdownProps {
    items: { id: string; name: string }[];
    label?: string;
    placeholder?: string;
    icon?: React.ReactNode;
}

const MultichoiceDropdown: React.FC<MultichoiceDropdownProps> = ({
    items,
    label = "Select Items",
    placeholder = "Choose Items",
    icon = <ChevronDown className="w-4 h-4 ml-2" />,
}) => {
    const [open, setOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleClear = () => setSelectedItems([]);
    const handleRemove = (item: string) =>
        setSelectedItems(selectedItems.filter((i) => i !== item));

    return (
        <div className="w-full max-w-sm p-4 border shadow-sm rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-base font-medium">{label}</span>
                <button
                    className="text-sm text-muted-foreground hover:underline"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </div>

            {/* Content */}
            <div className="mb-2">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="justify-between w-full"
                        >
                            {placeholder} {icon}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                        <div className="grid gap-2">
                            {items.map(({ id, name }) => (
                                <Button
                                    key={id}
                                    variant="ghost"
                                    className="justify-start"
                                    onClick={() => {
                                        if (!selectedItems.includes(id)) {
                                            setSelectedItems([
                                                ...selectedItems,
                                                id,
                                            ]);
                                        }
                                    }}
                                >
                                    {name}
                                </Button>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap gap-1 text-sm text-muted-foreground">
                {selectedItems.map((item) => {
                    const selected = items.find((i) => i.id === item);
                    if (!selected) return null;
                    return (
                        <div
                            key={item}
                            className="flex items-center px-2 py-1 rounded-full bg-muted"
                        >
                            <span className="mr-1">{selected.name}</span>
                            <button
                                className="hover:text-destructive"
                                onClick={() => handleRemove(item)}
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MultichoiceDropdown;

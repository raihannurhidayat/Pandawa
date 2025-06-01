import React from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { X, ChevronDown } from "lucide-react";

interface MultichoiceDropdownProps {
    items: { id: string; name: string }[];
    selectedItems: string[];
    onChange: (items: string[]) => void;
    label?: string;
    placeholder?: string;
    icon?: React.ReactNode;
}

const MultichoiceDropdown: React.FC<MultichoiceDropdownProps> = ({
    items,
    selectedItems,
    onChange,
    label = "Select Items",
    placeholder = "Choose Items",
    icon = <ChevronDown className="w-4 h-4 ml-2" />,
}) => {
    const [open, setOpen] = React.useState(false);

    const handleClear = () => onChange([]);
    const handleRemove = (item: string) =>
        onChange(selectedItems.filter((i) => i !== item));
    const handleSelect = (item: string) => {
        if (!selectedItems.includes(item)) {
            onChange([...selectedItems, item]);
        }
    };

    return (
        <div className="w-full max-w-sm rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-neutral-400">{label}</span>
                <button
                    className="text-sm text-neutral-400 hover:underline"
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
                                    onClick={() => handleSelect(id)}
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
                            className="flex items-center px-3 py-1 rounded select-none bg-muted hover:bg-muted/80"
                            onClick={() => handleRemove(item)}
                        >
                            <span className="mr-1">{selected.name}</span>
                            <X className="w-3 h-3" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MultichoiceDropdown;

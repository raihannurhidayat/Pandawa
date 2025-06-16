import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",
            },
            type: {
                pill: "rounded-full",
                normal: "rounded-md",
            },
            size: {
                sm: "px-2 py-0.5 text-xs",
                md: "px-3 py-0.5 text-sm",
                lg: "px-4 py-1 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            type: "pill",
            size: "md",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {
    type?: "pill" | "normal";
}

function Badge({
    className,
    type = "pill",
    variant,
    size = "sm",
    ...props
}: BadgeProps) {
    return (
        <div
            className={cn(badgeVariants({ variant, type, size }), className)}
            {...props}
        />
    );
}

export { Badge, badgeVariants };

import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, iconLeft, iconRight, type, ...props }, ref) => {
        const paddingLeft = iconLeft ? "pl-10" : "pl-3";
        const paddingRight = iconRight ? "pr-10" : "pr-3";

        return (
            <div className="relative flex items-center">
                {iconLeft && (
                    <div className="absolute flex items-center justify-center w-4 h-4 left-2">
                        {iconLeft}
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        paddingLeft,
                        paddingRight,
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {iconRight && (
                    <div className="absolute flex items-center justify-center w-4 h-4 right-2">
                        {iconRight}
                    </div>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };

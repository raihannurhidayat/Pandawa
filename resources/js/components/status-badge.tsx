import { CaseStatus, CaseStatusLabels, PhaseStatus } from "@/types/issue";
import { Badge, BadgeProps } from "./ui/badge";
import { cn } from "@/lib/utils";

interface CaseStatusBadgeProps {
    status: CaseStatus | PhaseStatus;
    size?: BadgeProps["size"];
    className?: string;
}

// Map each status to either a built-in variant or custom classes
const statusStyles: Record<
    CaseStatus,
    { variant?: BadgeProps["variant"]; style?: string }
> = {
    [CaseStatus.Open]: { variant: "secondary" },
    [CaseStatus.Pending]: {
        style: "bg-yellow-200 text-yellow-700 hover:bg-yellow-200/80 dark:bg-yellow-600 dark:text-yellow-50 dark:hover:bg-yellow-600/80",
    },
    [CaseStatus.InProgress]: {
        style: "bg-cyan-500 text-white dark:bg-cyan-600 dark:hover:bg-cyan-600/80 hover:bg-cyan-500/80",
    },
    [CaseStatus.Resolved]: {
        style: "bg-primary text-primary-foreground",
    },
    [CaseStatus.Closed]: { variant: "destructive" },
};

function StatusBadge({ status, size = "md", className }: CaseStatusBadgeProps) {
    const { variant, style } = statusStyles[status] || {};
    return (
        <Badge
            variant={variant}
            size={size}
            className={cn(
                style,
                "capitalize select-none text-nowrap",
                className
            )}
        >
            {CaseStatusLabels[status]}
        </Badge>
    );
}

export default StatusBadge;

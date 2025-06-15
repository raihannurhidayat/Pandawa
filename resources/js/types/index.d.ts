import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

export type Role = "admin" | "user";


export interface Timestamp {
    created_at: string,
    updated_at: string,
}

export interface TimestampDetail extends Timestamp {
    created_at_relative: string,
    updated_at_relative: string,
    created_at_formatted: string,
    updated_at_formatted: string,
}


export interface User extends Timestamp {
    id: number;
    name: string;
    email: string;
    profile_photo_url: string;
    email_verified_at: string;
    role: Role;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

export type MenuItemProp = {
    title: string;
    href: string;
    icon?:
        | ForwardRefExoticComponent<
              Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
          >
        | ReactNode;
    variant:
        | "link"
        | "default"
        | "ghost"
        | "destructive"
        | "outline"
        | "secondary"
        | null
        | undefined;
};

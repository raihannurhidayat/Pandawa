import { z } from "zod";

export const loginFormSchema = z.object({
    name: z
        .string()
        .min(3, "Minimum 3 characters required")
        .max(30, "Maximum 30 characters required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Minimum 8 characters required"),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export const registerFormSchema = loginFormSchema
    .extend({
        confirmPassword: z.string().min(8, "Minimum 8 characters required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;

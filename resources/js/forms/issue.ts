import { z } from "zod";

export const createIssueFormSchema = z.object({
    issue_category_id: z.string().min(1, { message: "Issue category is required" }),
    title: z.string().min(1, { message: "Title is required" }),
    body: z.string().min(1, { message: "Body is required" }),
    location: z.object({
        provinsi: z.string().min(1, { message: "Province is required" }),
        kota: z.string().min(1, { message: "City is required" }),
        kelurahan: z.string().min(1, { message: "District is required" }),
        kecamatan: z.string().min(1, { message: "Village is required" }),
    })  ,
});

export type CreateIssueFormSchema = z.infer<typeof createIssueFormSchema>;

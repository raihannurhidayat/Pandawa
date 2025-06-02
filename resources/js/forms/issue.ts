import { z } from "zod";

export const createIssueFormSchema = z.object({
    issue_category_id: z
        .string()
        .min(1, { message: "Kategori pengaduan harus dipilih" }),
    title: z
        .string()
        .min(1, { message: "Judul pengaduan harus diisi" })
        .max(30, { message: "Judul pengaduan maksimal 30 karakter" }),
    body: z.string().min(1, { message: "Deskripsi pengaduan harus diisi" }),
    location: z.object({
        provinsi: z.string().min(1, { message: "Provinsi harus dipilih" }),
        kota: z.string().min(1, { message: "Kota harus dipilih" }),
        kelurahan: z.string().min(1, { message: "Kelurahan harus dipilih" }),
        kecamatan: z.string().min(1, { message: "Kecamatan harus dipilih" }),
    }),
});

export type CreateIssueFormSchema = z.infer<typeof createIssueFormSchema>;

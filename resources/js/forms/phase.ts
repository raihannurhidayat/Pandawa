import { PhaseStatus } from "@/types/issue";
import { z } from "zod";

export const createPhaseFormSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Judul harus diisi" })
        .max(30, { message: "Judul maksimal 30 karakter" }),
    body: z.string().min(1, { message: "Deskripsi harus diisi" }),
    reason: z.string().nullable(),
    order: z.number().default(0),
    is_active: z.boolean().default(false),
    status: z.nativeEnum(PhaseStatus).default(PhaseStatus.Pending),
});

export const updatePhaseFromSchema = z.object({
    reason: z.string().min(1, { message: "Alasan harus diisi" }),
    status: z.enum(["pending", "in_progress", "resolved", "closed"]),
    // status: z.nativeEnum(PhaseStatus),
})

export type CreatePhaseFormSchema = z.infer<typeof createPhaseFormSchema>;
export type UpdatePhaseFormSchema = z.infer<typeof updatePhaseFromSchema>;

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

export type CreatePhaseFormSchema = z.infer<typeof createPhaseFormSchema>;

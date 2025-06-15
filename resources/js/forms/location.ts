import { z } from "zod";

export const locationFormSchema = z.object({
    location: z.object({
        provinsi: z.string().optional(),
        kota: z.string().optional(),
        kelurahan: z.string().optional(),
        kecamatan: z.string().optional(),
    }),
});

export type LocationFormSchema = z.infer<typeof locationFormSchema>;

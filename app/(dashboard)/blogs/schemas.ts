import { z } from "zod";

export const categorySchema = z.object({
    title: z.string().min(2,'Required').max(70),
  })
import { z } from "zod";

export const carTypeSchema = z.object({
    title: z.string().min(2,'Required').max(70),
  })
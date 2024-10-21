import { z } from "zod";

export const SoinSchema = z.object({
  user: z.string(),
  name: z.string(),
  hotel: z.string(),
  reception: z.string(),
  price: z.number(),
  paidBy: z.string(),
  taxi: z.boolean().default(false),
  salam: z.number().default(0),
  istanbul: z.number().default(0),
  orient: z.number().default(0),
});
export const DashSoinSchema = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  user: z.string(),
  name: z.string(),
  hotel: z.string(),
  reception: z.string(),
  price: z.number(),
  paidBy: z.string(),
  taxi: z.boolean().default(false),
  salam: z.number().default(0),
  istanbul: z.number().default(0),
  orient: z.number().default(0),
});

export type SoinShecmaType = z.infer<typeof SoinSchema>;
export type DashSoinShecmaType = z.infer<typeof DashSoinSchema>;

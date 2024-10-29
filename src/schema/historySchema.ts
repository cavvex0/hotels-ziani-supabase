import { z } from "zod";

export const historySchema = z.object({
  id: z.number(),
  hotel: z.string(),
  reception: z.string(),
  people: z.number(),
  created_at: z.date(),
});


export type HistoryType = z.infer<typeof historySchema>;
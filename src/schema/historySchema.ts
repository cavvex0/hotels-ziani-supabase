import { z } from "zod";

export const historySchema = z.object({
  id: z.number(),
  hotel: z.string(),
  reception: z.string(),
});


export type HistoryType = z.infer<typeof historySchema>;
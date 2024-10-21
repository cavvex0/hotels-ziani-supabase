import { z } from "zod";

export const HotelSchema = z.object({
  name: z.string(),
  reception: z.string(),
});

export type HotelSchemaType = z.infer<typeof HotelSchema>;

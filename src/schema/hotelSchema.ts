import { z } from "zod";

export const HotelSchema = z.object({
  name: z.string(),
  receptions: z.string(),
});
export const ReceptionSchema = z.object({
  name: z.string(),
  receptions: z.array(z.string())
});

export type HotelSchemaType = z.infer<typeof HotelSchema>;
export type ReceptionSchemaType = z.infer<typeof ReceptionSchema>;

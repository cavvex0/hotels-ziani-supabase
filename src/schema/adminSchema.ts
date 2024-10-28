import { z } from "zod";

export const AdminSchema = z.object({
  name: z.string(),
  password: z.string(),
  role: z.string(),
});


export type AdminSchemaType = z.infer<typeof AdminSchema>
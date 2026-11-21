import { z } from "zod";

export const createContactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().min(7).max(20),
  category_id: z.number().int().positive(),
});

export type CreateContactBody = z.infer<typeof createContactSchema>;

export const updateContactSchema = createContactSchema.partial().refine(
  (data) => {
    return Object.keys(data).length > 0;
  },
  {
    error: "At least one field must be provided",
  },
);

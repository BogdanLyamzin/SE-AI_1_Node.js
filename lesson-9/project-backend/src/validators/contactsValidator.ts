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

export const getContactsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  sort: z.enum(["newest", "oldest"]).default("newest"),
  search: z.string().trim().optional()
});

export type GetContactsQuery = z.infer<typeof getContactsQuerySchema>;
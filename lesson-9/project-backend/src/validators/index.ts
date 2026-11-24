import {z} from "zod";

export const IdSchema = z.object({
    id: z.coerce.number().int().positive()
})

export type IdLocals = {
    id: z.infer<typeof IdSchema>["id"]
}
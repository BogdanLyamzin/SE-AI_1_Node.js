import {z} from "zod";

export const registerSchema = z.object({
    username: z.string().min(3).max(30),
    email: z.email(),
    name: z.string().min(2).max(50),
    password: z.string().min(6),
});

export type RegisterBody = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
});

export type LoginBody = z.infer<typeof loginSchema>;

export const refreshSchema = z.object({
    refreshToken: z.string().min(1)
})

export type RefreshBody = z.infer<typeof refreshSchema>;
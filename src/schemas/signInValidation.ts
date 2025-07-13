import { z } from 'zod'

export const signInValidation = z.object({
    identifier: z.string().min(2, "Username must be at least 2 characters long"),
    password: z.string().min(6),
})
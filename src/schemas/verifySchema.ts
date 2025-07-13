import { z } from 'zod'

export const verifySchema = z.object({
    code: z.string().min(6, {message: "minimum 6 digits required in the code"})
})
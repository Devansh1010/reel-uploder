import { z } from 'zod'

export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast 2 characters long")
    .max(20, "Username can't be longer than 20 characters")
    .regex(/^[a-zA-Z0-9_]{3,20}$/, "Username can't contain special characters")

export const signUpValidation = z.object({
    username: usernameValidation,
    email: z.string()
        .email({ message: "Please Enter valid Email" }),
    password: z.string()
        .min(6, "Password must be minimum 6 character long"),

})
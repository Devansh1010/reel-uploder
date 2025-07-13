import { z } from 'zod'

export const userValidation = z
    .string()
    .min(2, {message: "Minimum 2 character required in Username"})
    .max(20, {message: "Max 20 charcter allowed in the Username"})
    .regex(/^[a-zA-Z0-9_]+$/,{message: "Special charcters are not allowed"})

export const emailValidation = z
    .string()
    .email({message: "Enter valid Email Address"})

export const passwordValidation = z
    .string()
    .min(6, {message: "Password must contain atleast 6 charcters"})

export const signUpSchema = z.object({
    username: userValidation,
    email: emailValidation,
    password: passwordValidation
})
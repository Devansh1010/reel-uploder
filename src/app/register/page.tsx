"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signUpValidation } from '@/schemas/signUpValidation';
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import  { Loader2Icon } from "lucide-react"
import Link from 'next/link';
import { useDebounceCallback } from 'usehooks-ts'

const RegisterPage: React.FC = () => {
    const [username, setUsername] = React.useState('');
    const [isUsernameChecking, setIsUsernameChecking] = React.useState(false);
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isSubmiting, setIsSubmiting] = React.useState(false);
    const debounced = useDebounceCallback(setUsername, 500)

    const router = useRouter();

    useEffect(() => {
        const checkIsUsernameAvailable = async () => {
            if (username) {
                setIsUsernameChecking(true)
                setUsernameMessage('')

                try {
                    const responce = await axios.get(`/api/check-username-unique?username=${username}`)

                    setUsernameMessage(responce.data?.message)

                } catch (error) {

                    setUsernameMessage("Username not available")

                } finally {
                    setIsUsernameChecking(false)
                    // setUsernameMessage('')
                }
            }
        }

        checkIsUsernameAvailable()
    }, [username])

    const onSubmit = async (data: z.infer<typeof signUpValidation>) => {
        setIsSubmiting(true);
        try {
            const res = await axios.post("/api/sign-up", data);

            //TODO: check if res has success message or not then show toast
            toast.success("Success", {
                description: res.data.message
            })

        } catch (error: any) {
            let axiosError = error as AxiosError
            console.error("catch sign-up.tsx: Registration error:", error);
            toast.error("Failed", {
                description: error || "Error signing-up"
            })
        } finally {
            setIsSubmiting(false)
        }
    }

    const form = useForm<z.infer<typeof signUpValidation>>({
        resolver: zodResolver(signUpValidation),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        }
    })
    return (

        <main className="min-h-screen bg-gray-50 flex flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create your account</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Already a member?{" "}
                    <Link href="/sign-in" className="font-medium text-indigo-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 shadow rounded-2xl border border-gray-100">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your username"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                debounced(e.target.value);
                                            }}
                                        />

                                    </FormControl>

                                    <p
                                        className={`text-sm mt-1 ${usernameMessage === 'Username Available' ? 'text-green-600' : 'text-red-600'
                                            }`}
                                    >
                                        {isUsernameChecking ? (
                                            <span className="flex items-center gap-2">
                                                <Loader2Icon className="h-4 w-4 animate-spin" />
                                                Checking...
                                            </span>
                                        ) : (
                                            `${usernameMessage}`
                                        )}

                                    </p>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email address</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Create a strong password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmiting}
                        >
                            {isSubmiting ? (
                                <>
                                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </main >
    );
};

export default RegisterPage;
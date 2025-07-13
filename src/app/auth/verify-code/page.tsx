"use client"

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from "lucide-react";
import axios from "axios";


export const verifyCodeSchema = z.object({
  username: z.string().min(1, "Username is required"),
  verifyCode: z.string().min(4, "Verification code is required"),
});


const VerifyCodePage: React.FC = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof verifyCodeSchema>>({
        resolver: zodResolver(verifyCodeSchema),
        defaultValues: {
            username: '',
            verifyCode: '',
        }
    });

    const onSubmit = async (data: z.infer<typeof verifyCodeSchema>) => {
        setIsSubmitting(true);

        try {
            console.log("Submitting verification", data);
            await axios.post(`/api/verify-code`, data)

            toast.success("Code verified successfully!");
            router.push("/dashboard");
        } catch (error) {
            toast.error("Invalid verification code.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col justify-center px-6 py-12 lg:px-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Verify Your Code
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Enter the code sent to your registered email
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
                                        <Input placeholder="Enter your username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="verifyCode"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter verification code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                "Verify Code"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </main>
    );
};

export default VerifyCodePage;
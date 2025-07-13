import { resend } from '@/lib/resend'
import verificationEmail from '../../emails/verificationEmails'
import { ApiResponse } from '@/types/ApiResponse'

export async function sendVerification(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Code || mystrymessages',
            react: verificationEmail({ username, otp: verifyCode }),
        });


        return {
            success: true,
            message: "Email sent successfully"
        }
    } catch (emailError) {
        console.log("Error sending Email", emailError)
        return {
            success: false,
            message: "Error Sending Email"
        }
    }
}
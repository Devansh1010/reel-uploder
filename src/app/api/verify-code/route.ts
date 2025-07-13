
import UserModel from "@/models/User.model";
import { z } from "zod"
import { verifySchema } from "@/schemas/verifySchema"
import { dbConnect } from "@/lib/dbConnect";

const verifyQuerySchema = z.object({
    code: verifySchema
})

export async function POST(request: Request) {
    await dbConnect()

    try {
        const { username, verifyCode } = await request.json()

        const decodedUsername = decodeURIComponent(username);

        const user = await UserModel.findOne({ username: decodedUsername })

        if (!user) {
            return Response.json({
                success: false,
                message: "Username is not found"
            }, { status: 500 })
        }

        const isCodeValid = user.verificationToken === verifyCode;
        const isExpriyValid = new Date(user.verificationTokenExpiry) > new Date();

        if(!isCodeValid){
            return Response.json({
                success: false,
                message: "Code is not Valid"
            }, { status: 500 })
        }

        if(!isExpriyValid){
            return Response.json({
                success: false,
                message: "Code is Expired please request for new Code"
            }, { status: 500 })
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        
        await user.save()
        return Response.json({
                success: true,
                message: "User Verified Successfully"
            }, { status: 200 })




    } catch (error) {
        console.error("Error Checking verify Code", error)
        return Response.json({
            success: false,
            message: "Error Checking verify Code"
        }, { status: 500 })
    }
}
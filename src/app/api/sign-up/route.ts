import bcrypt from 'bcryptjs'
import { sendVerification } from "@/helpers/sendVerificationEmail";
import { dbConnect } from '@/lib/dbConnect';
import UserModel from '@/models/User.model';

export async function POST(request: Request) {
    await dbConnect()
    try {

        const { username, email, password } = await request.json()

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })


        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, { status: 400 })
        }

        const existingUserByEmail = await UserModel.findOne({ email })

        const verifyCode = Math.floor(10000 + Math.random() * 90000).toString()


        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User is already exist with this email"
                }, { status: 400 });

            } else {
                const hashedPassword = await bcrypt.hash(password, 10)

                existingUserByEmail.username = username
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpires = new Date(Date.now() + 3600000);


                await existingUserByEmail.save()
            }

        } else {

            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = UserModel.create({
                username,
                email,
                password: hashedPassword,
                verificationToken: verifyCode,
                verificationTokenExpiry: expiryDate,
                isVerified: false,
            })

            console.log(newUser)
        }

        const emailResponce = await sendVerification(email, username, verifyCode)

        if (!emailResponce.success) {
            return Response.json({
                success: false,
                message: emailResponce.message
            }, { status: 500 })
        }

        return Response.json({
            success: true,
            message: "Verify Code sent! Please Verify"
        }, { status: 200 })

    } catch (error) {
        console.log("Error registering user", error)
        return Response.json({
            success: false,
            message: "Error while registering user"
        },
            {
                status: 500
            }
        )
    }
}



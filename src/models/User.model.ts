
import mongoose, { Types, Document, Schema } from "mongoose";

export interface User extends Document {
    username: string,
    email: string,
    password: string,
    isVerified: boolean,
    verificationToken: string,
    verificationTokenExpiry: Date,
    resetToken: string,
    resetTokenExpiry: Date
}

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is Required"],
        trim: true,
        unique: [true, "Username must be Unique"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: [true, "Email must be Unique"]
    },
    password: {
        type: String,
        required: [true, "Email is Required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiry: {
        type: Date
    },
    resetToken: {
        type: String,
    },
    resetTokenExpiry: Date
}, {timestamps: true})

const UserModel = (mongoose.models?.User<User>) || (mongoose.model<User>("User", userSchema))

export default UserModel

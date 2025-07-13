import "next-auth"
import { DefaultSession } from 'next-auth'

declare module "next-auth" {
    interface User {
        _id?: string,
        username: sting
        email: string,
        isVerified: boolean
    }

    interface session {
        user: {
            _id?: string,
            username?: sting
            email?: string,
            isVerified?: boolean
        } &  DefaultSession["user"]
    }

    interface jwt {
        _id?: string,
        username?: sting
        email?: string,
        isVerified?: boolean
    }
}
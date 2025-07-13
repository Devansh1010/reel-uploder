
import { SessionProvider } from "next-auth/react"
import { ImageKitProvider } from "@imagekit/next"

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!
export default function Providers(
    { children }: { children: React.ReactNode }
) {
    return (
        <body>
            <SessionProvider refetchInterval={5 * 60}>
                <ImageKitProvider urlEndpoint={urlEndPoint}>
                    {children}
                </ImageKitProvider>
            </SessionProvider>
        </body>
    )
}
"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { Loader2 } from "lucide-react";
import { useState } from "react";


interface FileTypeProps {
    onSuccess: (res: any) => void
    onProgress?: (progress: any) => void
    fileType?: "video" | "image"
}

const FileUpload = (
    {
        onSuccess,
        onProgress,
        fileType
    }: FileTypeProps
) => {

    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // ? Optional Validation
    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith('video/')) {
                setError("Please upload a valid video file")
            }
        }
        if (file.size > 100 * 1024 * 1024) {
            setError("File must be less than 100MB")
        }
        return true
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file || !validateFile(file)) return

        setUploading(true)
        setError(null)
        try {

            const authRes = await fetch('/api/auth/imagekit-auth')
            const auth = await authRes.json()

            const uploadResponse = await upload({
                file,
                fileName: file.name, // Optionally set a custom file name 
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                expire: auth.expire,
                token: auth.token,
                signature: auth.signature,

                // Progress callback to update upload progress state
                onProgress: (event) => {

                    if (event.lengthComputable && onProgress) {
                        const persent = (event.loaded / event.total) * 100

                        onProgress(Math.round(persent))
                    }
                },
            });

            onSuccess(uploadResponse)

        } catch (error) {
            console.error("Faild to upload", error )
            setError(error as string)

        } finally {
            setUploading(false)
        }
    }

    return (
        <>
            {/* File input element using React ref */}
            <input
                type="file"
                accept={fileType === "video" ? "video/*" : 'image/*'}
                onChange={handleFileUpload} />

            {uploading && (
                <Loader2 className="h-4 w-4 rounded-full animate-spin" />
            )}

        </>
    );
};

export default FileUpload;
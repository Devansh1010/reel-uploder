import VideoModel, { Video } from "@/models/Video.model";
import { dbConnect } from "../../../lib/dbConnect";
import { auth } from "@/auth";

export async function GET() {
    try {
        await dbConnect();

        const videos = await VideoModel.find({}).sort({ createdAt: -1 }).lean()

        if (!videos || videos.length === 0) {
            return Response.json({
                message: "No videos found",
                videos: []
            }, { status: 200 })
        }

        return Response.json({
            message: " videos found",
            videos
        }, { status: 200 })
    } catch (error) {
        return Response.json({
            message: "Failed to fetch videos found",

        }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session) {
            return Response.json({
                message: "Unauthorized"
            }, { status: 401 })
        }
        const user = session.user;

        await dbConnect()

        const body: Video = await req.json()

        if (
            !body.title ||
            !body.description ||
            !body.videoUrl ||
            !body.thumbnailUrl
        ) {
            return Response.json({
                message: "Fields Missing"
            }, { status: 400 })
        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100
            }
        }
        const video = await VideoModel.create(videoData)
        if (!video) {
            return Response.json({
                message: "Video not created"
            }, { status: 403 })
        }

        return Response.json({
            message: "Video created",
            video
        }, { status: 200 })
    } catch (error) {
        return Response.json({
            message: "Failed to create video"
        }, { status: 500 })
    }
}
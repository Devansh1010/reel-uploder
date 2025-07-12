import mongoose, { Types, Document, Schema } from "mongoose";

export const VIDEO_DIMNTIONS = {
    widht: 1080,
    height: 1920
} as const

export interface Video extends Document {
    title: string,
    description: string,
    videoUrl: string,
    thumbnailUrl: string,
    controls?: boolean,
    transformation?: {
        height: number,
        width: number,
        quality?: number
    },
}

const videoSchema: Schema<Video> = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    controls: {
        type: Boolean,
        default: true
    },
    transformation: {
        height: {
            type: Number,
            default: VIDEO_DIMNTIONS
        },
        width: {
            type: Number,
            default: VIDEO_DIMNTIONS
        },
        quality: {
            type: Number,
            min: 1,
            max: 100
        }
    }
 
}) 

const VideoModel = (mongoose.models?.Video<Video>) || (mongoose.model<Video>("Video", videoSchema))

export default videoSchema
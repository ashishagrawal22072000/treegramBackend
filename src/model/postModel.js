import mongoose, { Schema } from "mongoose";
const PostSchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        content: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: false,
        },
        media: {
            type: Array,
        },
        commment_status: {
            type: Boolean,
            default: false
        },
        like_status: {
            type: Boolean,
            default: false
        },
        post_status: {
            type: String
        }
    },
    {
        collection: "PostModel",
        versionKey: false,
    }
);

export default mongoose.model("PostModel", PostSchema);

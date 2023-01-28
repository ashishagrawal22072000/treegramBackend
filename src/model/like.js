import mongoose, { Schema } from "mongoose";
const LikeSchema = new mongoose.Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel",
        },
        post_id: {
            type: Schema.Types.ObjectId,
            ref: "PostModel",
        },
        like_count: {
            type: Number,
        },
        like_status: {
            type: Boolean,
            default: false
        }
    },
    {
        collection: "LikeModel",
        versionKey: false,
    }
);

export default mongoose.model("LikeModel", LikeSchema);

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
        username: {
            type: String
        },
        profile: {
            type: String
        }
    },
    {
        collection: "LikeModel",
        versionKey: false,
    }
);

export default mongoose.model("LikeModel", LikeSchema);

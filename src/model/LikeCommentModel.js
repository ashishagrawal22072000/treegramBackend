import mongoose, { Schema } from "mongoose";
const LikeCommentSchema = new mongoose.Schema(
    {

        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        comment_id: {
            type: Schema.Types.ObjectId,
            ref: "CommentModel",
        },
        replies: {
            type: Array
        }
    },
    {
        collection: "LikeCommentModel",
        versionKey: false,
    }
);

export default mongoose.model("LikeCommentModel", LikeCommentSchema);

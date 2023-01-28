import mongoose, { Schema } from "mongoose";
const ReplyCommentSchema = new mongoose.Schema(
    {

        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        comment_id: {
            type: Schema.Types.ObjectId,
            ref: "CommentModel",
        },
        like: {
            type: Number
        },
        like_status: {
            type: Boolean,
            default: false
        }
    },
    {
        collection: "ReplyCommentModel",
        versionKey: false,
    }
);

export default mongoose.model("ReplyCommentModel", ReplyCommentSchema);

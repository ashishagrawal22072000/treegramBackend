import mongoose, { Schema } from "mongoose";
const CommentSchema = new mongoose.Schema(
    {
        post_id: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
        comments: [
            {
                user_id: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
                comment: {
                    type: String,
                }
            }
        ]
    },
    {
        collection: "CommentModel",
        versionKey: false,
    }
);

export default mongoose.model("CommentModel", CommentSchema);

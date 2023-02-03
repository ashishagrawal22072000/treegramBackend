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
                username: {
                    type: String,
                },
                profile: {
                    type: String
                },
                comment: {
                    type: String,
                },
                like: [{
                    user_id: {
                        type: Schema.Types.ObjectId,
                        ref: "User"
                    }
                }],
                comment_reply: [
                    {
                        user_id: {
                            type: Schema.Types.ObjectId,
                            ref: "User",
                        },
                        username: {
                            type: String,
                        },
                        profile: {
                            type: String
                        },
                        comment: {
                            type: String,
                        },
                        like: [{
                            user_id: {
                                type: Schema.Types.ObjectId,
                                ref: "User"
                            }
                        }],
                    }
                ]
            }
        ]
    },
    {
        collection: "CommentModel",
        versionKey: false,
    }
);

export default mongoose.model("CommentModel", CommentSchema);

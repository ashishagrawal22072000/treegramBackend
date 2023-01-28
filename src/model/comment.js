import mongoose, { Schema } from "mongoose";
const CommentSchema = new mongoose.Schema(
    {

        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        post_id: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
        comments: {
            type: Array
        }
        // comments: [
        //     {
        //         comment: {
        //             type: String,
        //         },
        //         like: {
        //             type: Number
        //         },
        //         reply: [
        //             {
        //                 user_id: {
        //                     type: Schema.Types.ObjectId,
        //                     ref: "User",
        //                 },
        //                 comment: {
        //                     type: String,
        //                 }
        //             }
        //         ]

        //     }
        // ]
    },
    {
        collection: "CommentModel",
        versionKey: false,
    }
);

export default mongoose.model("CommentModel", CommentSchema);

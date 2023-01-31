import mongoose, { Schema } from "mongoose";
const TagSchema = new mongoose.Schema(
    {
        post_id: {
            type: Schema.Types.ObjectId,
            ref: "PostModel",
        },
        tags: [
            {
                media_url: {
                    type: String,
                },
                tagged_people: {
                    type: Array
                }
            }
        ]
    },
    {
        collection: "TagModel",
        versionKey: false,
    }
);

export default mongoose.model("TagModel", TagSchema);

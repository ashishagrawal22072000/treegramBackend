import mongoose, { Schema } from "mongoose";
const HashTagSchema = new mongoose.Schema(
    {
        name: {
            type: String
        }
    },
    {
        collection: "HashTagModel",
        versionKey: false,
    }
);

export default mongoose.model("HashTagModel", HashTagSchema);

import mongoose, { Schema } from "mongoose";
const User_SessionSchema = new mongoose.Schema(
    {
        token: {
            type: String
        },
        user_agent: {
            type: String,
        },
        device_details: {
            type: String,
        },
        ip_address: {
            type: String,
        },
        location: {
            type: String,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        collection: "User_Session",
        versionKey: false,
    }
);

export default mongoose.model("User_Session", User_SessionSchema);

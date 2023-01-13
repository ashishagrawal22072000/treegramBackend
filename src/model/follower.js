import mongoose, { Schema } from "mongoose";
const Followers = new mongoose.Schema(
  {
    follow_from: {
      type: Schema.Types.ObjectId,
      ref: "userModel",
    },
    follow_to: {
      type: Schema.Types.ObjectId,
      ref: "userModel",
    },
    status: {
      type: String,
      default: "pending",
    },
    created_At: {
      type: Date,
      default: new Date(),
    },
    updated_At: {
      type: Date,
      default: new Date(),
    },
  },
  {
    collection: "Followers",
    versionKey: false,
  }
);

export default mongoose.model("Follower", Followers);

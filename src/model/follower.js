import mongoose, { Schema } from "mongoose";
const Followers = new mongoose.Schema(
  {
    follow_from: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    follow_to: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    follow_status: {
      type: Boolean,
      default: true,
    },
    close_status: {
      type: Boolean,
      default: false,
    },
    favouriate_status: {
      type: Boolean,
      default: false,
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

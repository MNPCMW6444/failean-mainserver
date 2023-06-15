import mongoose, { Schema } from "mongoose";
import { WhiteUser } from "@failean/shared-types";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: { type: String, required: true },
    name: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      required: true,
      default: "free",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<WhiteUser>("User", UserSchema);

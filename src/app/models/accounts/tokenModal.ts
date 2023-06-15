import mongoose from "mongoose";
import { WhiteToken } from "@failean/shared-types";

const tokenModal = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    transaction: { type: Number, required: true },
    description: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<WhiteToken>("token", tokenModal);

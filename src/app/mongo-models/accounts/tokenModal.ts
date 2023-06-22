import mongoose from "mongoose";
import { WhiteModels } from "@failean/shared-types";
type WhiteToken = WhiteModels.Accounts.WhiteToken;

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

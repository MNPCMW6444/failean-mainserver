import mongoose from "mongoose";
import { WhiteRequestForAccount } from "@failean/shared-types";

const requestForAccountModal = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    idea: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<WhiteRequestForAccount>(
  "requestForAccount",
  requestForAccountModal
);

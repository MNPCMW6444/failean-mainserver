import mongoose from "mongoose";
import { WhiteRequestForPassChange } from "@failean/shared-types";

const requestForPassChangeModal = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<WhiteRequestForPassChange>(
  "requestForPassChange",
  requestForPassChangeModal
);

import mongoose from "mongoose";
import { WhiteOpenAIPromise } from "@failean/shared-types";

const openAIPromiseModal = new mongoose.Schema(
  {
    owner: { type: mongoose.Types.ObjectId, required: true },
    stringifiedOpenAIPromise: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<WhiteOpenAIPromise>(
  "openAIPromise",
  openAIPromiseModal
);

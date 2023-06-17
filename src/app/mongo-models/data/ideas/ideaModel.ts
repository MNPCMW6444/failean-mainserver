import { WhiteIdea } from "@failean/shared-types";
import mongoose from "mongoose";

const ideaModal = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    idea: {
      type: String,
      required: true,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<WhiteIdea>("idea", ideaModal);

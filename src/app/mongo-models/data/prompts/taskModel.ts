import { WhiteTask } from "@failean/shared-types";
import mongoose from "mongoose";

const taskModal = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    ideaId: { type: mongoose.Schema.Types.ObjectId, required: true },
    promptName: { type: String, required: true },
    taskId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<WhiteTask>("task", taskModal);

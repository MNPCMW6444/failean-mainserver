import mongoose from "mongoose";
import { WhiteModels } from "@failean/shared-types";
type WhitePromptResult = WhiteModels.Data.Prompts.WhitePromptResult;

const promptResultModal = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    ideaId: { type: mongoose.Schema.Types.ObjectId, required: true },
    promptName: { type: String, required: true },
    reason: {
      type: String,
      enum: ["run", "feedback", "save"],
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<WhitePromptResult>(
  "promptResult",
  promptResultModal
);

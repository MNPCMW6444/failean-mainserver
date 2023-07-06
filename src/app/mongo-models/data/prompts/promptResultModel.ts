import mongoose from "mongoose";
import { WhiteModels } from "@failean/shared-types";
import { promptResultModel } from "@failean/mongo-models";

export default mongoose.model<WhiteModels.Data.Prompts.WhitePromptResult>(
  "promptResult",
  promptResultModel
);

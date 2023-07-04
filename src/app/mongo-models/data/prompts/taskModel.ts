import mongoose from "mongoose";
import { WhiteModels } from "@failean/shared-types";
import { taskModel } from "@failean/mongo-models";

export default mongoose.model<WhiteModels.Data.Prompts.WhiteTask>(
  "task",
  taskModel
);

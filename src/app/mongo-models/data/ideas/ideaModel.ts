import mongoose from "mongoose";
import { WhiteModels } from "@failean/shared-types";
import { ideaModel } from "@failean/mongo-models";

export default mongoose.model<WhiteModels.Data.Ideas.WhiteIdea>(
  "idea",
  ideaModel
);

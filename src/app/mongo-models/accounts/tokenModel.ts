import mongoose from "mongoose";
import { WhiteModels } from "@failean/shared-types";
import { tokenModel } from "@failean/mongo-models";
export default mongoose.model<WhiteModels.Accounts.WhiteToken>(
  "token",
  tokenModel
);

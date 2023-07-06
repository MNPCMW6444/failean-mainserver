import mongoose from "mongoose";
import { WhiteModels } from "@failean/shared-types";
import { requestForAccountModel } from "@failean/mongo-models";

export default mongoose.model<WhiteModels.Auth.WhiteRequestForAccount>(
  "requestForAccount",
  requestForAccountModel
);

import mongoose from "mongoose";
import { WhiteModels } from "@failean/shared-types";
import { requestForPassChangeModel } from "@failean/mongo-models";

export default mongoose.model<WhiteModels.Auth.WhiteRequestForPassChange>(
  "requestForPassChange",
  requestForPassChangeModel
);

import mongoose from "mongoose";
import { WhiteModels } from "@failean/shared-types";
import { userModel } from "@failean/mongo-models";

export default mongoose.model<WhiteModels.Auth.WhiteUser>("user", userModel);

import { WhiteModels } from "@failean/shared-types";
import { userModel } from "@failean/mongo-models";
import { safeDB } from "../../setup/mongoSetup";

const getModel = async () =>
  safeDB?.model<WhiteModels.Auth.WhiteUser>("user", userModel);

export default getModel;

import { WhiteModels } from "@failean/shared-types";
import { requestForAccountModel } from "@failean/mongo-models";
import { safeDB } from "../../setup/mongoSetup";

const getModel = async () =>
  safeDB?.model<WhiteModels.Auth.WhiteRequestForAccount>(
    "requestForAccount",
    requestForAccountModel
  );

export default getModel;

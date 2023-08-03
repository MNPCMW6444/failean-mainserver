import { WhiteModels } from "@failean/shared-types";
import { requestForPassChangeModel } from "@failean/mongo-models";
import { safeDB } from "../../dbConnection";

export const getRequestForPassChangeModel = () => {
  if (!safeDB) throw new Error("Database not initialized");
  return safeDB.model<WhiteModels.Auth.WhiteRequestForPassChange>(
    "requestForPassChange",
    requestForPassChangeModel
  );
};

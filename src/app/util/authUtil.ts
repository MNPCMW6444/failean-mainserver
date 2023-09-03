import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { getUserModel } from "../mongo-models/auth/userModel";
import { WhiteModels } from "@failean/shared-types";
import { getSecrets } from "../setup/sectets";
type WhiteUser = WhiteModels.Auth.WhiteUser;

export const authUser = async (token: any): Promise<WhiteUser | null> => {
  const userModel = getUserModel();
  try {
    if (!token) return null;
    const validatedUser = jsonwebtoken.verify(
      token as string,
      ((await getSecrets()) as any).JWT as string
    );
    return userModel.findById((validatedUser as JwtPayload).id) || null;
  } catch (err) {
    return null;
  }
};

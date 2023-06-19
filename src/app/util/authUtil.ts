import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import userModel from "../mongo-models/auth/userModel";
import { WhiteUser } from "@failean/shared-types";

export const authUser = async (token: any): Promise<WhiteUser | null> => {
  try {
    if (!token) return null;
    const validatedUser = jsonwebtoken.verify(
      token as string,
      process.env.JWT_SECRET as string
    );
    return await userModel.findById((validatedUser as JwtPayload).id);
  } catch (err) {
    return null;
  }
};

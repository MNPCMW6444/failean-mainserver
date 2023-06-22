import tokenModal from "../../mongo-models/accounts/tokenModal";
import { WhiteModels } from "@failean/shared-types";
type WhiteUser = WhiteModels.Auth.WhiteUser;

export const amendTokens = async (
  user: WhiteUser,
  ammount: number
): Promise<"yes" | "no"> => {
  try {
    if (user.subscription !== "tokens") return "no";
    const add = new tokenModal({ owner: user._id, transaction: ammount });
    const saved = await add.save();
    return saved ? "yes" : "no";
  } catch (e) {
    return "no";
  }
};

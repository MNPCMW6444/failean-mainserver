import { WhiteUser } from "@failean/shared-types";
import tokenModal from "src/app/mongo-models/accounts/tokenModal";

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

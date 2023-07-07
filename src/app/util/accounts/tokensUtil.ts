import tokenModal from "../../mongo-models/accounts/tokenModel";
import { WhiteModels } from "@failean/shared-types";
type WhiteUser = WhiteModels.Auth.WhiteUser;

export const tokenCount = async (userID: string) => {
  const tokens = await tokenModal.find({ owner: userID });

  const count: number[] = tokens.map((transaction) => transaction.transaction);

  const total = count.reduce((a, b) => a + b, 0);

  return Math.floor(total);
};

export const amendTokens = async (
  user: WhiteUser,
  ammount: number,
  reason: string
): Promise<"yes" | "no"> => {
  try {
    if (user.subscription !== "tokens") return "no";
    const add = new tokenModal({
      owner: user._id,
      transaction: ammount,
      description: reason,
    });
    const saved = await add.save();
    return saved ? "yes" : "no";
  } catch (e) {
    console.log(e);
    return "no";
  }
};

import express from "express";
import jsonwebtoken from "jsonwebtoken";
import { API } from "@failean/shared-types";
import { tokenCount } from "../../util/accounts/tokensUtil";
import { getSecrets } from "../../setup/sectets";

const router = express.Router();

router.get<never, API.Accounts.CountTokens.Res>(
  "/countTokens",
  async (req, res) => {
    try {
      const token = req.cookies.jsonwebtoken;
      if (!token)
        return res.status(401).json({ errorMessage: "Unauthorized." });
      const { id }: any = jsonwebtoken.verify(
        token,
        ((await getSecrets()) as any).JWT as any
      );
      return res.status(200).json({ tokens: await tokenCount(id) });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ errorMessage: "Server error logged" });
    }
  }
);

export default router;

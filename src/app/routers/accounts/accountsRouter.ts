import express from "express";
import jsonwebtoken from "jsonwebtoken";
import tokenModal from "../../mongo-models/accounts/tokenModel";
import { API } from "@failean/shared-types";

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
        process.env.JWT_SECRET as any
      );

      const tokens = await tokenModal.find({ owner: id });

      const count: number[] = tokens.map(
        (transaction) => transaction.transaction
      );

      const total = count.reduce((a, b) => a + b, 0);

      return res.status(200).json({
        tokens: total,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ errorMessage: "Server error logged" });
    }
  }
);

router.get<any, any>("/addTokens", async (req, res) => {
  try {
    return res.status(200).json({
      x: "graph",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

router.get<any, any>("/removeTokens", async (req, res) => {
  try {
    return res.status(200).json({
      x: "graph",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

export default router;

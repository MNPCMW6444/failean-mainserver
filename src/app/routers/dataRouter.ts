import express from "express";
import jsonwebtoken from "jsonwebtoken";
import ideaModel from "../models/data/ideaModel";

const router = express.Router();

router.get("/getIdeas", async (req, res) => {
  try {
    const token = req.cookies.jsonwebtoken;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const validatedUser = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as any
    );
    let hisIdeas = await ideaModel.find({ owner: (validatedUser as any).id });
    return res.status(200).json({
      ideas: hisIdeas
        .map((idea: any) => idea._doc)
        .sort(
          (a: any, b: any) => b.updatedAt.getTime() - a.updatedAt.getTime()
        ),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

router.post("/saveIdea", async (req, res) => {
  try {
    const token = req.cookies.jsonwebtoken;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const validatedUser = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as any
    );
    const { idea } = req.body;
    await new ideaModel({
      owner: (validatedUser as any).id,
      idea,
    }).save();

    return res.status(200).json({ message: "Idea created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

export default router;

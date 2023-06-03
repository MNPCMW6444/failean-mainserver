import express from "express";
import jsonwebtoken from "jsonwebtoken";
import Idea from "../models/data/ideaModel";
import RawIdea from "../models/data/rawIdeaModel";

const router = express.Router();

router.get("/getIdeas", async (req, res) => {
  try {
    const token = req.cookies.jsonwebtoken;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const validatedUser = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as any
    );
    let hisIdeas = await Idea.find({ owner: (validatedUser as any).id });
    let promises = hisIdeas.map(async (idea) => {
      let lastRawIdea = await RawIdea.find({ parent: idea._id });
      return { ...idea, idea: lastRawIdea[lastRawIdea.length - 1].rawIdea };
    });
    Promise.all(promises).then((updatedIdeas) => {
      return res.status(200).json({
        ideas: updatedIdeas
          .map((idea: any) => idea._doc)
          .sort(
            (a: any, b: any) => b.updatedAt.getTime() - a.updatedAt.getTime()
          ),
      });
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
    const newIdea = await new Idea({
      owner: (validatedUser as any).id,
      idea,
    }).save();
    await new RawIdea({
      parent: newIdea._id,
      rawIdea: "Enter your new idea here",
    }).save();
    return res.status(200).json({ message: "Idea created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

router.post("/saveRawIdea", async (req, res) => {
  try {
    const token = req.cookies.jsonwebtoken;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const { rawIdea, parent } = req.body;
    await new RawIdea({
      parent,
      rawIdea,
    }).save();
    return res.status(200).json({ message: "Raw Idea created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

export default router;

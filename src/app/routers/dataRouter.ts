import express from "express";
import jwt from "jsonwebtoken";
import Idea from "../models/data/ideaModel";
import RawIdea from "../models/data/rawIdeaModel";

const router = express.Router();

router.get("/ideas", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const validatedUser = jwt.verify(token, process.env.JWT_SECRET as any);
    let hisIdeas = await Idea.find({ owner: (validatedUser as any).id });
    return res.status(200).json({
      ideas: hisIdeas,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

router.post("/lastRawIdea", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const idea = await Idea.findById(req.body.idea);
    let hisRawIdeas = await RawIdea.find({ parent: idea });
    return res
      .status(200)
      .json({ rawIdeas: hisRawIdeas[hisRawIdeas.length - 1] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

router.post("/saveIdea", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const validatedUser = jwt.verify(token, process.env.JWT_SECRET as any);
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
    const token = req.cookies.jwt;
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

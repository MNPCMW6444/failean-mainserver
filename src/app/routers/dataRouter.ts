import express from "express";
import jwt from "jsonwebtoken";
import Idea from "../models/data/ideaModel";
import rawIdea from "../models/data/rawIdeaModel";

const router = express.Router();

router.get("/ideas", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const validatedUser = jwt.verify(token, process.env.JWT_SECRET as any);
    let hisIdeas = await Idea.find({ owner: (validatedUser as any).id });
    if (hisIdeas.length > 0) {
      return res.status(200).json({
        ideas: hisIdeas.map((idea) => idea.idea),
      });
    } else {
      await new Idea({ owner: (validatedUser as any).id, idea: "" }).save();
      hisIdeas = await Idea.find({
        owner: (validatedUser as any).id,
      });
    }
    return res.status(200).json({
      ideas: hisIdeas.map((idea) => idea.idea),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

router.post("/rawIdeas", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const validatedUser = jwt.verify(token, process.env.JWT_SECRET as any);
    const hisIdeas = await Idea.find({ owner: (validatedUser as any).id });
    const lastIdea = hisIdeas[hisIdeas.length - 1];
    const idea = await Idea.findById(req.body.idea);
    let hisRawIdeas = await Idea.find({ parent: idea });
    if (hisRawIdeas.length > 0) {
      return res.status(200).json({ rawIdeas: hisRawIdeas });
    } else {
      await new rawIdea({ parent: lastIdea._id, idea: "" }).save();
      hisRawIdeas = await Idea.find({
        parent: lastIdea._id,
      });
    }
    return res.status(200).json({ rawIdeas: hisRawIdeas });
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
    const newRawIdea = new Idea({
      owner: (validatedUser as any).id,
      idea,
    });
    await newRawIdea.save();
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
    const newRawIdea = new Idea({
      parent,
      rawIdea,
    });
    await newRawIdea.save();
    return res.status(200).json({ message: "Raw Idea created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

export default router;

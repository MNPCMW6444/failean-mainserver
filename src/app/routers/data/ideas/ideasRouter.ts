import express from "express";
import ideaModel from "../../../mongo-models/data/ideas/ideaModel";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

router.get("/getIdeas", async (req, res) => {
  try {
    const token = req.cookies.jsonwebtoken;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const validatedUser = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as any
    );
    let hisIdeas = await ideaModel.find({
      owner: (validatedUser as any).id,
      archived: false,
    });
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
    const { idea, ideaID } = req.body;
    try {
      const ideaToUpdate = await ideaModel.findById(ideaID);
      if (ideaToUpdate) {
        ideaToUpdate.idea = idea;
        await ideaToUpdate.save();
        return res.status(200).json({ message: "Idea updated" });
      }
    } catch (err) {}
    await new ideaModel({
      owner: (validatedUser as any).id,
      idea,
    }).save();
    return res.status(200).json({ message: "Idea saved" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

router.post("/archiveIdea", async (req, res) => {
  try {
    const token = req.cookies.jsonwebtoken;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const validatedUser = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as any
    );
    const { ideaID } = req.body;
    const ideaToUpdate = await ideaModel.findById(ideaID);
    if (
      ideaToUpdate &&
      ideaToUpdate.owner.toString() === (validatedUser as any).id
    ) {
      ideaToUpdate.archived = true;
      await ideaToUpdate.save();
      return res.status(200).json({ message: "Idea updated" });
    } else
      return res
        .status(401)
        .json({ errorMessage: "Unauthorized, not your idea" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

export default router;

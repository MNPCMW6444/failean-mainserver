import express from "express";
import answerModel from "../../../mongo-models/data/critiq/critiqQuestModel";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

router.get("/data/critiqQuestionire/:ideaID", async (req, res) => {
  try {
    const token = req.cookies.jsonwebtoken;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const validatedUser = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as any
    );

    let ideacritiqQuestionire = await answerModel.find({
      ideaID: req.params.ideaID,
      owner: (validatedUser as any).id,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

router.post("/data/critiqQuestionire/update", async (req, res) => {
  try {
    const token = req.cookies.jsonwebtoken;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const validatedUser = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as any
    );
    const { ideaID, answers, failScore, leanScore } = req.body;

    const existingCritiq = await answerModel.findOne({
      ideaID,
      owner: (validatedUser as any).id,
    });

    if (!existingCritiq) {
      await new answerModel({
        ideaID,
        owner: (validatedUser as any).id,
        failScore,
        leanScore,
        answers,
      }).save();
    } else {
      existingCritiq.failScore = failScore;
      existingCritiq.leanScore = leanScore;
      existingCritiq.answers = answers;
      await existingCritiq.save();
    }

    return res.status(200).json({ message: "Critiq updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

export default router;

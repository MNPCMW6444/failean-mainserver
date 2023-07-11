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
    /* 
    return res
      .status(200)
      .json(ideacritiqQuestionire.map((answer: CritiqDocument) => answer._doc)); */
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
    const { ideaID, questionId, answer, failScore, leanScore } = req.body;

    const answerToUpdate = await answerModel.findOne({
      ideaID,
      questionId,
      owner: (validatedUser as any).id,
    });

    if (!answerToUpdate) {
      await new answerModel({
        ideaID,
        questionId,
        answer,
        failScore,
        leanScore,
        owner: (validatedUser as any).id,
      }).save();
    } else {
      /*  answerToUpdate.answer = answer;
      answerToUpdate.score = score; */
      await answerToUpdate.save();
    }

    return res.status(200).json({ message: "Answer updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

export default router;

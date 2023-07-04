import express from "express";
import answerModel from /*   CritiqDocument,
 */ "../../../mongo-models/data/critiq/critiqModel";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

router.get("/data/critiqQuestionire/:ideaId", async (req, res) => {
  try {
    const token = req.cookies.jsonwebtoken;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const validatedUser = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as any
    );

    let ideacritiqQuestionire = await answerModel.find({
      ideaId: req.params.ideaId,
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
    const { ideaId, questionId, answer, score } = req.body;

    const answerToUpdate = await answerModel.findOne({
      ideaId,
      questionId,
      owner: (validatedUser as any).id,
    });

    if (!answerToUpdate) {
      // Create a new answer if not exist
      await new answerModel({
        ideaId,
        questionId,
        answer,
        score,
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

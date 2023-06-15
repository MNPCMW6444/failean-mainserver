import express from "express";
import userModel from "../../models/auth/userModel";
import RequestForAccount from "../../models/auth/requestForAccountModal";
import { websiteSignup } from "../../../content/email-templates/authEmails";
import { sendEmail } from "../../util/emailUtil";
import { v4 as keyv4 } from "uuid";
import { clientDomain } from "../../../index";

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.post("/signupreq", async (req, res) => {
  try {
    const { email, idea } = req.body;
    if (!email)
      return res.status(400).json({
        clientError: "The email is missing",
      });
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        clientError: "An account with this email already exists",
      });

    const key = keyv4();

    await new RequestForAccount({
      email,
      key,
      idea,
    }).save();

    const url = `${clientDomain}/register?key=${key}`;

    const { subject, body } = websiteSignup(url);

    sendEmail(email, subject, body)
      .then(() => console.log("sent registration email"))
      .catch((err) => console.error(err));

    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.json({ result: "email successfully sent to " });

    res.status(500).send();
  }
});

export default router;

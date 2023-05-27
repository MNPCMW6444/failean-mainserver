import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID || "");

export const sendEmail = (to: string, subject: string, html: string) =>
  sgMail.send({
    from: {
      email: "service@f-ai-ler.com",
      name: "fAIler",
    },
    to,
    subject,
    html,
  });

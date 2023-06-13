import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import name from "../../content/name";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID || "");

export const sendEmail = (to: string, subject: string, html: string) =>
  sgMail.send({
    from: {
      email: "service@failean.com",
      name: name.up,
    },
    to,
    subject,
    html,
  });

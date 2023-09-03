import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import name from "../../content/name";
import { getSecrets } from "../setup/sectets";

dotenv.config();

export const sendEmail = async (to: string, subject: string, html: string) => {
  sgMail.setApiKey(((await getSecrets()) as any).SENDGRIDAPI);

  return sgMail.send({
    from: {
      email: "service@failean.com",
      name: name.up,
    },
    to,
    subject,
    html,
  });
};

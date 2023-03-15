import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const mailOptions = {
  from: process.env.MAIL,
  to: "metallrack02@gmail.com",
  subject: "nodemailer test",
  text: "fabrik_biblio testing",
};

import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { createEmployee } from "./employeeController.js";
import { createBorrower } from "./borrowerController.js";
import { createToken } from "../middlewares/jwt.js";
import { transporter, mailOptions } from "./../middlewares/mailSender.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getOneUser = async (req, res) => {
  const { email } = req.body.email;
  try {
    const user = await User.findOne({ email });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createUser = async (req, res) => {
  const { role, firstName, lastName, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  if (role === "Employee") {
    try {
      const employee = await createEmployee(
        role,
        firstName,
        lastName,
        email,
        hashedPassword
      );

      res.status(200).json(employee);

      //sending registration email
      mailOptions.to = email;
      mailOptions.subject = `Registration`;
      mailOptions.text = `You successfully registrated to fabrik_bibliotech project.`;
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      res.status(400).json(error);
    }
  } else if (role === "Borrower") {
    try {
      const borrower = await createBorrower(
        role,
        firstName,
        lastName,
        email,
        hashedPassword
      );
      res.status(200).json(borrower);

      //sending registration email
      mailOptions.to = email;
      mailOptions.subject = `Registration`;
      mailOptions.text = `You successfully registrated to fabrik_bibliotech project.`;
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json({ message: "Invalid role" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json("user not found");
    } else {
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        res.status(400).json("password is incorrect");
      } else {
        const authToken = createToken(user);

        res.cookie(
          "authToken",
          { authToken, role: user.role },
          {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 1000, // maxAge : 30 days
          }
        );
        res.status(200).json(user);
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("authToken");
    res.status(200).json({ message: "logout success" });
  } catch (error) {
    res.status(400).json(error);
  }
};

import express from "express";
import { borrowerAuthValidation } from "../middlewares/jwt.js";
import {
  createUser,
  getAllUsers,
  login,
  logout,
} from "./../controllers/userController.js";

export const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/register", createUser);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

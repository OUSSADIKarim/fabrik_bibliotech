import express from "express";
import {
  createUser,
  getAllUsers,
  login,
} from "./../controllers/userController.js";

export const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/register", createUser);
userRouter.post("/login", login);

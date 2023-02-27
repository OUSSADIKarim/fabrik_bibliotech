import express from "express";
import { createUser, getAllUsers } from "./../controllers/userController.js";

export const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/register", createUser);

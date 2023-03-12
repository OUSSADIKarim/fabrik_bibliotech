import express from "express";
import {
  borrowerAuthValidation,
  employeeAuthValidation,
} from "../middlewares/jwt.js";
import {
  createUser,
  getAllUsers,
  login,
  logout,
} from "./../controllers/userController.js";

export const userRouter = express.Router();

userRouter.get("/", employeeAuthValidation, getAllUsers);
userRouter.post("/register", createUser);
userRouter.post("/login", login);
userRouter.post(
  "/logout",
  [borrowerAuthValidation, employeeAuthValidation],
  logout
);

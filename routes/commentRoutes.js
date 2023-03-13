import express from "express";
import {
  borrowerAuthValidation,
  employeeAuthValidation,
} from "../middlewares/jwt.js";
import {
  getAllComments,
  getOneComment,
  createComment,
  deleteComment,
} from "./../controllers/commentController.js";

export const commentRouter = express.Router();

commentRouter.get("/", getAllComments);
commentRouter.get("/:id", getOneComment);
commentRouter.post("/", borrowerAuthValidation, createComment);
commentRouter.delete(
  "/",
  [borrowerAuthValidation, employeeAuthValidation],
  deleteComment
);

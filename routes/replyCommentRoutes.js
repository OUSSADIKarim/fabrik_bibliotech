import express from "express";
import {
  borrowerAuthValidation,
  employeeAuthValidation,
} from "../middlewares/jwt.js";
import {
  getAllCommentReplies,
  createCommentReply,
} from "./../controllers/replyCommentController.js";

export const replyCommentRouter = express.Router();

replyCommentRouter.get("/", getAllCommentReplies);
replyCommentRouter.post("/", borrowerAuthValidation, createCommentReply);
replyCommentRouter.delete(
  "/",
  [borrowerAuthValidation, employeeAuthValidation],
  createCommentReply
);

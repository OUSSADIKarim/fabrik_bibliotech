import express from "express";
import { borrowerAuthValidation } from "../middlewares/jwt.js";
import {
  createLoan,
  udpateLoanToReturned,
  getAllLoans,
  getOneLoan,
} from "../controllers/loanController.js";

export const loanRouter = express.Router();

loanRouter.get("/", getAllLoans);
loanRouter.get("/:id", getOneLoan);
loanRouter.post("/create", borrowerAuthValidation, createLoan);
loanRouter.post(
  "/updateToReturned",
  borrowerAuthValidation,
  udpateLoanToReturned
);

import express from "express";
import {
  borrowerAuthValidation,
  employeeAuthValidation,
} from "../middlewares/jwt.js";
import {
  createLoan,
  udpateLoanToReturned,
  getAllLoans,
  getOneLoan,
} from "../controllers/loanController.js";

export const loanRouter = express.Router();

loanRouter.get(
  "/",
  [borrowerAuthValidation, employeeAuthValidation],
  getAllLoans
);
loanRouter.get(
  "/:id",
  [borrowerAuthValidation, employeeAuthValidation],
  getOneLoan
);
loanRouter.post("/create", borrowerAuthValidation, createLoan);
loanRouter.post(
  "/updateToReturned",
  employeeAuthValidation,
  udpateLoanToReturned
);

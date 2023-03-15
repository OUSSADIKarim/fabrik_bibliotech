import express from "express";
import {
  getBorrowerPenalties,
  getBorrowerHistory,
  renewLoan,
} from "../controllers/borrowerController.js";
import { borrowerAuthValidation } from "../middlewares/jwt.js";

export const borrowerRouter = express.Router();

borrowerRouter.get("/penalties", borrowerAuthValidation, getBorrowerPenalties);
borrowerRouter.get("/history", borrowerAuthValidation, getBorrowerHistory);
borrowerRouter.post("/renewLoan", borrowerAuthValidation, renewLoan);

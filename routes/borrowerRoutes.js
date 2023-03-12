import express from "express";
import { getBorrowerPenalties } from "../controllers/borrowerController.js";
import { borrowerAuthValidation } from "../middlewares/jwt.js";

export const borrowerRouter = express.Router();

borrowerRouter.get("/penalties", borrowerAuthValidation, getBorrowerPenalties);

import express from "express";
import {
  getAllPenalties,
  getOnePenalty,
} from "../controllers/penaltyController.js";
import { employeeAuthValidation } from "./../middlewares/jwt.js";

export const penaltyRouter = express.Router();

penaltyRouter.get("/", employeeAuthValidation, getAllPenalties);
penaltyRouter.get("/:id", employeeAuthValidation, getOnePenalty);

import express from "express";
import { getStats } from "../controllers/employeeController.js";
import { employeeAuthValidation } from "./../middlewares/jwt.js";

export const employeeRouter = express.Router();

employeeRouter.get("/getStats", employeeAuthValidation, getStats);

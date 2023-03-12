import express from "express";
import { employeeAuthValidation } from "../middlewares/jwt.js";
import {
  createCategory,
  getAllCategories,
} from "../controllers/categoryController.js";

export const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/create", employeeAuthValidation, createCategory);

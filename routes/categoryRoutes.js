import express from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/categoryController.js";

export const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/create", createCategory);

import express from "express";
import { employeeAuthValidation } from "../middlewares/jwt.js";

import {
  getAllBooks,
  createBook,
  getOneBook,
} from "../controllers/bookController.js";

export const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.get("/:title", getOneBook);
bookRouter.post("/create", employeeAuthValidation, createBook);

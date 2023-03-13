import express from "express";
import { employeeAuthValidation } from "../middlewares/jwt.js";

import {
  getAllBooks,
  createBook,
  getOneBook,
  deleteBook,
} from "../controllers/bookController.js";

export const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.get("/:title", getOneBook);
bookRouter.post("/create", employeeAuthValidation, createBook);
bookRouter.delete("/delete", employeeAuthValidation, deleteBook);

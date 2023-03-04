import express from "express";

import {
  getAllBooks,
  createBook,
  getOneBook,
} from "../controllers/bookController.js";

export const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.get("/:title", getOneBook);
bookRouter.post("/create", createBook);

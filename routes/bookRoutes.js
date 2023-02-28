import express from "express";

import { getAllBooks, createBook } from "../controllers/bookController.js";

export const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.post("/create", createBook);

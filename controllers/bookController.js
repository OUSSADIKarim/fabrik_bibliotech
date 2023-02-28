import { Book } from "../models/Book.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createBook = async (req, res) => {
  const { employee, categories, title, author, note, price, copies } = req.body;

  try {
    const categoriesIds = await Book.getCategoriesIds(categories);
    const book = new Book({
      employee,
      categories: categoriesIds,
      title,
      author,
      note,
      price,
      copies,
    });
    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json(error);
  }
};

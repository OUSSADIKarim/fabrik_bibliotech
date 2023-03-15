import { Book } from "../models/Book.js";
import { Borrower } from "./../models/Borrower.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getOneBook = async (req, res) => {
  const title = req.params.title;

  try {
    const book = await Book.findOne({ title });
    res.status(200).json(book);
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

    //sending book added notification email
    const borrowers = await Borrower.find();
    borrowers.forEach((borrower) => {
      const email = borrower.email;
      mailOptions.to = email;
      mailOptions.subject = `Book added`;
      mailOptions.text = `A new Book was added in fabrik_bibliotech. Check it out`;
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteBook = async (req, res) => {
  const bookId = req.body.bookId;
  try {
    const book = await Book.deleteOne({ _id: bookId });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json(error);
  }
};

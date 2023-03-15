import { Employee } from "../models/Employee.js";
import { Book } from "./../models/Book.js";
import { Borrower } from "./../models/Borrower.js";

export const createEmployee = async (
  role,
  firstName,
  lastName,
  email,
  hashedPassword
) => {
  const employee = new Employee({
    role,
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await employee.save();
  return employee;
};

export const getStats = async (req, res) => {
  let numberOfLoans = 0;

  try {
    const books = await Book.find();
    books.forEach((book) => {
      numberOfLoans = numberOfLoans + book.loansNumber;
    });

    const maxLoansNumberBook = await Book.find()
      .sort({ loansNumber: -1 })
      .limit(1);

    const numberOfBorrowers = await Borrower.find({
      firstLoanDate: { $ne: null },
    })
      .distinct("_id")
      .count();

    res
      .status(200)
      .json({ numberOfLoans, maxLoansNumberBook, numberOfBorrowers });
  } catch (error) {
    res.status(400).json(error);
  }
};

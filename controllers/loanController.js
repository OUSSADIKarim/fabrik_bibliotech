import { Loan } from "../models/Loan.js";
import { Book } from "./../models/Book.js";
import { Borrower } from "./../models/Borrower.js";
import { Penalty } from "./../models/Penalty.js";

export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.status(200).json(loans);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getOneLoan = async (req, res) => {
  const loanId = req.params.loanId;
  try {
    const loan = await Loan.findOne({ _id: loanId });
    res.status(200).json(loan);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createLoan = async (req, res) => {
  const borrower = res.locals.user_id;
  const bookTitle = req.body.book;

  try {
    const book = await Book.findOne({ title: bookTitle });
    const book_id = book._id;
    const alreadyBorrowed = await Loan.alreadyBorrowed(borrower, book_id);
    const available = book.available;

    // check if already borrowed
    if (alreadyBorrowed === true) {
      res.status(400).json("you already borrowed this book");
    } else {
      // check if available
      if (available === true) {
        // check if borrower has unpayed penalty
        const presenceOfPenalty = await Penalty.checkPresenceOfPenalty(
          borrower
        );
        if (presenceOfPenalty === true) {
          res.status(400).json("you have unpayed penalty");
        } else {
          const borrowerAccount = await Borrower.findOne({ borrower });
          const firstLoanDate = borrowerAccount.firstLoanDate;
          const currentDate = moment();
          const firstLoanDateInMomentJs = moment(firstLoanDate);
          const diffInMonths = currentDate.diff(
            firstLoanDateInMomentJs,
            "months"
          );
          // check if it's first time borrowing a book since using the platform
          if (!firstLoanDate) {
            const loan = await Loan.createLoan(borrower, book, book_id);
            await borrowerAccount.setFirstLoanDate(loan.loanDate);
            res.status(200).json(loan);
          } else {
            // check if the diff between the first loan and the current day is more then one month
            if (diffInMonths <= 1) {
              const numberOfLoans = await Loan.numberOfLoans(borrower);
              // check if number loans per month is already 3
              if (numberOfLoans === 3) {
                res
                  .status(400)
                  .json("you can't borrow more than 3 copies in one month");
              } else if (numberOfLoans === 0) {
                const loan = await Loan.createLoan(borrower, book, book_id);
                await borrowerAccount.setFirstLoanDate(loan.loanDate);
                res.status(200).json(loan);
              } else {
                const loan = await Loan.createLoan(borrower, book, book_id);
                res.status(200).json(loan);
              }
            }
          }
        }
      } else {
        res.status(400).json("this book is not available");
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const udpateLoanToReturned = async (req, res) => {
  try {
    const loanId = req.body.loanId;
    const returned = req.body.returned;
    const loan = await Loan.findOne({ _id: loanId }).update({ returned: true });
    await loan.save();
    res.status(200).json(loan);
  } catch (error) {
    res.status(400).json(error);
  }
};

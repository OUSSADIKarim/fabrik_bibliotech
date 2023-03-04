import mongoose from "mongoose";
import moment from "moment";

const Schema = mongoose.Schema;

const loanSchema = new Schema({
  borrower: {
    type: Schema.Types.ObjectId,
    ref: "Borrower",
    required: true,
  },

  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },

  loanDate: {
    type: Date,
    default: () => {
      return moment();
    },
    required: true,
  },

  loanDeadline: {
    type: Date,
    required: true,
    default: () => {
      return moment().add(1, "months");
    },
  },

  returned: {
    type: Boolean,
    required: true,
    default: false,
  },
});

loanSchema.statics.createLoan = async function (borrower, book, book_id) {
  const loan = new Loan({
    borrower: borrower,
    book: book_id,
  });
  await loan.save();
  await book.substractCopy();
  await book.addLoansNumber();

  return loan;
};

loanSchema.statics.alreadyBorrowed = async function (borrower, book) {
  const loan = await Loan.findOne({ borrower, book });
  if (!loan) {
    return false;
  } else {
    return true;
  }
};

loanSchema.statics.numberOfLoans = async function (borrower) {
  const currentMonthStart = moment().startOf("month");
  const currentMonthEnd = moment().endOf("month");
  const currentYear = moment().year();
  const borrowerLoans = await Loan.find({
    borrower,
    loanDate: {
      $gte: currentMonthStart,
      $lte: currentMonthEnd,
    },
    $expr: {
      $eq: [{ $year: "$loanDate" }, currentYear],
    },
  });
  const numberOfLoans = borrowerLoans.length;
  return numberOfLoans;
};

export const Loan = mongoose.model("Loan", loanSchema);

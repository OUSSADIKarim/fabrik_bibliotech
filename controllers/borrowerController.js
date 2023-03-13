import { Borrower } from "../models/Borrower.js";
import { Penalty } from "./../models/Penalty.js";
import { Loan } from "./../models/Loan.js";

export const createBorrower = async (
  role,
  firstName,
  lastName,
  email,
  hashedPassword
) => {
  const borrower = new Borrower({
    role,
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await borrower.save();
  return borrower;
};

export const getBorrowerPenalties = async (req, res) => {
  const borrower = res.locals.user_id;
  try {
    const penalties = await Penalty.getBorrowerPenalties(borrower);
    res.status(201).json(penalties);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getBorrowerHistory = async (req, res) => {
  const borrower = res.locals.user_id;
  try {
    const loans = await Loan.find({ borrower }, "-_id -__v -borrower").populate(
      {
        path: "book",
        select: "-_id title author note price",
      }
    );
    const penalities = await Penalty.find(
      { borrower },
      "-_id penaltyDate price payed"
    )
      .populate({ path: "loan", select: "-_id" })
      .populate({ path: "book", select: "-_id title price" });

    res.status(200).json({ loans, penalities });
  } catch (error) {
    res.status(400).json(error);
  }
};

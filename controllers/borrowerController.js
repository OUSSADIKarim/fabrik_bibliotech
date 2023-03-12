import { Borrower } from "../models/Borrower.js";
import { Penalty } from "./../models/Penalty.js";

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

import { Borrower } from "../models/Borrower.js";

export const createBorrower = async (
  role,
  firstName,
  lastName,
  email,
  password
) => {
  const borrower = new Borrower({ role, firstName, lastName, email, password });
  await borrower.save();
  return borrower;
};

import { Borrower } from "../models/Borrower.js";

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

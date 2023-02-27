import { User } from "../models/User.js";
import { createEmployee } from "./employeeController.js";
import { createBorrower } from "./borrowerController.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

export const createUser = async (req, res) => {
  const { role, firstName, lastName, email, password } = req.body;
  if (role === "Employee") {
    try {
      const employee = await createEmployee(
        role,
        firstName,
        lastName,
        email,
        password
      );
      res.status(200).json(employee);
    } catch (error) {
      res.status(400).json(error);
    }
  } else if (role === "Borrower") {
    try {
      const borrower = await createBorrower(
        role,
        firstName,
        lastName,
        email,
        password
      );
      console.log(borrower);
      res.status(200).json(borrower);
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json({ message: "Invalid role" });
  }
};

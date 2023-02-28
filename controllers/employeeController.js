import { Employee } from "../models/Employee.js";

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

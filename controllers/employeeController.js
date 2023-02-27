import { Employee } from "../models/Employee.js";

export const createEmployee = async (
  role,
  firstName,
  lastName,
  email,
  password
) => {
  const employee = new Employee({ role, firstName, lastName, email, password });
  await employee.save();
  return employee;
};

import mongoose from "mongoose";
import { User } from "./User.js";

const Schema = mongoose.Schema;

const borrowerSchema = new Schema({
  firstLoanDate: {
    type: Date,
  },
});

borrowerSchema.methods.setFirstLoanDate = async function (date) {
  this.firstLoanDate = date;
  await this.save();
  return;
};

export const Borrower = User.discriminator("Borrower", borrowerSchema);

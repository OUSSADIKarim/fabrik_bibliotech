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

export const Loan = mongoose.model("Loan", loanSchema);

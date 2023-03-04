import mongoose from "mongoose";
import moment from "moment";
import { Loan } from "./Loan.js";

const Schema = mongoose.Schema;

const penaltySchema = new Schema({
  loan: {
    type: Schema.Types.ObjectId,
    ref: "Loan",
    required: true,
  },

  borrower: {
    type: Schema.Types.ObjectId,
    ref: "Borrower",
    required: true,
  },

  penaltyDate: {
    type: Date,
    required: true,
    default: moment(),
  },

  price: {
    type: Number,
    required: true,
    default: 0,
  },

  payed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

penaltySchema.statics.createPenalty = async function (loan, borrower) {
  const penalty = new Penalty({
    loan,
    borrower,
  });

  await penalty.save();
  await penalty.setPrice();
  return;
};

penaltySchema.methods.setPrice = async function () {
  if (this.payed) {
    return;
  } else {
    const loan = await Loan.findById(this.loan).populate("Book");
    const bookPrice = await loan.book.price;
    const penaltyDays = moment().diff(this.penaltyDate, "days");

    this.price = penaltyDays * bookPrice * 0.05;
    await this.save();
    return;
  }
};

penaltySchema.statics.checkPresenceOfPenalty = async function (borrower) {
  const loans = await Penalty.find({ borrower: borrower, payed: false });
  if (!loans) {
    return false;
  } else {
    return true;
  }
};

export const Penalty = mongoose.model("Penalty", penaltySchema);

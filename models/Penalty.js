import mongoose from "mongoose";
import moment from "moment";

const Schema = mongoose.Schema;

const penaltySchema = new Schema({
  loan: {
    type: Schema.Types.ObjectId,
    ref: "Loan",
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
  },

  payed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

penaltySchema.statics.setPrice = async function () {
  if (this.payed === "true") {
    return;
  }
  const loan = await mongoose
    .model("Loan")
    .findById(this.loan)
    .populate("Book");
  const bookPrice = await loan.book.price;
  const penaltyDays = moment().diff(this.penaltyDate, "days");

  this.price = penaltyDays * bookPrice * 0.05;
  await this.save();
  return;
};

export const Penalty = mongoose.model("Penalty", penaltySchema);

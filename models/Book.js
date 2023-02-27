import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },

  categories: [
    {
      type: Schema.Type.ObjectId,
      ref: "Category",
    },
  ],

  title: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  note: Number,

  price: {
    type: Number,
    required: true,
  },

  copies: {
    type: Number,
    required: true,
  },
});

bookSchema.statics.substractCopy = function () {
  this.copies = this.copies - 1;
  this.save();
  return;
};

export const Book = mongoose.model("Book", bookSchema);

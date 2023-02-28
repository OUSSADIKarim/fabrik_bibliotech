import mongoose from "mongoose";
import { Category } from "./Category.js";

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },

  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],

  title: {
    type: String,
    required: true,
    unique: true,
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

bookSchema.statics.getCategoriesIds = async (categories) => {
  const categoriesIds = [];
  try {
    await Promise.all(
      categories.map(async (category) => {
        const categoryFound = await Category.findOne({ title: category });
        const categoryId = categoryFound._id;
        categoriesIds.push(categoryId);
      })
    );
  } catch (error) {
    console.log(error);
  }
  return categoriesIds;
};

export const Book = mongoose.model("Book", bookSchema);

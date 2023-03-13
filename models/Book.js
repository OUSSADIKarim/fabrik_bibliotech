import mongoose from "mongoose";
import { Category } from "./Category.js";
import { Comment } from "./Comment.js";
import { ReplyComment } from "./ReplyComment.js";

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

  loansNumber: {
    type: Number,
    default: 0,
  },
});

bookSchema.virtual("available").get(function () {
  if (this.copies === 0) {
    return false;
  } else {
    return true;
  }
});

bookSchema.virtual("bookId").get(function () {
  return this._id;
});

bookSchema.methods.substractCopy = async function () {
  this.copies = this.copies - 1;
  await this.save();
  return;
};

bookSchema.methods.addCopy = async function () {
  this.copies = this.copies + 1;
  await this.save();
  return;
};

bookSchema.methods.addLoansNumber = async function () {
  this.loansNumber = this.loansNumber + 1;
  await this.save();
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

// delete comments before delete
bookSchema.pre("deleteOne", async function () {
  const bookId = this.getQuery()._id;
  try {
    const comments = await Comment.find({ book: bookId });
    comments.forEach(async (comment) => {
      const commentReplies = await ReplyComment.deleteMany({
        comment: comment._id,
      });
      await Comment.deleteOne({ _id: comment._id });
    });
  } catch (error) {
    console.log(error);
  }
});

export const Book = mongoose.model("Book", bookSchema);

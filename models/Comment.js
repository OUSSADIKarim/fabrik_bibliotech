import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const commentSchema = new Schema({
  borrower: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export const Comment = mongoose.model("Comment", commentSchema);

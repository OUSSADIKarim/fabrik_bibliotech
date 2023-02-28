import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);

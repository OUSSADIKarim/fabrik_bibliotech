import mongoose from "mongoose";
import "mongoose-type-email";

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["Employee", "Borrower"],
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, discriminatorKey: "role" }
);

export const User = mongoose.model("User", userSchema);

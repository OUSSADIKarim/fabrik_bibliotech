import mongoose from "mongoose";
import { Comment } from "./Comment.js";

const Schema = mongoose.Schema;

const replyCommentSchema = new Schema({
  comment: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export const ReplyComment = Comment.discriminator(
  "ReplyComment",
  replyCommentSchema
);

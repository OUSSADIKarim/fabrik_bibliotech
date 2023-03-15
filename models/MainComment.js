import mongoose from "mongoose";
import { Comment } from "./Comment.js";
import { ReplyComment } from "./ReplyComment.js";

const Schema = mongoose.Schema;

export const mainCommentSchema = new Schema({});

//delete all replies before delinting main comment
mainCommentSchema.pre("deleteOne", async function () {
  const commentId = this.getQuery()._id;
  try {
    const commentReplies = await ReplyComment.deleteMany({
      comment: commentId,
    });
  } catch (error) {
    console.log(error);
  }
});

export const MainComment = Comment.discriminator(
  "MainComment",
  mainCommentSchema
);

import { ReplyComment } from "../models/ReplyComment.js";
import { Comment } from "./../models/Comment.js";

export const getAllCommentReplies = async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const commentReplies = await ReplyComment.find({ comment: commentId });
    res.json(200).json(commentReplies);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createCommentReply = async (req, res) => {
  const { commentId, content } = req.body;
  const borrower = res.locals.user_id;
  try {
    const comment = await Comment.findOne({ _id: commentId });
    if (!comment) {
      res.status(400).json(`comment not found`);
      return;
    }
    const book = comment.book;
    const replyComment = new ReplyComment({
      borrower,
      book,
      content,
      comment: commentId,
    });
    await replyComment.save();
    res.status(200).json(replyComment);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteCommentReply = async (req, res) => {
  const replyCommentId = req.body.replyCommentId;
  try {
    const replyComment = ReplyComment.findOneAndDelete({ _id: replyCommentId });
    res
      .status(200)
      .json(
        `comment reply deleted successfully:\ncommentRply: ${replyComment}`
      );
  } catch (error) {
    res.status(400).json(error);
  }
};

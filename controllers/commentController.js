import { Comment } from "../models/Comment.js";
import { ReplyComment } from "./../models/ReplyComment.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(201).json(comments);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getOneComment = async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const comment = await Comment.find({ _id: commentId });
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createComment = async (req, res) => {
  const { book, content } = req.body;
  const borrower = res.locals.user_id;

  try {
    const comment = await new Comment({ borrower, book, content });
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteComment = async (req, res) => {
  const commentId = req.body.commentId;
  try {
    const comment = await Comment.findOneAndDelete({ _id: commentId });
    res
      .stauts(200)
      .json(
        `comment deleted succesully:\ncomment: ${comment}\ncomment replies: ${commentRplies}`
      );
  } catch (error) {
    res.stauts(400).json(error);
  }
};

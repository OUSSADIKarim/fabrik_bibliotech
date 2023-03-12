import { Penalty } from "../models/Penalty.js";

export const getAllPenalties = async (req, res) => {
  try {
    const penalties = await Penalty.find();
    res.status(201).json(penalties);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getOnePenalty = async (req, res) => {
  const penaltyID = req.params.id;
  try {
    const penalty = await Penalty.findOne({ _id: penaltyID });
    res.status(201).json(penalty);
  } catch (error) {
    res.status(400).json(error);
  }
};

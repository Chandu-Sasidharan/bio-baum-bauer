import { StatusCodes } from 'http-status-codes';
import Feedback from '../models/Feedback.js';
import { body, validationResult } from 'express-validator';
import Filter from 'bad-words';

const filter = new Filter();

// Filter feedback including profanity
export const profanityFilter = (req, res, next) => {
  if (filter.isProfane(req.body.content)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Feedback cannot include profanity.',
    });
  }
  next();
};

// Validator Middleware
export const validateFeedback = [
  body('content')
    .notEmpty()
    .withMessage('Content is required.')
    .trim()
    .isLength({ min: 3, max: 300 })
    .withMessage('Content must be between 3 and 300 characters.'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be a number between 1 and 5.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    next();
  },
];

// Create a new feedback
export const createFeedback = async (req, res) => {
  try {
    const { content, rating } = req.body;
    const createdFeedback = await Feedback.create({ content, rating });
    res.status(StatusCodes.CREATED).json(createdFeedback);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to create feedback.', error: error.message });
  }
};

// Get all feedback
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(StatusCodes.OK).json(feedbacks);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to fetch feedback.', error: error.message });
  }
};

// Get feedback by ID
export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Feedback not found.' });
      return;
    }
    res.status(StatusCodes.OK).json(feedback);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to fetch feedback.', error: error.message });
  }
};

// Update feedback by ID
export const updateFeedbackById = async (req, res) => {
  try {
    const { content, rating } = req.body;
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { content, rating },
      { new: true }
    );
    if (!updatedFeedback) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Feedback not found.' });
      return;
    }
    res.status(StatusCodes.OK).json(updatedFeedback);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to update feedback.', error: error.message });
  }
};

// Delete feedback by ID
export const deleteFeedbackById = async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Feedback not found.' });
      return;
    }
    res.status(StatusCodes.OK).json({
      message: 'Feedback deleted successfully.',
      feedback: deletedFeedback,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to delete feedback.', error: error.message });
  }
};

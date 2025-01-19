import express from 'express';
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
  profanityFilter,
  validateFeedback,
} from '../controllers/feedbackController.js';

const router = express.Router();

// Create a new feedback
router.post('/create', validateFeedback, profanityFilter, createFeedback);

// Get all feedbacks
router.get('/', getAllFeedbacks);

// Get feedback by ID
router.get('/:id', getFeedbackById);

// Update feedback by ID
router.patch(
  '/update/:id',
  validateFeedback,
  profanityFilter,
  updateFeedbackById
);

// Delete feedback by ID
router.delete('/delete/:id', deleteFeedbackById);

export default router;

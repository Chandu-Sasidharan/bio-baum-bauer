import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema({
  date: { type: Date, default: Date.now },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [3, 'Content must be at least 3 characters long'],
    maxlength: [300, 'Content must be less than 300 characters'],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must be no more than 5'],
  },
});

const Feedback = model('feedback', feedbackSchema);

export default Feedback;

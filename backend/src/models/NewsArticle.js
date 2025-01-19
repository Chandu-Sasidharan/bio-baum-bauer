// NewsArticle.js
import mongoose from 'mongoose';
import User from './User.js';

const newsArticleSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: Date.now },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
});

const NewsArticle = mongoose.model('NewsArticle', newsArticleSchema);

export default NewsArticle;

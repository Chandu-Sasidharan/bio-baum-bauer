import { Schema, model } from 'mongoose';

const validateURL = url => {
  return /^https?:\/\/\S+$/.test(url);
};

const gallerySchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [50, 'Title must be at most 50 characters'],
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    validate: {
      validator: validateURL,
      message: 'Invalid URL format for image',
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = model('gallery', gallerySchema);

export default Gallery;

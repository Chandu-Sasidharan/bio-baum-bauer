import { StatusCodes } from 'http-status-codes';
import { body, validationResult } from 'express-validator';
import Gallery from '../models/Gallery.js';

// Validator Middleware
export const validateGallery = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required.')
    .isLength({ max: 50 })
    .withMessage('Title must be at most 50 characters.'),
  body('image') // the name "image" should be the same as name attribute in form
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Please upload an image');
      }
      return true;
    }),
];

export const showValidateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  next();
};

// Create a new gallery item
export const createGalleryItem = async (req, res) => {
  const { title } = req.body;
  const imageName = req.file.path;
  try {
    const createdGalleryItem = await Gallery.create({
      title,
      image: imageName,
    });
    res.status(StatusCodes.CREATED).json(createdGalleryItem);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to create gallery item.',
      error: error.message,
    });
  }
};

// Get all gallery items
export const getAllGalleryItems = async (req, res) => {
  try {
    const galleryItems = await Gallery.find();
    res.status(StatusCodes.OK).json(galleryItems);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to fetch gallery items.',
      error: error.message,
    });
  }
};

// Get gallery item by ID
export const getGalleryItemById = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Gallery item not found.' });
      return;
    }
    res.status(StatusCodes.OK).json(galleryItem);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to fetch gallery item.',
      error: error.message,
    });
  }
};

// Update gallery item by ID
export const updateGalleryItemById = async (req, res) => {
  try {
    const { title, image } = req.body;
    const updatedGalleryItem = await Gallery.findByIdAndUpdate(
      req.params.id,
      { title, image },
      { new: true }
    );
    if (!updatedGalleryItem) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Gallery item not found.' });
      return;
    }
    res.status(StatusCodes.OK).json(updatedGalleryItem);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to update gallery item.',
      error: error.message,
    });
  }
};

// Delete gallery item by ID
export const deleteGalleryItemById = async (req, res) => {
  try {
    const deletedGalleryItem = await Gallery.findByIdAndDelete(req.params.id);
    if (!deletedGalleryItem) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Gallery item not found.' });
      return;
    }
    res.status(StatusCodes.OK).json({
      message: 'Gallery item deleted successfully.',
      galleryItem: deletedGalleryItem,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to delete gallery item.',
      error: error.message,
    });
  }
};

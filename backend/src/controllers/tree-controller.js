import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import Tree from '#src/models/tree.js';

// Get All Trees
export const getAllTrees = async (req, res, next) => {
  try {
    const { sort, category, page = 1, limit = 10 } = req.query;

    const query = {};
    if (category) {
      query.category = category;
    }

    let sortOption = {};
    if (sort) {
      const [key, order] = sort.split(':');
      sortOption[key] = order === 'desc' ? -1 : 1;
    }

    const trees = await Tree.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    const total = await Tree.countDocuments(query);

    return res.status(StatusCodes.OK).json({ trees, total });
  } catch (error) {
    next(error);
  }
};

// Get All Featured Trees
export const getAllFeaturedTrees = async (_req, res, next) => {
  try {
    const featuredTrees = await Tree.find({ isFeatured: true }).limit(4).lean();

    return res.status(StatusCodes.OK).json({ featuredTrees });
  } catch (error) {
    next(error);
  }
};

// Get Tree by ID
export const getTreeById = async (req, res, next) => {
  const { id } = req.params;

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid Tree ID' });
  }

  try {
    const tree = await Tree.findById(id);
    if (!tree) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Tree not found' });
    }

    return res.status(StatusCodes.OK).json({ tree });
  } catch (error) {
    next(error);
  }
};

// Get Trees in Cart
export const getTreesInCart = async (req, res, next) => {
  try {
    const { ids } = req.body;

    // Validate ids
    if (
      !Array.isArray(ids) ||
      !ids.every(id => mongoose.Types.ObjectId.isValid(id))
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid tree IDs' });
    }

    const trees = await Tree.find({ _id: { $in: ids } });

    return res.status(StatusCodes.OK).json({ trees });
  } catch (error) {
    next(error);
  }
};

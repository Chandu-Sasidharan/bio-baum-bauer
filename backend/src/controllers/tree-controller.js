import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import Tree from '#src/models/tree.js';
import {
  CATEGORY_LABELS,
  DEFAULT_LOCALE,
  STATUS_LABELS,
} from '#src/constants/i18n.js';
import pickLocalizedField from '#src/utils/pick-localized-field.js';

const mapTree = (tree, locale = DEFAULT_LOCALE) => ({
  ...tree,
  name: pickLocalizedField(tree.name, locale),
  shortDescription: pickLocalizedField(tree.shortDescription, locale),
  description: pickLocalizedField(tree.description, locale),
  categoryLabel: pickLocalizedField(CATEGORY_LABELS[tree.category], locale),
  statusLabel: pickLocalizedField(STATUS_LABELS[tree.status], locale),
});

// Get All Trees
export const getAllTrees = async (req, res, next) => {
  try {
    const { sort, category, page = 1, limit = 10 } = req.query;

    const query = {};
    if (category) {
      query.category = category;
    }

    const locale = req.locale || DEFAULT_LOCALE;
    let sortOption = {};
    if (sort) {
      const [key, order] = sort.split(':');
      const normalizedKey =
        key === 'name'
          ? `name.${locale}`
          : key === 'shortDescription'
            ? `shortDescription.${locale}`
            : key;
      sortOption[normalizedKey] = order === 'desc' ? -1 : 1;
    }

    const trees = await Tree.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    const total = await Tree.countDocuments(query);
    const localizedTrees = trees.map(tree => mapTree(tree, req.locale));

    return res.status(StatusCodes.OK).json({ trees: localizedTrees, total });
  } catch (error) {
    next(error);
  }
};

// Get All Featured Trees
export const getAllFeaturedTrees = async (req, res, next) => {
  try {
    const featuredTrees = await Tree.find({ isFeatured: true }).limit(4).lean();
    const localizedTrees = featuredTrees.map(tree => mapTree(tree, req.locale));

    return res.status(StatusCodes.OK).json({ featuredTrees: localizedTrees });
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
    const tree = await Tree.findById(id).lean();
    if (!tree) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Tree not found' });
    }

    return res.status(StatusCodes.OK).json({ tree: mapTree(tree, req.locale) });
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

    const trees = await Tree.find({ _id: { $in: ids } }).lean();
    const localizedTrees = trees.map(tree => mapTree(tree, req.locale));

    return res.status(StatusCodes.OK).json({ trees: localizedTrees });
  } catch (error) {
    next(error);
  }
};

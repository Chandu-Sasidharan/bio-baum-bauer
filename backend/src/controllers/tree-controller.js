import { StatusCodes } from 'http-status-codes';
import Tree from '#src/models/tree.js';

export const getAllTrees = async (req, res) => {
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getTreeById = async (req, res) => {
  try {
    const tree = await Tree.findById(req.params.id);
    if (!tree) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send('There is no tree with that id');
    }

    res.json(tree);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const searchByName = async (req, res) => {
  try {
    const searchParam = req.params.searchParam;
    const regex = new RegExp(searchParam, 'i'); // Case-insensitive and partial match
    const trees = await Tree.find({ name: regex });
    res.status(StatusCodes.OK).json(trees);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const addTree = async (req, res) => {
  const {
    category,
    treeName,
    treePrice,
    status,
    availableQuantity,
    description,
  } = req.body;
  const treeImage = req.file.path;

  try {
    const newTree = new Tree({
      name: treeName,
      category: category,
      price: treePrice,
      availableQuantity: availableQuantity,
      status: status,
      description: description,
      image: treeImage,
    });

    const savedTree = await newTree.save();
    res.status(StatusCodes.CREATED).json(savedTree);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const updateTree = async (req, res) => {
  try {
    const updatedTree = await Tree.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });

    if (!updatedTree) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no tree with that id' });
    }

    res.json(updatedTree);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const deleteTree = async (req, res) => {
  try {
    const deletedTree = await Tree.findByIdAndDelete(req.params.id);
    if (!deletedTree) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no tree with that id' });
    }

    res.json({ message: 'Tree deleted successfully' });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getTreesInCart = async (req, res) => {
  const { ids } = req.body;

  try {
    const trees = await Tree.find({ _id: { $in: ids } });

    res.status(StatusCodes.OK).json(trees);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// Get All Featured Trees
export const getAllFeaturedTrees = async (_req, res) => {
  try {
    const featuredTrees = await Tree.find({ isFeatured: true }).limit(4).lean();

    return res.status(StatusCodes.OK).json({ featuredTrees });
  } catch (error) {
    throw error;
  }
};

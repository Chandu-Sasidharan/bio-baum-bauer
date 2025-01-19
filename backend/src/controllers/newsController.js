import { StatusCodes } from 'http-status-codes';
import News from '../models/News.js';

//get list of news
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    return res.status(StatusCodes.OK).json(news);
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: error.toString() });
  }
};

//create news
export const addNews = async (req, res) => {
  try {
    const { newsDateCreated, newsWriter, newsTitle, newsDescription } =
      req.body;

    const newNews = await News.create({
      newsDateCreated,
      newsWriter,
      newsTitle,
      newsDescription,
    });

    return res.status(StatusCodes.OK).json(newNews);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.toString() });
  }
};

//update news

export const updateNews = async (req, res) => {
  const { newsId } = req.params;

  try {
    const updatedNews = await News.findOneAndUpdate(
      newsId,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedNews) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'News item not found' });
    }

    return res.json(updatedNews);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error', error: error.toString() });
  }
};

//delete news
export const deleteNews = async (req, res) => {
  try {
    const { newsId } = req.params;
    const deletedNews = await News.findOneAndDelete(newsId);
    if (!deletedNews) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'the news item was not found' });
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: 'the news item was deleted successfully ' });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error', error: error.toString() });
  }
};

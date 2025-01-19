import Faq from '../models/Faq.js';
import { StatusCodes } from 'http-status-codes';
/**
 * get all Faq
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAllFaq = async (req, res) => {
  // console.log("Query:",req.query);
  const limitValue = Number(req.query.limit);
  const skipValue = Number(req.query.skip);
  try {
    const allFaq = await Faq.find({})
      .limit(limitValue)
      .select('Question Answers')
      .skip(skipValue)
      .lean();
    const total = await Faq.find({}).count();
    return res.status(StatusCodes.OK).json({ data: allFaq, count: total });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

/**
 * creating a new farm into collection
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createFaq = async (req, res) => {
  try {
    const { Question, Answers } = req.body;

    const createFaq = await Faq.create({
      Question,
      Answers,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'FAQ created', createFaq });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};
/**
 * update faq
 */

export const updatefaq = async (req, res) => {
  try {
    const updatefaq = await Faq.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          Answers: req.body.Answers,
        },
      },
      { new: true }
    );
    return res
      .status(StatusCodes.OK)
      .json({ message: 'updated Answers', updatefaq });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};
/*
Delete Faq 
*/
export const deleteFaq = async (req, res) => {
  try {
    const deleteFaq = await Faq.findByIdAndDelete(req.params.id);
    return res.status(StatusCodes.OK).json({ message: 'deleted', deleteFaq });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

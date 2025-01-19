import Farm from '../models/Farm.js';
import { StatusCodes } from 'http-status-codes';

/**
 * get all farms
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAllfarms = async (req, res) => {
  try {
    const allfarms = await Farm.find();
    return res.status(StatusCodes.OK).json(allfarms);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

/**
 * creating a new farm into collection
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createFarm = async (req, res) => {
  try {
    const { farmName, ownerName, fieldType, GPScoordinates, contactInfo } =
      req.body;

    const createFarm = await Farm.create({
      farmName,
      ownerName,
      fieldType,
      GPScoordinates,
      contactInfo,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'Farm created', createFarm });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};
/**
 * update farm
 */

export const updateFarm = async (req, res) => {
  try {
    const updateFarm = await Farm.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          fieldType: req.body.fieldType,
        },
      },
      { new: true }
    );
    return res
      .status(StatusCodes.OK)
      .json({ message: 'updated fieldtype', updateFarm });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};
/*
Delete farm 
*/
export const deleteFarm = async (req, res) => {
  try {
    const deleteFarm = await Farm.findByIdAndDelete(req.params.id);
    return res.status(StatusCodes.OK).json({ message: 'deleted', deleteFarm });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

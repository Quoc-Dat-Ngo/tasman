import type { Response, Request, NextFunction } from "express";

import { newInstructor } from "../services/instructorsService";

const getAllInstructor = async () => {};
const createNewInstructor = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const instructor = await newInstructor(req.body);
    res.status(201).json({
      sucess: true,
      data: instructor,
    });
  } catch (e) {
    next(e);
  }
};
const getSingleInstructor = async () => {};
const updateInstructor = async () => {};
const deleteInstructor = async () => {};
const getAllInstructorCourse = async () => {};
const getInstructorDepartment = async () => {};

export {
  getAllInstructor,
  createNewInstructor,
  getSingleInstructor,
  updateInstructor,
  deleteInstructor,
  getAllInstructorCourse,
  getInstructorDepartment,
};

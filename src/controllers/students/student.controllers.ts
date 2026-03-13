import type { Request, Response } from "express";
import {
  createNewStudentService,
  deleteStudentService,
  getAllStudentService,
  getSingleStudentService,
  getStudentCourseService,
  getStudentMajorService,
  updateStudentService,
} from "../../services/students/student.services";
import type { ValidatedRequest } from "../../middlewares/validator";
import type {
  CreateStudentSchema,
  StudentQuerySchema,
  UpdateStudentSchema,
} from "../../schema/student.schemas";
import type { ParamsSchema } from "../../schema/common.schemas";

type GetAllStudentRequest = ValidatedRequest<
  undefined,
  undefined,
  typeof StudentQuerySchema
>;
type CreateStudentRequest = ValidatedRequest<typeof CreateStudentSchema>;
type UpdateStudentRequest = ValidatedRequest<
  typeof UpdateStudentSchema,
  typeof ParamsSchema
>;
type GetSingleStudentRequest = ValidatedRequest<undefined, typeof ParamsSchema>;
type DeleteStudentRequest = ValidatedRequest<undefined, typeof ParamsSchema>;
type GetStudentCourseRequest = ValidatedRequest<undefined, typeof ParamsSchema>;
type GetStudentMajorRequest = ValidatedRequest<undefined, typeof ParamsSchema>;

const getAllStudentController = async (req: Request, res: Response) => {
  const { query } = (req as GetAllStudentRequest).validated;

  const data = await getAllStudentService(query);
  res.status(200).json({
    success: true,
    data,
  });
};
const createNewStudentController = async (req: Request, res: Response) => {
  const { body } = (req as CreateStudentRequest).validated;

  const data = await createNewStudentService(body);
  res.status(201).json({
    success: true,
    data,
  });
};
const getSingleStudentController = async (req: Request, res: Response) => {
  const { params } = (req as GetSingleStudentRequest).validated;

  const data = await getSingleStudentService(params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const updateStudentController = async (req: Request, res: Response) => {
  const { body, params } = (req as UpdateStudentRequest).validated;

  const data = await updateStudentService(params.id, body);
  res.status(200).json({
    success: true,
    data,
  });
};
const deleteStudentController = async (req: Request, res: Response) => {
  const { params } = (req as DeleteStudentRequest).validated;
  const data = await deleteStudentService(params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const getStudentCourseController = async (req: Request, res: Response) => {
  const { params } = (req as GetStudentCourseRequest).validated;
  const data = await getStudentCourseService(params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const getStudentMajorController = async (req: Request, res: Response) => {
  const { params } = (req as GetStudentMajorRequest).validated;
  const data = await getStudentMajorService(params.id);
  res.status(200).json({
    success: true,
    data,
  });
};

export {
  getAllStudentController,
  createNewStudentController,
  getSingleStudentController,
  updateStudentController,
  deleteStudentController,
  getStudentCourseController,
  getStudentMajorController,
};

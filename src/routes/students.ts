import express from 'express';
import type { Router } from 'express';
export const studentsRouter: Router = express.Router();

import {
  getAllStudent,
  createNewStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  getAllStudentCourse,
  getAllStudentMajor,
} from '../controllers/studentsController';

studentsRouter.route('/').get(getAllStudent).post(createNewStudent);
studentsRouter
  .route('/:id')
  .get(getSingleStudent)
  .patch(updateStudent)
  .delete(deleteStudent);
studentsRouter.route('/:id/courses').get(getAllStudentCourse);
studentsRouter.route('/:id/majors').get(getAllStudentMajor);

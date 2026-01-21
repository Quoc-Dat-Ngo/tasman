import express from 'express';
import type { Router } from 'express';
export const coursesRouter: Router = express.Router();

import {
  getAllCourse,
  createNewCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getAllCourseStudent,
  getAllCourseMajor,
  getAllCourseInstructor,
  getCourseDepartment,
} from '../controllers/coursesController';

coursesRouter.route('/').get(getAllCourse).post(createNewCourse);
coursesRouter
  .route('/:id')
  .get(getSingleCourse)
  .patch(updateCourse)
  .delete(deleteCourse);
coursesRouter.route('/:id/students').get(getAllCourseStudent);
coursesRouter.route('/:id/instructors').get(getAllCourseInstructor);
coursesRouter.route('/:id/majors').get(getAllCourseMajor);
coursesRouter.route('/:id/department').get(getCourseDepartment);

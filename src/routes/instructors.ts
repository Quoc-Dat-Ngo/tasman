import express from 'express';
import type { Router } from 'express';
export const instructorsRouter: Router = express.Router();

import {
  getAllInstructor,
  getSingleInstructor,
  updateInstructor,
  deleteInstructor,
  getAllInstructorMajor,
  getInstructorDepartment,
} from '../controllers/instructorsController';

instructorsRouter.route('/').get(getAllInstructor).post(getAllInstructor);
instructorsRouter
  .route('/:id')
  .get(getSingleInstructor)
  .patch(updateInstructor)
  .delete(deleteInstructor);
instructorsRouter.route('/:id/majors').get(getAllInstructorMajor);
instructorsRouter.route('/:id/department').get(getInstructorDepartment);

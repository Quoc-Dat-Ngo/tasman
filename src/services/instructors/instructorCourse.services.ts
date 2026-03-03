import { assertFound } from "../../errors/assertFound";
import type {
  CreateInstructorCourseDTO,
  ExpressParamID,
} from "../../types/index.types";
import { parseParamID } from "../../http/parseParamID";
import { PoolInstructorCourseRepo } from "../../repositories/instructors/instructorCourse.repositories";

const repo = new PoolInstructorCourseRepo();

async function registerCourseService(data: CreateInstructorCourseDTO) {
  const { course_id, instructor_id } = data;
  return assertFound(
    await repo.register(course_id, instructor_id),
    `Course with id ${course_id} and/or instructor with id ${instructor_id} not found`,
  );
}

async function removeRegisterCourseService(id: ExpressParamID) {
  const instructorCourseID = parseParamID(id);

  return assertFound(
    await repo.delete(instructorCourseID),
    `Course register for instructing with id ${instructorCourseID} not found`,
  );
}

export { registerCourseService, removeRegisterCourseService };

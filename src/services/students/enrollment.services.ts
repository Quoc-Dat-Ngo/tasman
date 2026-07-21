import { PoolEnrollmentRepo } from "../../repositories/students/enrollment.repositories.js";
import { parseParamID } from "../../http/parseParamID.js";
import type {
  CreateEnrollmentDTO,
  ExpressParamID,
} from "../../types/index.types.js";
import { assertFound } from "../../errors/assertFound.js";

const repo = new PoolEnrollmentRepo();

async function enrollCourseService(data: CreateEnrollmentDTO) {
  const { student_id, course_id } = data;
  return assertFound(
    await repo.enroll(student_id, course_id),
    `Student with id ${student_id} and/or course with id ${course_id} not found`,
  );
}

async function removeEnrollCourseService(id: ExpressParamID) {
  const enrollmentID = parseParamID(id);

  return assertFound(
    await repo.delete(enrollmentID),
    `Enrollment with id ${enrollmentID} not found`,
  );
}

export { enrollCourseService, removeEnrollCourseService };

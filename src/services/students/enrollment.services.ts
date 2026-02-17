import { PoolEnrollmentRepo } from "../../repositories/students/enrollment.repositories";
import { parseParamID } from "../../http/parseParamID";
import type { CreateEnrollmentDTO, ExpressParamID } from "../../types";
import { assertFound } from "../../errors/assertFound";

const repo = new PoolEnrollmentRepo();

function enrollCourseService(id: ExpressParamID, data: CreateEnrollmentDTO) {
  const student_id = parseParamID(id);
  const { course_id } = data;
  return assertFound(
    repo.enroll(student_id, course_id),
    `Student with id ${student_id} and/or course with id ${course_id} not found`,
  );
}

export { enrollCourseService };

import { parseParamID } from "../../http/parseParamID";
import type { CreateStudentMajorDTO, ExpressParamID } from "../../types";
import { assertFound } from "../../errors/assertFound";
import { PoolStudentMajorRepo } from "../../repositories/students/studentMajor.repositories";

const repo = new PoolStudentMajorRepo();

function registerMajorService(id: ExpressParamID, data: CreateStudentMajorDTO) {
  const student_id = parseParamID(id);
  const { major_id } = data;
  return assertFound(
    repo.register(student_id, major_id),
    `Student with id ${student_id} and/or major with id ${major_id} not found`,
  );
}

export { registerMajorService };

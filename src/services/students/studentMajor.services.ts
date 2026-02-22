import { parseParamID } from "../../http/parseParamID";
import type {
  CreateStudentMajorDTO,
  ExpressParamID,
} from "../../types/index.types";
import { assertFound } from "../../errors/assertFound";
import { PoolStudentMajorRepo } from "../../repositories/students/studentMajor.repositories";

const repo = new PoolStudentMajorRepo();

async function registerMajorService(data: CreateStudentMajorDTO) {
  const { student_id, major_id } = data;
  return assertFound(
    await repo.register(student_id, major_id),
    `Student with id ${student_id} and/or major with id ${major_id} not found`,
  );
}

async function removeRegisterMajorService(id: ExpressParamID) {
  const registerMajorID = parseParamID(id);

  return assertFound(
    await repo.delete(registerMajorID),
    `Register Major with id ${registerMajorID} not found`,
  );
}

export { registerMajorService, removeRegisterMajorService };

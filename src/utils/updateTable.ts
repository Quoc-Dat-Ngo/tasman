import type { UpdateStudentDTO } from "../types";

interface updateTableReturnType {
  fields: string[];
  values: (string | Date | string[] | undefined)[];
  index: number;
}

export const updateTable = (
  body: UpdateStudentDTO,
  id: string | string[] | undefined,
): updateTableReturnType => {
  const fields: string[] = [];
  const values: (string | Date | string[] | undefined)[] = [];
  let index: number = 1;

  if (body.first_name !== undefined) {
    fields.push(`first_name = $${index++}`);
    values.push(body.first_name);
  }
  if (body.last_name !== undefined) {
    fields.push(`last_name = $${index++}`);
    values.push(body.last_name);
  }
  if (body.dob !== undefined) {
    fields.push(`dob = $${index++}`);
    values.push(body.dob);
  }
  if (body.gender !== undefined) {
    fields.push(`gender = $${index++}`);
    values.push(body.gender);
  }

  values.push(id);

  return { fields, values, index };
};

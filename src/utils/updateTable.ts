import type { UpdateCourseDTO, UpdateStudentDTO } from "../types";

interface updateStudentTableReturnType {
  fields: string[];
  values: (string | Date | string[] | undefined)[];
  index: number;
}

interface updateCourseTableReturnType {
  fields: string[];
  values: (string | number | string[] | undefined)[];
  index: number;
}

export const updateStudentTable = (
  body: UpdateStudentDTO,
  id: string | string[] | undefined,
): updateStudentTableReturnType => {
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

export const updateCourseTable = (
  body: UpdateCourseDTO,
  id: string | string[] | undefined,
): updateCourseTableReturnType => {
  const fields: string[] = [];
  const values: (string | number | string[] | undefined)[] = [];
  let index: number = 1;

  if (body.course_title !== undefined) {
    fields.push(`course_title = $${index++}`);
    values.push(body.course_title);
  }
  if (body.course_code !== undefined) {
    fields.push(`course_code = $${index++}`);
    values.push(body.course_code);
  }
  if (body.fee !== undefined) {
    fields.push(`fee = $${index++}`);
    values.push(body.fee);
  }
  if (body.department_id !== undefined) {
    fields.push(`department_id = $${index++}`);
    values.push(body.department_id);
  }

  values.push(id);

  return { fields, values, index };
};

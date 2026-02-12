export function updateQueryBuilder<T extends object>(
  body: T,
  allowedFields: (keyof T)[],
  id: string,
) {
  const fields: string[] = [];
  const values: unknown[] = [];
  let index = 1;

  for (const key of allowedFields) {
    const value = body[key];

    if (value !== undefined) {
      fields.push(`${String(key)} = $${index++}`);
      values.push(value);
    }
  }

  values.push(id);

  const setString = fields.length ? `${fields.join(", ")}` : "";

  return { setString, values };
}

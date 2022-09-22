import { z, ZodRawShape } from "zod";

export function filterEmptyFields<TFormData extends ZodRawShape>(formData: Object, zodSchema: z.ZodObject<TFormData>) {
  const filteredArray = Object.entries(formData).filter(
    (entry) => entry[1] !== "" && entry[1] !== null
  );
  const filteredData = Object.fromEntries(filteredArray);
  return zodSchema.parse(filteredData);
}
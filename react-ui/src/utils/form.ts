import { z, ZodRawShape } from "zod";

export const filterEmptyFields = <TZodSchema extends ZodRawShape>(
  formData: Object,
  zodSchema: z.ZodObject<TZodSchema>
) => {
  const filteredArray = Object.entries(formData).filter(
    (entry) => entry[1] !== "" && entry[1] !== null
  );
  const filteredData = Object.fromEntries(filteredArray);
  return zodSchema.parse(filteredData);
};

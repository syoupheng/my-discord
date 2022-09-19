import { RegisterInput, registerSchema } from "./types/auth";

export const filterEmptyFields = (formData: RegisterInput) => {
  const filteredArray = Object.entries(formData).filter(
    (entry) => entry[1] !== "" && entry[1] !== null
  );
  const filteredData = Object.fromEntries(filteredArray);
  return registerSchema.parse(filteredData);
}
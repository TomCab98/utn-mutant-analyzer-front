import type { PersonFormData } from "../types/PersonFormData";
import type { StringRecord } from "../types/StringRecord";

export const validateForm = (
  data: PersonFormData
): StringRecord<PersonFormData> => {
  const errors: StringRecord<PersonFormData> = {};
  if (!data.name.trim()) {
    errors.name = "El nombre es obligatorio.";
  }
  if (!data.lastName.trim()) {
    errors.lastName = "El apellido es obligatorio.";
  }
  if (data.adn.length === 0 || data.adn.some((row) => row.length !== 6)) {
    errors.adn = "El ADN es obligatorio.";
  }

  return errors;
};

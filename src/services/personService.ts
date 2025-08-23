import type { PersonEntity } from "../types/entities/PersonEntity";
import type { Person } from "../types/Person";
import type { PersonFormData } from "../types/PersonFormData";
import { apiFetch } from "../utils/apiFetch";
import { toPerson, toPersonEntity } from "./personMapper";

export const getAllPersons = async (): Promise<Person[]> => {
  const data = await apiFetch<PersonEntity[]>("/persons");
  return data.map(toPerson);
};

export const getPersonById = async (id: string): Promise<Person> => {
  const entity = await apiFetch<PersonEntity>(`/persons/${id}`);
  return toPerson(entity);
};

export const createPerson = async (data: PersonFormData): Promise<Person> => {
  const developmentData: Partial<Person> = {};
  if (import.meta.env.MODE === "development") {
    developmentData.id = crypto.randomUUID();
    developmentData.isMutant = Math.random() < 0.5;
  }

  const entity = await apiFetch<PersonEntity>("/persons", {
    method: "POST",
    body: JSON.stringify(
      toPersonEntity({ ...data, ...developmentData } as Person)
    ),
  });
  return toPerson(entity);
};

export const updatePerson = async (
  id: string,
  data: Omit<Person, "id">
): Promise<Person> => {
  const entity = await apiFetch<PersonEntity>(`/persons/${id}`, {
    method: "PUT",
    body: JSON.stringify(toPersonEntity({ ...data, id } as Person)),
  });
  return toPerson(entity);
};

export const deletePerson = async (id: string): Promise<void> => {
  return apiFetch<void>(`/persons/${id}`, { method: "DELETE" });
};

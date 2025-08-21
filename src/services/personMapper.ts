import type { PersonEntity } from "../types/entities/PersonEntity";
import type { Person } from "../types/Person";

export const toPerson = (entity: PersonEntity): Person => {
  return {
    id: entity.id,
    name: entity.nombre,
    lastName: entity.apellido,
    adn: entity.adn,
    isMutant: entity.esMutante,
  };
};

export const toPersonEntity = (person: Person): PersonEntity => {
  return {
    id: person.id,
    nombre: person.name,
    apellido: person.lastName,
    adn: person.adn,
    esMutante: person.isMutant,
  };
};

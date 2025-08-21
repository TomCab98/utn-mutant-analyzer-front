# React Project - Mutant analizer

This project is a web application built with **React + TypeScript** that consumes a people management backend (basic CRUD + additional endpoints such as "mutant" verification via DNA).
It is currently under development and uses **JSON Server** as a simulated API for local testing

## Main technologies

- **React + TypeScript** → Main library for building the UI.
- **Vite** → Fast and modern build tool.
- **React Router v6** → Page routing management.
- **Tailwind CSS** → Utility framework for styles.
- **JSON Server** → REST API simulation with persistence in JSON files.

## Run

1. Execute server

```bash
npm run server
```

This open de json server in the **3001** port

2. Run project

```bash
npm run dev
```

This starts the project, and you can view it at http://localhost:5173.

## 📂 Folder architecture

The project is organized according to a clear, modular structure:

```
src/
 ├── assets/
 ├── components/
 │     ├── Button.tsx
 │     └── * Components .. *
 ├── hooks/
 ├── pages/
 │     ├── home/
 │     │    ├── HomePage.tsx
 │     │    ├── PersonCard.tsx
 │     │    └── * Home components ... *
 │     └── form/
 ├── services/
 │     ├── personService.ts
 │     └── * Services ... *
 ├── utils/
 │     ├── apiFetch.ts
 │     └── * Utils ... *
 ├── hooks/
 ├── App.tsx
 └── App.css
```

---

## 📌 Nomenclature used

- **Folders:**
  - They are named in **lowercase** (`pages`, `components`, `hooks`).
  - Subfolders for each page (`home/`) contain all the components specific to that page.
- **Files:**

  - **Components**: `PascalCase` (`HomePage.tsx`, `PersonCard.tsx`, `SearchBar.tsx`).
  - **Services**: `camelCase` (`personService.ts`, `personMapper.ts`).
  - **Types/Models**: `PascalCase` (`Person.ts`, `PersonEntity.ts`).
  - **Utilities**: `camelCase` (`dateUtils.ts`).

- **Reusable components** → inside `components/` (e.g., `Button`, `ConfirmModal`).
- **Page-specific components** → inside the page folder (e.g., `PersonCard` in `pages/home`).

---

## 🌐 Routing

Routing is handled with **React Router v6** and currently includes:

- `/` → **HomePage**: list of people (card grid, search, CRUD actions).
- `/form` → **Form** to create a person (to be implemented).
- `/form/:id` → **Form** to edit person (to be implemented).

Configuration example (`App.tsx`):

```tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/form" element={<PersonFormPage />} />
  <Route path="/persons" element={<Navigate to="/" />} />
</Routes>
```

---

## 🛠️ Services and Mappers

The frontend works with two different models:

Model exposed by the API (PersonEntity):

```ts
export interface PersonEntity {
  id: string;
  nombre: string;
  apellido: string;
  adn: string;
  esMutante: boolean;
}
```

Model used in the frontend (Person):

```ts
export interface Person {
  id: string;
  name: string;
  lastName: string;
  adn: string;
  isMutant: boolean;
}
```

Mapper (personMapper.ts)

Responsible for transforming between PersonEntity ↔ Person.

```ts
export const personMapper = {
  toDomain(entity: PersonEntity): Person { ... },
  toEntity(domain: Person): PersonEntity { ... }
};
```

This decouples the UI from the specific format of the API.

---

## 🌍 Environments

The project differentiates environments using .env files:

.env.development

```
VITE_API_URL=http://localhost:3000
```

.env.production

```
VITE_API_URL=https://backend.com
```

In the code, it is accessed via:

```ts
const BASE_URL = import.meta.env.VITE_API_URL;
```

---

## 📦 API simulation with JSON Server

JSON Server is used to mock the API under development.

Installation

```bash
npm install -g json-server
```

Execution

```bash
json-server --watch db.json --port 3000
```

Example of db.json:

```json
{
  "persons": [
    {
      "id": "1",
      "firstName": "Juan",
      "lastName": "Pérez",
      "adn": "ATGCGA",
      "isMutant": false
    }
    // More
  ]
}
```

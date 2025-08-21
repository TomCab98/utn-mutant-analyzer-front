import type React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PersonFormPage from "../pages/form/PersonFormPage";
import HomePage from "../pages/home/HomePage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/form" element={<PersonFormPage />} />
      <Route path="/persons" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

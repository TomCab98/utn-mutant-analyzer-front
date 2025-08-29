import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PersonFormData } from "../../types/PersonFormData";
import { createPerson } from "../../services/personService";
import { validateForm } from "../../services/personFormValidator";
import type { StringRecord } from "../../types/StringRecord";
import AdnInput from "../../components/adn-input/AdnInput";
import Button from "../../components/button/Button";

const initialFormData: PersonFormData = {
  name: "",
  lastName: "",
  adn: [],
};
const MATRIX_SIZE = 6;

const PersonFormPage = () => {
  const [formData, setFormData] = useState<PersonFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<StringRecord<PersonFormData>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdnChange = (adnArray: string[]) => {
    setFormData((prev) => ({ ...prev, adn: adnArray }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const errors: StringRecord<PersonFormData> = validateForm(formData);
    if (Object.keys(errors).length !== 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    createPerson(formData)
      .then(() => {
        alert("¡Persona creada con éxito!");
        navigate("/");
      })
      .catch(() => {
        alert("Ocurrió un error al crear la persona.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 sm:p-10 relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-8">
          Agregar Persona
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition shadow-sm ${
                  formErrors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-semibold mb-2"
              >
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition shadow-sm ${
                  formErrors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6 grid place-items-center">
            <label className="block text-gray-700 font-semibold mb-2">
              ADN
            </label>
            <AdnInput
              rows={MATRIX_SIZE}
              cols={MATRIX_SIZE}
              onChange={handleAdnChange}
              initialMatrix={
                formData.adn.length > 0
                  ? formData.adn.map((row) => row.split(""))
                  : undefined
              }
            />
            {formErrors.adn && (
              <p className="text-red-500 text-sm mt-2">{formErrors.adn}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar Persona"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonFormPage;

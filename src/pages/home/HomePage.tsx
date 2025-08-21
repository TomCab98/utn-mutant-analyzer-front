import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import PersonCard from "./PersonCard";
import ConfirmModal from "./ConfirmModal";
import type { Person } from "../../types/Person";
import { deletePerson, getAllPersons } from "../../services/personService";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [personToDelete, setPersonToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPersons();
        setPersons(data);
      } catch (err) {
        setError("Ocurrió un error al cargar los datos.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdd = () => {
    navigate("/form");
  };

  const handleEdit = (id: string) => {
    navigate(`/form/${id}`);
  };

  const handleDelete = (id: string) => {
    setPersonToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (personToDelete) {
      deletePerson(personToDelete);
      setShowModal(false);
      setPersonToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setPersonToDelete(null);
  };

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-0">
            Personas Mutantes
          </h1>
          <SearchBar
            search={search}
            onSearchChange={setSearch}
            onAddClick={handleAdd}
          />
        </header>

        {isLoading && (
          <div className="flex justify-center items-center h-64 text-gray-500 text-xl font-medium">
            Cargando datos... ⏳
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-64 text-red-500 text-xl font-medium">
            {error}
          </div>
        )}

        {!isLoading && !error && filteredPersons.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No se encontraron personas.</p>
            <p className="mt-2 text-sm">
              Prueba a ajustar la búsqueda o agrega una nueva persona.
            </p>
          </div>
        )}

        {!isLoading && !error && filteredPersons.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPersons.map((p) => (
              <PersonCard
                key={p.id}
                person={p}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={showModal}
        message="¿Estás seguro de que quieres eliminar esta persona?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default HomePage;

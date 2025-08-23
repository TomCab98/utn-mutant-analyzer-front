import Button from "../../components/button/Button";
import type { Person } from "../../types/Person";

interface PersonCardProps {
  person: Person;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const PersonCard = ({ person, onEdit, onDelete }: PersonCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 truncate">
          {`${person.name} ${person.lastName}`}
        </h3>
        <div
          className={`p-2 rounded-full font-bold text-xs ${
            person.isMutant
              ? "bg-red-200 text-red-800"
              : "bg-purple-200 text-purple-600"
          }`}
        >
          {person.isMutant ? "Mutante" : "Humano"}
        </div>
      </div>
      <div className="space-y-2 text-gray-600">
        <p className="flex flex-col items-center justify-center w-full">
          <span className="font-semibold text-gray-800 mr-2">ADN:</span>
          <div className="mt-2 mb-4">
            <table className="border border-gray-300 rounded-lg">
              <tbody>
                {person.adn.map((row: string, rowIdx: number) => (
                  <tr key={rowIdx}>
                    {row.split("").map((char, colIdx) => (
                      <td
                        key={colIdx}
                        className="border px-2 text-center font-sans font-semibold text-lg "
                      >
                        {char}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200 flex justify-center gap-2">
        <Button
          onClick={() => onEdit(person.id)}
          className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 text-sm"
        >
          ✏️ Editar
        </Button>
        <Button
          onClick={() => onDelete(person.id)}
          className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 text-sm"
        >
          🗑️ Eliminar
        </Button>
      </div>
    </div>
  );
};

export default PersonCard;

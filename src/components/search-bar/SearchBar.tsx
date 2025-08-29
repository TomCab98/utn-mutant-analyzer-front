import Button from "../../components/button/Button";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

const SearchBar = ({ search, onSearchChange, onAddClick }: SearchBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full sm:w-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
      />
      <Button
        onClick={onAddClick}
        className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
      >
        <span className="hidden sm:inline">Agregar Persona</span>
        <span className="sm:hidden">+</span>
      </Button>
    </div>
  );
};

export default SearchBar;

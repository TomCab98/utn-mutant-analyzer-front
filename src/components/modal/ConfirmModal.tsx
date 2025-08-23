import Button from "../../components/button/Button";

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className="text-lg font-semibold text-center mb-4">{message}</p>
        <div className="flex justify-between gap-4">
          <Button
            onClick={onCancel}
            className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="w-full bg-red-600 text-white hover:bg-red-700"
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

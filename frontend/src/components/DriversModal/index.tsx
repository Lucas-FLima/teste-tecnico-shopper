import { DriverOptions, TravelResponse } from "../../types";
import Modal from "../Modal";

type DriversModalProps = {
    travelData: TravelResponse | null;
    handleCloseModal: () => void;
    handleConfirmDriver: (option: DriverOptions) => void;
};

export default function DriversModal({ travelData, handleCloseModal, handleConfirmDriver }: DriversModalProps) {
    return (
      <Modal>
        <h2 className="text-lg font-bold mb-4 ml-6">Motoristas Disponíveis</h2>
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-300">
          {travelData?.options?.map((option: DriverOptions) => (
            <div key={option.id} className="mb-4 flex flex-col gap-1 px-6">
              <strong>Nome:</strong> {option.name}
              <br />
              <strong>Descrição:</strong> {option.description}
              <br />
              <strong>Veículo:</strong> {option.vehicle}
              <br />
              <strong>Avaliação:</strong> {option.review.rating}
              <br />
              <strong>Valor:</strong> {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(option.value)}
              <button onClick={() => handleConfirmDriver(option)} className="bg-green-500 shadow-xl px-4 py-2 rounded-md text-primary font-semibold">
                Escolher {option.name}
              </button>
            </div>
          ))}
        </div>
        <button onClick={handleCloseModal} className="bg-red-500 text-white font-semibold p-2 rounded-lg mt-4 ml-6">
          Fechar
        </button>
      </Modal>
    );
  }
  
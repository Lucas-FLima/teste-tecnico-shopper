import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { TravelFormInputs } from "../../types";
import Card from "../Card";
import LoadingSpinner from "../LoadingSpinner";

interface TravelFormProps {
  onSubmit: (data: TravelFormInputs) => void;
  register: UseFormRegister<TravelFormInputs>;
  errors: FieldErrors<TravelFormInputs>;
  loading: boolean;
  handleSubmit: UseFormHandleSubmit<TravelFormInputs>;
}

export default function TravelForm({
  onSubmit,
  register,
  errors,
  loading,
  handleSubmit
}: TravelFormProps) {
  return (
    <Card
      titulo="Solicitação de viagem"
      descricao="Insira uma origem e um destino abaixo"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-2">
            <label htmlFor="idUser" className="font-semibold text-lg">
              ID do Usuário
            </label>
            <input
              type="text"
              id="idUser"
              {...register("idUser", {
                required: "Id do usuário é obrigatório",
              })}
              className="p-2 border border-gray-300 rounded-lg"
            />
            {errors.idUser && (
              <span className="text-red-500 text-sm">
                {errors.idUser.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="origem" className="font-semibold text-lg">
              Origem
            </label>
            <input
              type="text"
              id="origem"
              {...register("origin", { required: "Origem é obrigatória" })}
              className="p-2 border border-gray-300 rounded-lg"
            />
            {errors.origin && (
              <span className="text-red-500 text-sm">
                {errors.origin.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="destino" className="font-semibold text-lg">
              Destino
            </label>
            <input
              type="text"
              id="destino"
              {...register("destination", {
                required: "Destino é obrigatória",
              })}
              className="p-2 border border-gray-300 rounded-lg"
            />
            {errors.destination && (
              <span className="text-red-500 text-sm">
                {errors.destination.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-green_shooper text-white font-semibold py-2 rounded-lg"
          >
            Solicitar viagem
          </button>
        </div>
      </form>
      {loading && <LoadingSpinner />}
    </Card>
  );
}

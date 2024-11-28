import { useState } from "react";

type Ride = {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
};

type DriverOptionsRides = {
  id: number;
  name: string;
};

type RidesListProps = {
  rides: Ride[];
  drivers: DriverOptionsRides[];
  onFilter: (customerId: string, driverId?: number) => void;
  handleNewSearch: () => void;
};

export default function RidesList({
  rides,
  drivers,
  onFilter,
  handleNewSearch,
}: RidesListProps) {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string>("");

  const handleFilter = () => {
    if (customerId) {
      onFilter(customerId, selectedDriver ? Number(selectedDriver) : undefined);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <button
          onClick={handleNewSearch}
          className="bg-header text-white font-semibold py-2 rounded-lg mt-4"
        >
          Fazer nova busca
        </button>
        <label htmlFor="customerId" className="font-semibold text-lg">
          ID do Usuário
        </label>
        <input
          type="text"
          id="customerId"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="driverSelect" className="font-semibold text-lg">
          Motorista
        </label>
        <select
          id="driverSelect"
          value={selectedDriver || ""}
          onChange={(e) => setSelectedDriver(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Todos os motoristas</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleFilter}
        className="bg-green_shooper text-white font-semibold py-2 rounded-lg mt-4"
      >
        Aplicar Filtro
      </button>

      {rides.length === 0 ? (
        <p>Nenhuma viagem encontrada</p>
      ) : (
        <div className="space-y-4 mt-4">
          {rides.map((ride) => (
            <div
              key={ride.id}
              className="p-4 border border-gray-300 rounded-lg"
            >
              <div>
                <strong>Data e Hora:</strong>{" "}
                {new Date(ride.date).toLocaleString()}
              </div>
              <div>
                <strong>Motorista:</strong> {ride.driver.name}
              </div>
              <div>
                <strong>Origem:</strong> {ride.origin}
              </div>
              <div>
                <strong>Destino:</strong> {ride.destination}
              </div>
              <div>
                <strong>Distância:</strong> {ride.distance} metros
              </div>
              <div>
                <strong>Tempo:</strong> {ride.duration}
              </div>
              <div>
                <strong>Valor:</strong> R$ {ride.value.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

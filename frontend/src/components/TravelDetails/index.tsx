import { TravelResponse } from "../../types";
import Card from "../Card";
import Map from "../Map";

type TravelDetailsProps = {
  travelData: TravelResponse;
  handleNewSearch: () => void;
  handleShowModal: () => void;
};

export default function TravelDetails({
  travelData,
  handleNewSearch,
  handleShowModal,
}: TravelDetailsProps) {
  return (
    <Card titulo="Detalhes da Viagem" descricao="Veja os detalhes abaixo">
      <div className="flex flex-col mt-2">
        <div>
          <strong>Distância:</strong> {travelData.distance} metros
        </div>
        <div>
          <strong>Duração Estimada:</strong> {travelData.duration}
        </div>
        <button
          onClick={handleNewSearch}
          className="bg-header text-white font-semibold py-2 rounded-lg mt-4"
        >
          Fazer nova busca
        </button>
        <button
          onClick={handleShowModal}
          className="bg-green_shooper text-white font-semibold py-2 rounded-lg mt-4"
        >
          Ver motoristas disponíveis
        </button>
      </div>
      <div className="w-full h-full mt-4">
        <Map
          origin={{
            latitude: travelData.origin.latitude,
            longitude: travelData.origin.longitude,
          }}
          destination={{
            latitude: travelData.destination.latitude,
            longitude: travelData.destination.longitude,
          }}
          polyline={travelData.routeResponse.routes[0].polyline.encodedPolyline}
        />
      </div>
    </Card>
  );
}

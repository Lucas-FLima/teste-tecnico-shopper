import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DriversModal from "./components/DriversModal";
import Header from "./components/Header";
import RidesList from "./components/RidesList";
import TravelDetails from "./components/TravelDetails";
import TravelForm from "./components/TravelForm";
import {
  DriverOptions,
  Ride,
  RideResponse,
  TravelFormInputs,
  TravelResponse,
} from "./types";

declare global {
  interface Window {
    google: typeof google;
  }
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TravelFormInputs>();

  const [searchData, setSearchData] = useState<{
    customer_id: string;
    origin: string;
    destination: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [rides, setRides] = useState<Ride[]>([]);
  const [drivers, setDrivers] = useState<DriverOptions[]>([]);

  const [stage, setStage] = useState(0);
  const [travelData, setTravelData] = useState<TravelResponse | null>(null);
  const [showModal, setShowModal] = useState(false);

  const onSubmit: SubmitHandler<TravelFormInputs> = async (data) => {
    setLoading(true);
    setTravelData(null);

    try {
      const response = await axios.post<TravelResponse>(
        "http://localhost:8080/ride/estimate",
        {
          customer_id: data.idUser,
          origin: data.origin,
          destination: data.destination,
        }
      );
      const dados = response.data;
      setTravelData(dados);
      setStage(1);
      setSearchData({
        customer_id: data.idUser,
        origin: data.origin,
        destination: data.destination,
      });
      reset();
    } catch (err: any) {
      alert(
        err.response?.data?.description ||
          "Erro ao buscar viagens, tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = () => {
    setTravelData(null);
    setSearchData(null);
    setStage(0);
    reset();
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDriver = async (driver: DriverOptions) => {
    setLoading(true);
    try {
      const response = await axios.patch("http://localhost:8080/ride/confirm", {
        customer_id: searchData?.customer_id,
        origin: searchData?.origin,
        destination: searchData?.destination,
        distance: travelData?.distance,
        duration: travelData?.duration,
        driver: {
          id: driver.id,
          name: driver.name,
        },
        value: driver.value,
      });
      if (response.status === 200) {
        alert("Motorista confirmado com sucesso!");
        handleCloseModal();

        await fetchRides(searchData?.customer_id || "");
      }
    } catch (err: any) {
      alert(
        err.response?.data?.description ||
          "Erro ao confirmar motorista, tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchRides = async (customerId: string, driverId?: number) => {
    try {
      let url = `http://localhost:8080/ride/${customerId}`;
      if (driverId) {
        url += `?driver_id=${driverId}`;
      }

      const response = await axios.get<RideResponse[]>(url);
      if (response.status === 200) {
        const fetchedRides = response.data.flatMap((item) => item.rides);
        setRides(fetchedRides);

        const allDrivers = fetchedRides.map((ride) => ride.driver);
        const uniqueDrivers = [
          ...new Map(allDrivers.map((item) => [item.id, item])).values(),
        ];
        setDrivers(
          uniqueDrivers.map((driver) => ({
            id: driver.id,
            name: driver.name,
            description: "Descrição padrão",
            vehicle: "Veículo padrão",
            review: {
              rating: "0/5",
              comment: "Comentário padrão",
            },
            value: 0,
          }))
        );

        setStage(3);
      }
    } catch (err: any) {
      alert(
        err.response?.data?.description ||
          "Erro ao buscar viagens, tente novamente mais tarde."
      );
    }
  };

  return (
    <>
      <Header />
      <main className="flex justify-center items-center mt-10">
        <div className="max-w-[1200px]">
          {stage === 0 && (
            <TravelForm
              onSubmit={onSubmit}
              register={register}
              errors={errors}
              loading={loading}
              handleSubmit={handleSubmit}
            />
          )}
          {stage === 1 && travelData && (
            <TravelDetails
              travelData={travelData}
              handleNewSearch={handleNewSearch}
              handleShowModal={handleShowModal}
            />
          )}
        </div>
        {stage === 3 && rides.length > 0 && (
          <RidesList
            rides={rides}
            drivers={drivers}
            onFilter={fetchRides}
            handleNewSearch={handleNewSearch}
          />
        )}
      </main>
      {showModal && (
        <DriversModal
          travelData={travelData}
          handleCloseModal={handleCloseModal}
          handleConfirmDriver={handleConfirmDriver}
        />
      )}
    </>
  );
}

export default App;

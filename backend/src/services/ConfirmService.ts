import { validDistance } from "../helpers/validDistance";
import { GetDriverRepository } from "../repositories/GetDriverRepository";
import { SaveTravelRepository } from "../repositories/SaveTravelRepository";
import AppError from "../utils/errors/AppError";

interface IData {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

class ConfirmService {
  async execute(data: IData) {
    let {
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    } = data;

    const getDriverRepository = new GetDriverRepository();
    const driverUser = await getDriverRepository.getDriver(driver.id);

    if (!driverUser) {
      throw new AppError("DRIVER_NOT_FOUND", "Motorista não encontrado.", 404);
    }

    const mostoristas = validDistance({ driverUser, distance });
    if (!mostoristas) {
      throw new AppError(
        "INVALID_DISTANCE",
        "Quilometragem inválida para o motorista.",
        406
      );
    }

    const saveTravelRepository = new SaveTravelRepository();
    await saveTravelRepository.save({
      user_id: customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    });
  }
}

export default ConfirmService;

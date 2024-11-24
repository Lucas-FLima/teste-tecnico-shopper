import { GetDriverRepository } from "../repositories/GetDriverRepository";
import { GetHistoryTravelRepository } from "../repositories/GetHistoryTravelRepository";
import AppError from "../utils/errors/AppError";

interface IData {
  customer_id: string;
  driver_id?: string;
}

class HistoryService {
  async execute(data: IData) {
    const { customer_id, driver_id } = data;

    if (driver_id) {
      const getDriverRepository = new GetDriverRepository();
      const driver = await getDriverRepository.getDriver(parseInt(driver_id));
      if (!driver) {
        throw new AppError("INVALID_DRIVER", "Motorista invalido.", 400);
      }
    }

    const getHistoryTravelRepository = new GetHistoryTravelRepository();
    const travels = await getHistoryTravelRepository.getTravels(data);

    const travelsFormatted = travels.map((travel) => {
      return {
        customer_id,
        rides: [
          {
            id: travel.id,
            date: travel.createdAt,
            origin: travel.origin,
            destination: travel.destination,
            distance: travel.distance,
            duration: travel.duration,
            driver: {
              id: travel.driver.id,
              name: travel.driver.name,
            },
            value: travel.value,
          },
        ],
      };
    });

    return travelsFormatted;
  }
}

export default HistoryService;

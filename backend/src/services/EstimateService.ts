import { formatResponseDrivers } from "../helpers/formatResponseDrivers";
import { priceCalculate } from "../helpers/priceCalculate";
import GoogleRoutesService from "../integrations/GoogleRoutesService";
import { GetDriversAvaibleRepository } from "../repositories/GetDriversAvaibleRepository";

interface IData {
  origin: string;
  destination: string;
}

class EstimateService {
  async execute(data: IData) {
    const { origin, destination } = data;

    const googleRoutesService = new GoogleRoutesService();
    const route = await googleRoutesService.getRoute(origin, destination);

    let retorno = {
      origin: {
        latitude: route.routes[0].legs[0].startLocation.latLng.latitude,
        longitude: route.routes[0].legs[0].startLocation.latLng.longitude,
      },
      destination: {
        latitude: route.routes[0].legs[0].endLocation.latLng.latitude,
        longitude: route.routes[0].legs[0].endLocation.latLng.longitude,
      },
      distance: route.routes[0].legs[0].distanceMeters,
      duration: route.routes[0].legs[0].duration,
    };

    const getDriversAvaibleRepository = new GetDriversAvaibleRepository();
    const drivers = await getDriversAvaibleRepository.getDriversAvaible(
      retorno.distance
    );

    const driversWithPrice = priceCalculate({
      distance: retorno.distance,
      drivers,
    });

    const formattedDrivers = formatResponseDrivers(driversWithPrice);

    const formattedData = {
      ...retorno,
      options: formattedDrivers,
      routeResponse: route,
    };

    return { formattedData };
  }
}

export default EstimateService;

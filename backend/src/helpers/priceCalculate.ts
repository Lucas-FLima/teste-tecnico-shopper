import { IDriverAvailableWithPrice, IDriversRepository } from "../types";

interface IData {
  distance: number;
  drivers: IDriversRepository[];
}

export function priceCalculate(data: IData): IDriverAvailableWithPrice[] {
  const { distance, drivers } = data;

  const distanceInKm = distance / 1000;

  const driversWithPrice = drivers.map((driver) => {
    return {
      ...driver,
      value: driver.rating_km * distanceInKm,
    };
  });

  driversWithPrice.sort((a, b) => a.value - b.value);

  return driversWithPrice;
}

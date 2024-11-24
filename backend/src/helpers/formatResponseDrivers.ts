import { IDriverAvailableWithPrice, IDriverResponse } from "../types";

export function formatResponseDrivers(
  drivers: IDriverAvailableWithPrice[]
): IDriverResponse[] {
  const driversFiltered = drivers.map((driver) => {
    return {
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: driver.rating,
        comment: driver.comment,
      },
      value: driver.value,
    };
  });

  driversFiltered.sort((a, b) => a.value - b.value);
  return driversFiltered;
}

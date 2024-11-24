import { IDriversRepository } from "../types";

interface IValidDriver {
  driverUser: IDriversRepository;
  distance: number;
}

export function validDistance(data: IValidDriver): boolean {
  const { driverUser, distance } = data;

  const distanceKm = distance / 1000;
  const driver = driverUser.min_km <= distanceKm;

  return driver;
}

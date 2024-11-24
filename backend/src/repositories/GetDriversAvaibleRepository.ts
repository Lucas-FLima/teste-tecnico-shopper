import prisma from "../prisma";
import { IDriversRepository } from "../types";

class GetDriversAvaibleRepository {
  async getDriversAvaible(km: number): Promise<IDriversRepository[]> {
    const drivers = await prisma.driver.findMany({
      where: {
        min_km: {
          lte: km,
        },
      },
    });

    return drivers;
  }
}

export { GetDriversAvaibleRepository };


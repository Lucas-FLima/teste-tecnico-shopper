import prismaClient from "../prisma";
import { ISaveTravelRepository } from "../types";

class SaveTravelRepository {
  async save(travel: ISaveTravelRepository): Promise<void> {
    await prismaClient.travel.create({
      data: {
        origin: travel.origin,
        destination: travel.destination,
        distance: travel.distance,
        duration: travel.duration,
        value: travel.value,
        driver: {
          connect: {
            id: travel.driver.id,
          },
        },
        user: {
          connect: {
            id: parseInt(travel.user_id),
          },
        },
      },
    });
  }
}

export { SaveTravelRepository };


import prismaClient from "../prisma";

interface IHistoryRequest {
  customer_id: string;
  driver_id?: string;
}

class GetHistoryTravelRepository {
  async getTravels({ customer_id, driver_id }: IHistoryRequest) {
    const travels = await prismaClient.travel.findMany({
      where: {
        userId: parseInt(customer_id),
        driverId: driver_id ? parseInt(driver_id) : undefined,
      },
      select: {
        id: true,
        createdAt: true,
        origin: true,
        destination: true,
        distance: true,
        duration: true,
        driver: {
          select: {
            id: true,
            name: true,
          },
        },
        value: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return travels;
  }
}

export { GetHistoryTravelRepository };


import prisma from "../prisma";
import { IDriversRepository } from "../types";

class GetDriverRepository {
  async getDriver(id: number): Promise<IDriversRepository | null> {
    const driver = await prisma.driver.findUnique({
      where: {
        id,
      },
    });

    return driver;
  }
}

export { GetDriverRepository };


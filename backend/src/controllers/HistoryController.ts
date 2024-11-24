import { Request, Response } from "express";
import HistoryService from "../services/HistoryService";
import AppError from "../utils/errors/AppError";

class HistoryController {
  async handle(req: Request, res: Response): Promise<void> {
    const { driver_id } = req.query;
    const { customer_id } = req.params;

    if (!customer_id) {
      throw new AppError(
        "INVALID_DATA",
        "Os dados fornecidos no corpo da requisição são inválidos.",
        400
      );
    }

    const historyService = new HistoryService();
    const history = await historyService.execute({
      customer_id: customer_id as string,
      driver_id: driver_id as string,
    });

    if (history.length === 0) {
      throw new AppError("NO_RIDES_FOUND", "Nenhum registro encontrado.", 404);
    }

    res.json(history);
  }
}

export { HistoryController };


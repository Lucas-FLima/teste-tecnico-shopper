import { Request, Response } from "express";
import ConfirmService from "../services/ConfirmService";
import AppError from "../utils/errors/AppError";

interface IConfirmRequest {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

class ConfirmController {
  async handle(req: Request, res: Response): Promise<void> {
    const {
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    } = req.body as IConfirmRequest;

    if (!customer_id || !origin || !destination || origin === destination) {
      throw new AppError(
        "INVALID_DATA",
        "Os dados fornecidos no corpo da requisição são inválidos.",
        400
      );
    }

    const confirmService = new ConfirmService();
    await confirmService.execute({
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    });

    res.json({ success: true });
  }
}

export { ConfirmController };


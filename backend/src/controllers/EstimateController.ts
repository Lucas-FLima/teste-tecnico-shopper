import { Request, Response } from "express";
import EstimateService from "../services/EstimateService";
import AppError from "../utils/errors/AppError";

class EstimateController {
  public async handle(req: Request, res: Response): Promise<void> {
    const { customer_id, origin, destination } = req.body;

    if (!customer_id || !origin || !destination || origin === destination) {
      throw new AppError(
        "INVALID_DATA",
        "Os dados fornecidos no corpo da requisição são inválidos.",
        400
      );
    }

    const estimateService = new EstimateService();
    const estimate = await estimateService.execute({
      origin,
      destination,
    });

    res.json(estimate);
  }
}

export { EstimateController };


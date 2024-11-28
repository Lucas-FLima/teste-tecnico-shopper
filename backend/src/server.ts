import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import routes from "./routes";
import { IError } from "./types/IError";
import AppError from "./utils/errors/AppError";

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    return res.status(err.status_code).json({
      error_code: err.error_code,
      description: err.error_description,
    });
  }

  return res.status(500).json({
    error_code: "INTERNAL_SERVER_ERROR",
    description: "Erro interno do servidor, tente novamente mais tarde",
  });
});

app.listen(8080, () =>
  console.log(`Servidor rodando na porta 8080`)
);

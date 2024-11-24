import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import routes from "./routes";
import { IError } from "./types/IError";
import AppError from "./utils/errors/AppError";

const app = express();
app.use(express.json());
app.use(routes);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error_code: err.error_code,
      description: err.description,
    });
  }

  res.status(500).json({
    error_code: "INTERNAL_SERVER_ERROR",
    description: "Erro interno do servidor, tente novamente mais tarde",
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
);

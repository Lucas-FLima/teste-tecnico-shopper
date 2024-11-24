import { IError } from "../../types/IError";

class AppError implements IError {
  public readonly statusCode: number;
  public readonly error_code: string;
  public readonly description: string;

  constructor(error_code: string, description: string, statusCode = 400) {
    this.statusCode = statusCode;
    this.error_code = error_code;
    this.description = description;
  }
}

export default AppError;

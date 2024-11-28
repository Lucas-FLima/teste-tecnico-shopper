import { IError } from "../../types/IError";

class AppError implements IError {
  public readonly status_code: number;
  public readonly error_code: string;
  public readonly error_description: string;

  constructor(error_code: string, description: string, statusCode = 400) {
    this.status_code = statusCode;
    this.error_code = error_code;
    this.error_description = description;
  }
}

export default AppError;

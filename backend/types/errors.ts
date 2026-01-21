export type AppError = {
  statusCode: number;
  message: string;
  code: string;
};

export type ErrorsMap = Record<string, AppError>;

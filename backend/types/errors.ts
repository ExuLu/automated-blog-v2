export type AppError = {
  statusCode: number;
  message: string;
};

export type ErrorsMap = Record<string, AppError>;

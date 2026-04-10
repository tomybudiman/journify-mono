import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode ?? 500;

  const message =
    statusCode === 500
      ? 'Terjadi kesalahan pada server'
      : err.message;

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;

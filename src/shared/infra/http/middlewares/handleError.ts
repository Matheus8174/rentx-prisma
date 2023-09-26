import { NextFunction, Request, Response } from 'express';

import AppError from '@shared/errors/AppError';

const handleError = (
  error: Error,
  _: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.status).json({
      message: error.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${error.message}`
  });
};

export default handleError;

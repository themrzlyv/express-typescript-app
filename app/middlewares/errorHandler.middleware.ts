import { Request, Response, NextFunction } from 'express';
import ApiError from './apiError.middleware';

const errorHandler = async (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    return res.status(error.code).json({ error: error.message });
  }

  return res.status(500).json({ error: 'Internal server error!' });
};

export default errorHandler;
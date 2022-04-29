import { Request, Response, NextFunction } from 'express';
import ApiError from './apiError.middleware';

export const accessUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Is Token Included
    if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer:'))) {
      return next(ApiError.badRequest(403, 'You are not authorized to access this page'));
    }
    next();
  } catch (error) {
    next(error);
  }
};
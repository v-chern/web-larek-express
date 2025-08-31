import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER_MSG } from '../config';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: INTERNAL_SERVER_MSG });
};

export default errorHandler;

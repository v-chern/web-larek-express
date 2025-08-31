import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/notFoundError';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Маршрут не найден'));
}

export default notFound;
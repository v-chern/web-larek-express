import { Request, Response, NextFunction } from "express";
import NotFoundError from "../errors/notFoundError";
import BadRequestError from "../errors/badRequestError";
import ConflictError from "../errors/conflictError";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('<----- Error Handler ----->');
  console.log(err);
  if (err && err instanceof ConflictError) {
    
  }

  return res.status(err.statusCode).json({ message: err.message }); 
  return res.status(500).send({ message: "Внутренняя ошибка сервера" });
}
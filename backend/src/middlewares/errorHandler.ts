import { Request, Response, NextFunction } from "express";
import InternalServerError from "../errors/internalServerError";
import { INTERNAL_SERVER_MSG } from "../utils/constants";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (!err.statusCode) {
    err = new InternalServerError(INTERNAL_SERVER_MSG);
  }
  return res.status(err.statusCode).json({ message: err.message }); 
}

export default errorHandler;
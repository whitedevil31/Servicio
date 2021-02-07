import { Request, Response, NextFunction } from "express";

const isAdministratorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.send("you are not authenticated");
  }
};

export default isAdministratorMiddleware;

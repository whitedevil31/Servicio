import { Request, Response, NextFunction } from "express";

const isAdministratorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "You are not Authenticated" });
  }
};

export default isAdministratorMiddleware;

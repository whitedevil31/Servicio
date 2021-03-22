import { Router, Request, Response, NextFunction } from "express";
import adminMiddleware from "../middleware/auth";
import bcrypt from "bcryptjs";
import passport from "passport";
import { getClient } from "../db/db.connect";
import { userType, userSchema, userInterface } from "./user.schema";
import { MongoClient } from "mongodb";
import { signUpClient, signUpWorker } from "./user.db";

const router: Router = Router();
router.post(
  "/api/register/client",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as userType;
    try {
      const result = await signUpClient(data);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  "/api/register/worker",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as userType;
    try {
      const result = await signUpWorker(data);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/login",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    res.send(req.user).status(200);
  }
);
router.get("/logout", (req: Request, res: Response) => {
  req.logout();
  res.send("success").status(200);
});
router.get("/api/user", adminMiddleware, (req: Request, res: Response) => {
  res.send(req.user);
});

export default router;

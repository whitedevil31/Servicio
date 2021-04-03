import { Router, Request, Response, NextFunction } from "express";
import adminMiddleware from "../middleware/auth";
import passport from "passport";
import { userType } from "./user.schema";
import { signUpClient } from "./user.db";

const router: Router = Router();
router.post(
  "/api/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as userType;
    try {
      const result = await signUpClient(data);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/api/login",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    try {
      res.send(req.user).status(200);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
);
router.get("/api/logout", (req: Request, res: Response) => {
  try {
    req.logout();
    res.json({ success: true, message: "Logged Out" }).status(200);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
router.get("/api/user", adminMiddleware, (req: Request, res: Response) => {
  try {
    res.json(req.user).status(200);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

export default router;

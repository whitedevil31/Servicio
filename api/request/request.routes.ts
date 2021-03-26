import { Router, Request, Response, NextFunction } from "express";
import adminMiddleware from "../middleware/auth";
import { requestType } from "./request.schema";

const router: Router = Router();

router.post(
  "/api/worker/request",
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const data = req.body as requestType;
    } catch (err) {
      res.json(err).status(400);
    }
  }
);

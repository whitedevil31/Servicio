import { Router, Request, Response, NextFunction } from "express";
import adminMiddleware from "../middleware/auth";
import { requestType } from "./request.schema";
import {
  sendRequest,
  findRequest,
  acceptRequest,
  deleteRequest,
  findAssignedWorkers,
  findAssignedWorks,
} from "./request.db";
import { userDB } from "../user/user.schema";

const router: Router = Router();

router.post(
  "/api/worker/request",
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = req.user as userDB;
      const data = req.body as requestType;
      const result = await sendRequest(data, user);
      res.json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
router.get(
  "/api/worker/request/:workerId",
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const workerId = req.params.workerId;
      const result = await findRequest(workerId);
      res.json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
router.patch(
  "/api/request/:postId",
  adminMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.postId;
      await acceptRequest(postId);
      res.json({ message: "Requested accepted" });
    } catch (err) {
      next(err);
    }
  }
);
router.delete(
  "/api/request/:postId",
  adminMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.postId;
      await deleteRequest(postId);
      res.json({ message: "Request rejected" });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/api/client/get/:username",
  adminMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allWorkers = await findAssignedWorkers(req.params.username);
      res.status(200).json(allWorkers);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/api/worker/get/assigned/:workerId",

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await findAssignedWorks(req.params.workerId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;

import { Router, Request, Response, NextFunction } from "express";
import adminMiddleware from "../middleware/auth";
import { postType, ServiceType } from "./post.schema";
import { userDB } from "../user/user.schema";
import {
  workerPost,
  getPost,
  filterPost,
  nearbyWorkers,
  getSingleWorkerPost,
} from "./post.db";
import { userInterface } from "../user/user.schema";
import HttpError from "http-errors";
const router: Router = Router();

router.post(
  "/api/worker/post",
  adminMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as postType;
    const user = req.user as userInterface;

    try {
      if (req.user) {
        if (req.user.role == "User")
          throw HttpError(403, "Users are not allowed to post ");
      }
      const result = await workerPost(data, user);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/api/worker/post/:postId",
  adminMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getPost(req.params.postId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  "/api/worker/get",
  adminMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as userDB;
      console.log(user);
      const result = await getSingleWorkerPost(user);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/api/worker/filter",
  adminMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const services = req.body.services as ServiceType;
      if (services) {
        const result = await filterPost(services);
        res.json(result);
      }
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  "/api/nearby",
  adminMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as userDB;
      console.log(user);
      const workerList = await nearbyWorkers(user);
      res.json(workerList);
    } catch (err) {
      next(err);
    }
  }
);
export default router;

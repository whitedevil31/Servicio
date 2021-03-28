import { Router, Request, Response, NextFunction } from "express";
import adminMiddleware from "../middleware/auth";
import { postType, ServiceType, userLocation } from "./post.schema";
import { userDB } from "../user/user.schema";
import { workerPost, getPost, filterPost, nearbyWorkers } from "./post.db";
import { userInterface } from "../user/user.schema";

const router: Router = Router();

router.post(
  "/api/worker/post",
  adminMiddleware,
  async (req: Request, res: Response) => {
    const data = req.body as postType;
    const user = req.user as userInterface;
    try {
      const result = await workerPost(data, user);
      res.status(201).send(result);
    } catch (err) {
      res.json(err);
    }
  }
);

router.get(
  "/api/worker/post/:postId",
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const result = await getPost(req.params.postId);
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  }
);

router.post(
  "/api/worker/filter",
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const services = req.body.services as ServiceType[];
      if (services) {
        const result = await filterPost(services);
        res.json(result);
      }
    } catch (err) {
      res.json(err);
    }
  }
);
router.get(
  "/api/nearby",
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = req.user as userDB;
      console.log(user);
      const workerList = await nearbyWorkers(user);
      res.json(workerList);
    } catch (err) {
      res.json(err).status(400);
    }
  }
);
export default router;

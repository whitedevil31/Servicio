import { Router, Request, Response, NextFunction } from "express";
import adminMiddleware from "../middleware/auth";
import { postType } from "./post.schema";
import { workerPost, getAllPost, filterPost } from "./post.db";
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
  "/api/worker/get",
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const result = await getAllPost();
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  }
);

router.get(
  "/api/worker/filter/:service",
  async (req: Request, res: Response) => {
    try {
      const result = await filterPost(req.params.service);
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  }
);
export default router;

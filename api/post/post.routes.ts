import { Router, Request, Response, NextFunction } from "express";
import adminMiddleware from "../middleware/auth";
import { postSchema, postType } from "./post.schema";
import { postData, getAllPost, filterPost } from "./post.db";
import { userInterface, userType } from "../user/user.schema";

const router: Router = Router();

router.post(
  "/api/worker/post",
  adminMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as postType;
    const user = req.user as userInterface;
    console.log(user);

    try {
      const result = await postData(data, user);

      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/api/workerpost/all",
  adminMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getAllPost();
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/api/filter/:service/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await filterPost(req.params.service);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);
export default router;

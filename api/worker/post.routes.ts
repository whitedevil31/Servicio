import { worker } from "cluster";
import { Router, Request, Response, NextFunction } from "express";
import adminMiddleware from "../middleware/auth";

import { errorType, userDB } from "../types/types";
import { getClient, connectDB } from "../db/db.connect";

import { postSchema, postType } from "./post.schema";
import { postData } from "./post.db";
import { userInterface, userType } from "../user/user.schema";

const router: Router = Router();

router.post(
  "/api/worker/post",
  adminMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as postType;
    const user = req.user as userInterface;

    try {
      const result = await postData(data, user._id);

      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }
);

// router.get("/all", adminMiddleware, async (req: Request, res: Response) => {
//   try {
//     const list = await Post.find({});
//     res.send(list);
//   } catch (e) {
//     console.log(e);
//   }
// });

export default router;

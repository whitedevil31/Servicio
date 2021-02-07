import { worker } from "cluster";
import { Router, Request, Response } from "express";
import adminMiddleware from "../middleware/auth";
import Post from "./post.schema";
import { errorType, userDB } from "../types/types";
import User from "../client/client.schema";

const router: Router = Router();

router.post("/post", adminMiddleware, async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    const post = await new Post({ ...req.body, user });
    console.log(post);
    await post.save();
    res.send(post).status(201);
  } catch (e) {
    console.log(e);
  }
});

router.get("/all", adminMiddleware, async (req: any, res: Response) => {
  try {
    const list = await Post.find({});
    res.send(list);
  } catch (e) {
    console.log(e);
  }
});

export default router;

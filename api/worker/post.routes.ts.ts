import { worker } from "cluster";
import { Router, Request, Response } from "express";
import adminMiddleware from "../middleware/auth";
import Post from "./post.schema";
import { errorType, userDB } from "../types/types";
import User from "../client/client.schema";

const router: Router = Router();

router.post("/post", adminMiddleware, async (req: any, res: Response) => {
  try {
    const post = await new Post(req.body);
    await post.save();
    res.send(post).status(201);
  } catch (e) {
    console.log(e);
  }
});

router.get("/all", adminMiddleware, async (req: any, res: Response) => {
  const id = req.user.id;
  const posts = await Post.find({ user: id });
  res.send(posts);
});

export default router;

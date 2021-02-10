import { worker } from "cluster";
import { Router, Request, Response } from "express";
import adminMiddleware from "../middleware/auth";
import Post from "./post.schema";
import { errorType, userDB } from "../types/types";
// import User from "../client/client.schema";
import { getClient, connectDB } from "../db/db.connect";
import { MongoClient } from "mongodb";

const router: Router = Router();

router.post("/post", async (req: Request, res: Response) => {
  try {
    const client: MongoClient = await getClient();

    const data = await client
      .db()
      .collection("worker")
      .insertOne(req.body, (er, res) => {
        if (er) throw er;
        console.log("submitted");
      });
    res.send(req.user);
    // const post = await new Post(req.body);
    // await post.save();
    // res.send("success").status(200);
  } catch (e) {
    res.send("bad").status(404);
    console.log(e);
  }
  // const collection = await getClient.db.collection("workers")
  // try {
  // const user = await User.findById(req.user.id);
  // console.log(user);
  //   const post = await new Post(
  //     req.body
  //     // , user
  //   );
  //   console.log(post);
  //   await post.save();
  //   res.send(post).status(201);
  // } catch (e) {
  //   console.log(e);
  // }
});

router.get("/all", adminMiddleware, async (req: Request, res: Response) => {
  try {
    const list = await Post.find({});
    res.send(list);
  } catch (e) {
    console.log(e);
  }
});

export default router;

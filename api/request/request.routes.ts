import { Router, Request, Response, NextFunction } from "express";
import adminMiddleware from "../middleware/auth";
import { requestType } from "./request.schema";
import { sendRequest, findRequest, acceptRequest } from "./request.db";
import { userDB } from "../user/user.schema";
import { runInContext } from "node:vm";

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
      res.json(err).status(400);
    }
  }
);
router.get(
  "/api/worker/request/:workerId",
  async (req: Request, res: Response) => {
    try {
      const workerId = req.params.workerId;
      const result = await findRequest(workerId);
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  }
);
router.patch("/api/request/:postId", async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const result = await acceptRequest(postId);
    res.json({ success: true, message: "updated" });
  } catch (err) {
    res.json(err);
  }
});
export default router;

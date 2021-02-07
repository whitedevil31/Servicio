import { Router, Request, Response } from "express";
import adminMiddleware from "../middleware/auth";
import bcrypt from "bcryptjs";
import passport from "passport";
import User from "./client.schema";
import { userDB, errorType } from "../types/types";
const router: Router = Router();

router.post("/register/client", (req: Request, res: Response) => {
  const { email, password } = req?.body;
  User.findOne({ email }, async (err: errorType, doc: userDB) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        password: hashedPassword,
        role: "client",
      });
      await newUser.save();
      res.send(newUser);
    }
  });
});
router.post("/register/worker", (req: Request, res: Response) => {
  const { email, password } = req?.body;

  User.findOne({ email }, async (err: errorType, doc: userDB) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        password: hashedPassword,
        role: "worker",
      });
      await newUser.save();
      res.send(newUser);
    }
  });
});
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

router.get("/user", adminMiddleware, (req, res) => {
  res.send(req.user);
});
router.patch("/client/info", adminMiddleware, async (req: any, res) => {
  let infoExist = req.user.info.username;
  console.log(infoExist);
  if (infoExist == null) {
    await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true },
      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          res.send(docs);
        }
      }
    );
  } else {
    res.redirect("/");
  }
});
router.patch("/worker/info", adminMiddleware, async (req: any, res) => {
  let infoExist = req.user.info.username;
  const role = req.user.role;
  console.log(infoExist);
  if (infoExist == null) {
    await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true },
      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          res.send(docs);
        }
      }
    );
  } else {
    res.redirect("/");
  }
});

router.get("/", adminMiddleware, (req, res) => {
  res.send("dashbord");
});
router.get("/logout", (req, res) => {
  req.logout();
  res.send("success");
});

export default router;

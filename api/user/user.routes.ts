import { Router, Request, Response, NextFunction } from "express";
import adminMiddleware from "../middleware/auth";
import bcrypt from "bcryptjs";
import passport from "passport";
import { getClient } from "../db/db.connect";
import { userType, userSchema, userInterface } from "./user.schema";
import { MongoClient } from "mongodb";
import { signUpClient, signUpWorker, locationFilter, latpost } from "./user.db";

const router: Router = Router();
router.post(
  "/api/register/client",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as userType;
    try {
      const result = await signUpClient(data);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  "/api/register/worker",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as userType;
    try {
      const result = await signUpWorker(data);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/login",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    res.send(req.user).status(200);
  }
);
router.get("/logout", (req: Request, res: Response) => {
  req.logout();
  res.send("success").status(200);
});
router.get("/api/user", adminMiddleware, (req: Request, res: Response) => {
  res.send(req.user);
});

router.get(
  "/locationfilter",
  adminMiddleware,
  (req: Request, res: Response) => {
    const data = req.body;
    locationFilter(data);
  }
);
interface userLocation {
  longitude: number;
  latitude: number;
}

router.post("/lats", async (req, res) => {
  const data = req.body as userLocation;
  const result = await latpost(data);
  res.json(result);
});

// router.post("/register/client", (req: Request, res: Response) => {
//   const { email, password } = req?.body;
//   User.findOne({ email }, async (err: errorType, doc: userDB) => {
//     if (err) throw err;
//     if (doc) res.send("User Already Exists");
//     if (!doc) {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({
//         email,
//         password: hashedPassword,
//         role: "client",
//       });
//       await newUser.save();
//       res.send(newUser);
//     }
//   });
// });
// router.post("/register/worker", (req: Request, res: Response) => {
//   const { email, password } = req?.body;

//   User.findOne({ email }, async (err: errorType, doc: userDB) => {
//     if (err) throw err;
//     if (doc) res.send("User Already Exists");
//     if (!doc) {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({
//         email,
//         password: hashedPassword,
//         role: "worker",
//       });
//       await newUser.save();
//       res.send(newUser);
//     }
//   });
// });

// router.patch(
//   "/client/info",
//   adminMiddleware,
//   async (req: Request, res: Response, next: NextFunction) => {
//     const data = req.body as userType;
//     try {
//       const result = await patchClient(data);
//     } catch (err) {
//       next(err);
//     }

// let infoExist = req.user.info.username;
// console.log(infoExist);
// if (infoExist == null) {
//   await User.findByIdAndUpdate(
//     req.user.id,
//     req.body,
//     { new: true },
//     (err, docs) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(docs);
//       }
//     }
//   );
// } else {
//   res.redirect("/");
// }
//   }
// );
// router.patch("/worker/info", adminMiddleware, async (req: Request, res) => {
//   let infoExist = req.user.info.username;
//   const role = req.user.role;
//   console.log(infoExist);
//   if (infoExist == null) {
//     await User.findByIdAndUpdate(
//       req.user.id,
//       req.body,
//       { new: true },
//       (err, docs) => {
//         if (err) {
//           console.log(err);
//         } else {
//           res.send(docs);
//         }
//       }
//     );
//   } else {
//     res.redirect("/");
//   }
// });

// router.get("/", (req, res) => {
//   res.send("dashbord");
// });

export default router;

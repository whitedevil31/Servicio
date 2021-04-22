import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import connectDB from "./db/db.connect";
connectDB();
require("./passport/passport.config");
import clientroute from "./user/user.routes";
import postroute from "./post/post.routes";
import requestroute from "./request/request.routes";
import { HttpError } from "http-errors";
import ussdroute from "./ussd/ussd.routes";
// import errorHandler from "./utils/errors.ts ";

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "thisissparta",
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
// app.use(errorHandler);
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(clientroute);
app.use(postroute);
app.use(requestroute);
app.use(ussdroute);
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(error.status).json({ message: error.message });
  }
});
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Resource not found" });
});
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});

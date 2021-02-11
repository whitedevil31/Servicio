import express, { Express, Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
config({ path: "./config/.env" });
import connectDB from "./db/db.connect";
connectDB();
require("./passport/passport.config");

import clientroute from "./user/user.routes";
import postroute from "./post/post.routes";

const app: Express = express();

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "thiisisisi",
  })
);

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(clientroute);
app.use(postroute);

app.listen(3000, () => {
  console.log("server is up and running on port 3000");
});

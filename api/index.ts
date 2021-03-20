import express, { Express, Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import  dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongo";
import connectDB from "./db/db.connect";
connectDB();
require("./passport/passport.config");

import clientroute from "./user/user.routes";
import postroute from "./post/post.routes";

const app: Express = express();

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "thisissparta",
    cookie: { maxAge: 2 * 60 * 60 * 1000 },
  })
);

app.use(morgan("tiny"));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(clientroute);
app.use(postroute);

app.listen(5000, () => {
  console.log("server is up and running on port 5000");
});

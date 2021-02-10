import passportLocal from "passport-local";
import passport from "passport";
import { userInterface, userSchema, userType } from "../user/user.schema";
import { errorType } from "../types/types";
import bcrypt from "bcryptjs";
import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";
import { connection } from "mongoose";

const localStrategy = passportLocal.Strategy;

passport.use(
  new localStrategy(async (email: string, password: string, done) => {
    //err how to solve it
    const client: mongodb.MongoClient = await getClient();
    const connection = await client.db().collection("USERS");

    connection.findOne({ email: email }, (err, user) => {
      if (err) throw err;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, result: boolean) => {
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);

passport.serializeUser<userInterface, any>((user: userInterface, cb: any) => {
  cb(null, user.email);
});

passport.deserializeUser(async (userEmail: string, cb) => {
  const client: mongodb.MongoClient = await getClient();
  const connection = await client.db().collection("USERS");
  //err doubt how to solve that
  const find = { email: userEmail };
  console.log(find);
  try {
    const result = await connection.findOne(find);
    console.log(result);
    const userInformation: userType = {
      email: result.email,
      password: result.password,
      role: result.role,
    };
    cb(null, userInformation);
  } catch (err) {
    cb(err, undefined);
  }
});

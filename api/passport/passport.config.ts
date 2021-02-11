import passportLocal from "passport-local";
import passport from "passport";
import { userInterface, userSchema, userType } from "../user/user.schema";

import bcrypt from "bcryptjs";
import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";
import { connection } from "mongoose";
import { userDB } from "../types/types";
const localStrategy = passportLocal.Strategy;

passport.use(
  new localStrategy(async (email: string, password: string, done) => {
    const client: mongodb.MongoClient = await getClient();
    const connection = await client.db().collection("USERS");

    connection.findOne({ email: email }, (err, user) => {
      if (err) throw err;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, result: boolean) => {
        if (err) throw err;
        if (result === true) {
          return done(null, {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
          });
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

  const find = { email: userEmail };
  try {
    const result = await connection.findOne(find);
    const userInformation: userDB = {
      _id: result._id,
      email: result.email,
      role: result.role,
      username: result.username,
    };
    cb(null, userInformation);
  } catch (err) {
    cb(err, undefined);
  }
});

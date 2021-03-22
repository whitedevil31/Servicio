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
  new localStrategy(async (username: string, password: string, done) => {
    const client: mongodb.MongoClient = await getClient();
    const connection = await client.db().collection("users");

    connection.findOne({ username: username }, (err, user) => {
      if (err) throw err;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, result: boolean) => {
        if (err) throw err;
        if (result === true) {
          return done(null, {
            _id: user._id,
            username: user.username,
            role: user.role,
            gender: user.gender,
            age: user.age,
            residence: user.residence,
          });
        } else {
          return done(null, false);
        }
      });
    });
  })
);

passport.serializeUser<userInterface, any>((user: userInterface, cb: any) => {
  cb(null, user.username);
});

passport.deserializeUser(async (username: string, cb) => {
  const client: mongodb.MongoClient = await getClient();
  const connection = await client.db().collection("users");

  const find = { username: username };
  try {
    const result = await connection.findOne(find);
    const userInformation: userDB = {
      _id: result._id,
      role: result.role,
      username: result.username,
      gender: result.gender,
      age: result.age,
      residence: result.residence,
    };
    cb(null, userInformation);
  } catch (err) {
    cb(err, undefined);
  }
});

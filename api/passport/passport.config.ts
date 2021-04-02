import passportLocal from "passport-local";
import passport from "passport";
import bcrypt from "bcryptjs";
import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";
import { userDB } from "../user/user.schema";

const localStrategy = passportLocal.Strategy;

passport.use(
  new localStrategy(async (username: string, password: string, done) => {
    const client: mongodb.MongoClient = await getClient();
    const connection = await client.db().collection<userDB>("users");
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
            contact: user.contact,
            gender: user.gender,
            age: user.age,
            residence: user.residence,
            location: user.location,
            about: user.about,
          });
        } else {
          return done(null, false);
        }
      });
    });
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.username);
});

passport.deserializeUser(async (username: string, cb) => {
  const client: mongodb.MongoClient = await getClient();
  const DB = await client.db().collection<userDB>("users");

  try {
    const user = await DB.findOne({ username: username });
    cb(null, user);
  } catch (err) {
    cb(err, undefined);
  }
});

import passportLocal from "passport-local";
import passport from "passport";
import User from "../client/client.schema";
import { userType, userDB, errorType } from "../types/types";
import bcrypt from "bcryptjs";

const localStrategy = passportLocal.Strategy;

passport.use(
  new localStrategy((email: string, password: string, done) => {
    //err how to solve it

    User.findOne({ email: email }, (err: errorType, user: userDB) => {
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

passport.serializeUser<userDB, any>((user: userDB, cb: any) => {
  cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
  //err doubt how to solve that
  User.findOne({ _id: id }, (err: errorType, user: userDB) => {
    const userInformation: userType = {
      email: user.email,
      role: user.role,
      id: user._id,
      info: user.info,
    };
    cb(err, userInformation);
  });
});

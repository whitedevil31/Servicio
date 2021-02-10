// import mongoose from "mongoose";
// import { type } from "os";
// import { userType } from "../types/types";
// // const service = new mongoose.Schema({ service: String });
// const userSchema: mongoose.Schema = new mongoose.Schema({
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: { type: String, required: true },
//   role: { type: String },
//   info: {
//     username: { type: String, default: null },
//     age: { type: Number, default: null },
//     gender: { type: String, default: null },
//     residence: { type: String, default: null },
//   },
// });

// type USER = userType & mongoose.Document;

// const User: mongoose.Model<USER> = mongoose.model("User", userSchema);

// export default User;

import * as mongoDB from "mongodb";
import * as yup from "yup";

const userSchema = yup
  .object({
    email: yup.string().trim().required(),
    password: yup.string().required(),
    role: yup.string(),
  })
  .required();

// userSchema
//   .validate({ username: 12, age: "23" })
//   .catch((err) => console.log(err));
type userType = yup.InferType<typeof userSchema>;

interface userInterface extends userType {
  _id: mongoDB.ObjectId;
}

export { userSchema, userType, userInterface };

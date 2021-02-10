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
    password: yup.string().trim().required(),
    role: yup.string(),
    username: yup.string().trim().required(),
    gender: yup.string().trim().required(),
    age: yup.number(),
    residence: yup.string().trim().required(),
  })
  .required();
type userType = yup.InferType<typeof userSchema>;

interface userInterface extends userType {
  _id: mongoDB.ObjectId;
}

export { userSchema, userType, userInterface };

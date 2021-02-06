import mongoose from "mongoose";
import { type } from "os";
import { userType } from "../types/types";
// const service = new mongoose.Schema({ service: String });
const userSchema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: { type: String, required: true },
  role: { type: String },
  info: {
    username: { type: String, default: null },
    age: { type: Number, default: null },
    gender: { type: String, default: null },
    residence: { type: String, default: null },
  },
});

type USER = userType & mongoose.Document;

const User: mongoose.Model<USER> = mongoose.model("User", userSchema);

export default User;

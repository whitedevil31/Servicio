import mongoose from "mongoose";
import { postType } from "../types/types";
const postSchema = new mongoose.Schema({
  requirement: { type: String },
  duration: { type: Number },
});

type POST = postType & mongoose.Document;
const Worker: mongoose.Model<POST> = mongoose.model("Worker", postSchema);
export default Worker;

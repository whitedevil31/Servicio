import mongoose from "mongoose";
import { postType } from "../types/types";
const postSchema = new mongoose.Schema({
  services: [{ type: String }],
  amount: { type: String },
  user: {
    email: { type: String },
    role: { type: String },
    id: mongoose.Types.ObjectId,
    info: { type: Object },
  },
});

type POST = postType & mongoose.Document;
const Worker = mongoose.model("Worker", postSchema);
export default Worker;

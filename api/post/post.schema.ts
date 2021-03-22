import * as yup from "yup";
import * as mongoDB from "mongodb";

const postSchema = yup
  .object({
    services: yup.array().of(yup.string().strict().required()),
    pay: yup.number().required(),
  })
  .required();

type postType = yup.InferType<typeof postSchema>;

interface workerPosts extends postType {
  _id: mongoDB.ObjectId;
  userID?: mongoDB.ObjectID;
}

export interface ServiceType {
  services: Array<string>;
}

export { postSchema, postType, workerPosts };

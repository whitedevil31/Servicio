import * as yup from "yup";
import * as mongoDB from "mongodb";

const postSchema = yup
  .object({
    services: yup.array().of(yup.string().strict().required()),
    pay: yup.number().required(),
  })
  .noUnknown(true)
  .required();
type postType = yup.InferType<typeof postSchema>;
interface postInterface extends postType {
  _id: mongoDB.ObjectId;
  userID?: mongoDB.ObjectID;
}

export { postSchema, postType, postInterface };

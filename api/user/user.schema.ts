import * as mongoDB from "mongodb";
import * as yup from "yup";

const userSchema = yup.object({
  password: yup.string().trim().required(),
  role: yup.string().required(),
  contact: yup.string().required(),
  username: yup.string().trim().required(),
  gender: yup.string().trim().required(),
  age: yup.number().required(),
  about: yup.string().required(),
  residence: yup.string().required(),
  location: yup
    .object({
      latitude: yup.number().required(),
      longitude: yup.number().required(),
    })
    .required(),
});

export interface userDB {
  _id: mongoDB.ObjectID;
  role: string;
  contact: string;
  username: string;
  password: string;
  gender: string;
  age: number;
  residence: string;
  about: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
type userType = yup.InferType<typeof userSchema>;

interface userInterface extends userType {
  _id: mongoDB.ObjectId;
}
export { userSchema, userType, userInterface };

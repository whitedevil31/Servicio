import * as mongoDB from "mongodb";
import * as yup from "yup";

const userSchema = yup
  .object({
    password: yup.string().trim().required(),
    role: yup.string(),
    username: yup.string().trim().required(),
    gender: yup.string().trim().required(),
    age: yup.number(),
    about: yup.string(),
    residence: yup.string().trim().required(),
    location: yup
      .object({ latitude: yup.string(), longitude: yup.string() })
      .required(),
  })
  .required();
type userType = yup.InferType<typeof userSchema>;

interface userInterface extends userType {
  _id: mongoDB.ObjectId;
}

export { userSchema, userType, userInterface };

import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";
import { userSchema, userType } from "./user.schema";
import bcrypt from "bcryptjs";
import HttpError from "http-errors";
export const signUpClient = async (data: userType) => {
  await userSchema.validate(data).catch((err) => {
    throw HttpError(400, err.errors.toString());
  });

  const client: mongodb.MongoClient = await getClient();
  const DB = await client.db().collection("users");
  const result = await DB.findOne({ username: data.username });
  if (result) {
    throw HttpError(409, "User already exist");
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const insertData = {
    username: data.username,
    password: hashedPassword,
    role: data.role,
    age: data.age,
    contact: data.contact,
    gender: data.gender,
    residence: data.residence,
    about: data.about,
    location: data.location,
  };
  const response = await DB.insertOne(insertData);
  if (response.insertedCount <= 0) {
    throw HttpError(500, "Internal server Error");
  }
  return { success: true, _id: response.insertedId };
};

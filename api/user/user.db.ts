import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";
import { userSchema, userType } from "./user.schema";
import bcrypt from "bcryptjs";

export const signUpClient = async (data: userType) => {
  await userSchema.validate(data).catch((err) => {
    throw { success: false, message: err.errors };
  });
  const client: mongodb.MongoClient = await getClient();
  const DB = await client.db().collection("users");
  const result = await DB.findOne({ username: data.username });
  if (result) {
    throw { success: false, message: "User already exist" };
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
    throw { process: false, message: "MongoDB Error" };
  }
  return { success: true, _id: response.insertedId };
};

// export const signUpWorker = async (data: userType) => {
//   const isValid = await userSchema.isValid(data);
//   console.log(isValid);
//   if (isValid) {
//     const client: mongodb.MongoClient = await getClient();
//     const connection = await client.db().collection("users");
//     const result = await connection.findOne({ username: data.username });
//     console.log(result);
//     if (result) {
//       throw "worker exist";
//     }
//     const hashedPassword = await bcrypt.hash(data.password, 10);
//     const insertData = {
//       password: hashedPassword,
//       role: data.role,
//       username: data.username,
//       gender: data.gender,
//       residence: data.residence,
//       age: data.age,
//       // location: {
//       //   latitude: data.location.latitude,
//       //   longitude: data.location.longitude,
//       // },
//     };
//     const add = await connection.insertOne(insertData);
//     if (add.insertedCount <= 0) {
//       throw "error";
//     }
//     return { _id: add.insertedId };
//   }
//   throw "invalid data";
// };

// interface cord {
//   latitude: String;
//   longitude: String;
// }
// export const locationFilter = async (data: cord) => {
//   const client: mongodb.MongoClient = await getClient();
//   const userList = await client.db().collection("cord").insertOne(data);
// };

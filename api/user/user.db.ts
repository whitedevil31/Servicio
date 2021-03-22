import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";
import { userSchema, userType } from "./user.schema";
import bcrypt from "bcryptjs";
import passport from "passport";
import { ParsedUrlQuery } from "node:querystring";
import { connection } from "mongoose";
// import findDistance from "../test";

export const signUpClient = async (data: userType) => {
  const isValid = await userSchema.isValid(data);
  console.log(isValid);
  if (isValid) {
    const client: mongodb.MongoClient = await getClient();
    const connection = await client.db().collection("users");
    const result = await connection.findOne({ username: data.username });
    console.log(result);
    if (result) {
      throw "user exist";
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const insertData = {
      password: hashedPassword,
      role: data.role,
      username: data.username,
      gender: data.gender,
      residence: data.residence,
    };
    const add = await connection.insertOne(insertData);
    if (add.insertedCount <= 0) {
      throw "error";
    }
    return { _id: add.insertedId };
  }
  throw "invalid data";
};

export const signUpWorker = async (data: userType) => {
  const isValid = await userSchema.isValid(data);
  console.log(isValid);
  if (isValid) {
    const client: mongodb.MongoClient = await getClient();
    const connection = await client.db().collection("users");
    const result = await connection.findOne({ username: data.username });
    console.log(result);
    if (result) {
      throw "worker exist";
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const insertData = {
      password: hashedPassword,
      role: data.role,
      username: data.username,
      gender: data.gender,
      residence: data.residence,
      age: data.age,
      // location: {
      //   latitude: data.location.latitude,
      //   longitude: data.location.longitude,
      // },
    };
    const add = await connection.insertOne(insertData);
    if (add.insertedCount <= 0) {
      throw "error";
    }
    return { _id: add.insertedId };
  }
  throw "invalid data";
};

// interface cord {
//   latitude: String;
//   longitude: String;
// }
// export const locationFilter = async (data: cord) => {
//   const client: mongodb.MongoClient = await getClient();
//   const userList = await client.db().collection("cord").insertOne(data);
// };
// interface userLocation {
//   longitude: number;
//   latitude: number;
// }
// export const latpost = async (userLocation: userLocation) => {
//   const client: mongodb.MongoClient = await getClient();
//   const userList = await client
//     .db()
//     .collection("users")
//     .find({ role: "worker" })
//     .toArray();

//   const result = findDistance(userList, userLocation);
//   return result;
// };

import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";
import { userSchema, userType } from "./user.schema";
import bcrypt from "bcryptjs";
import passport from "passport";

export const signUpClient = async (data: userType) => {
  const isValid = await userSchema.isValid(data);
  console.log(isValid);
  if (isValid) {
    const client: mongodb.MongoClient = await getClient();
    const connection = await client.db().collection("USERS");
    const result = await connection.findOne({ email: data.email });
    console.log(result);
    if (result) {
      throw "user exist";
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const insertData = {
      email: data.email,
      password: hashedPassword,
      role: "client",
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
    const connection = await client.db().collection("worker");
    const result = await connection.findOne({ email: data.email });
    console.log(result);
    if (result) {
      throw "worker exist";
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const insertData = {
      email: data.email,
      password: hashedPassword,
      role: data.role,
      username: data.username,
      gender: data.gender,
      residence: data.residence,
      age: data.age,
    };
    const add = await connection.insertOne(insertData);
    if (add.insertedCount <= 0) {
      throw "error";
    }
    return { _id: add.insertedId };
  }
  throw "invalid data";
};

export const patchClient = async (data: userType) => {};

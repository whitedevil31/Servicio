import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";
import {
  workerPosts,
  postSchema,
  postType,
  ServiceType,
  userLocation,
} from "./post.schema";
import { userInterface } from "../user/user.schema";
import findDistance from "../utils/calc.distance";

export const workerPost = async (data: postType, user: userInterface) => {
  await postSchema.validate(data).catch((err) => {
    throw { success: false, message: err.errors };
  });
  const workerPost = {
    pay: data.pay,
    services: data.services,
    timeslots: data.timeslots,
  };
  const client: mongodb.MongoClient = await getClient();
  const DB = await client.db().collection<workerPosts>("post");
  const addData = { user, ...workerPost };
  const add = await DB.insertOne(addData);
  if (add.insertedCount <= 0) {
    throw { success: false, message: "MongoDB error" };
  }
  return { _id: add.insertedId };
};

export const getAllPost = async () => {
  const client: mongodb.MongoClient = await getClient();
  const DB = await client.db().collection<workerPosts>("post");
  return await DB.find({}).toArray();
};

export const filterPost = async (service: ServiceType[]) => {
  const client: mongodb.MongoClient = await getClient();
  const DB = await client.db().collection<workerPosts>("post");
  if (service.length == 0) {
    return await DB.find().toArray();
  }
  return await DB.find({ services: { $all: service } }).toArray();
};
export const nearbyWorkers = async (Location: userLocation) => {
  const client: mongodb.MongoClient = await getClient();
  const userList = await client
    .db()
    .collection("users")
    .find({ role: "Utility Helper" })
    .toArray();

  const result = findDistance(userList, Location);
  return result;
};

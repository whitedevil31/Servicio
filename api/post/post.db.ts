import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";
import { workerPosts, postSchema, postType, ServiceType } from "./post.schema";
import { userDB, userInterface } from "../user/user.schema";
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

export const getPost = async (id: string) => {
  const client: mongodb.MongoClient = await getClient();
  return await client
    .db()
    .collection<workerPosts>("post")
    .findOne({ _id: new mongodb.ObjectId(id) });
};
export const getSingleWorkerPost = async (user: userDB) => {
  const client: mongodb.MongoClient = await getClient();
  const singleWorkerPosts = await client
    .db()
    .collection<workerPosts>("post")
    .find({ "user._id": new mongodb.ObjectID(user._id) })
    .toArray();
  console.log(singleWorkerPosts);
  return singleWorkerPosts;
};
export const filterPost = async (service: ServiceType[]) => {
  const client: mongodb.MongoClient = await getClient();
  const DB = await client.db().collection<workerPosts>("post");
  if (service.length == 0) {
    return await DB.find().toArray();
  }
  return await DB.find({ services: { $all: service } }).toArray();
};
export const nearbyWorkers = async (user: userDB) => {
  const client: mongodb.MongoClient = await getClient();
  const postList: any = await client
    .db()
    .collection("post")
    .find({ "user._id": { $ne: new mongodb.ObjectID(user._id) } })
    .toArray();
  const result = findDistance(postList, user.location);
  return result;
};

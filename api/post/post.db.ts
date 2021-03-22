import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";
import { workerPosts, postSchema, postType } from "./post.schema";
import { userInterface } from "../user/user.schema";
import { ServiceType } from "../post/post.schema";

export const workerPost = async (data: postType, user: userInterface) => {
  await postSchema.validate(data).catch((err) => {
    throw { success: false, message: err.errors };
  });
  const workerPost = { pay: data.pay, services: data.services };
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

export const filterPost = async (service: string) => {
  const client: mongodb.MongoClient = await getClient();
  const DB = await client.db().collection<workerPosts>("post");
  const PostArray = await DB.find().toArray();
  const filterArray = PostArray.filter((item) =>
    item.services!.find((item) => item === service)
  );
  return filterArray;
};

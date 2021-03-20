import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";
import { postSchema, postType } from "./post.schema";
import { userInterface } from "../user/user.schema";
import { ServiceType } from "../types/types";

export const postData = async (data: postType, user: userInterface) => {
  const validatedData = await postSchema.validate(data);
  const client: mongodb.MongoClient = await getClient();
  const connection = await client.db().collection("workerPost");
  const addData = { user, ...validatedData };
  const add = await connection.insertOne(addData);
  if (add.insertedCount <= 0) {
    throw "error with DB";
  }
  return { _id: add.insertedId };
};

export const getAllPost = async () => {
  const client: mongodb.MongoClient = await getClient();
  const connection = await client.db().collection("worker");
  return await connection.find().toArray();
};

export const filterPost = async (service: string) => {
  const client: mongodb.MongoClient = await getClient();
  const connection = await client.db().collection("worker");
  const PostArray = await connection.find().toArray();
  const filterArray = PostArray.filter((obj: ServiceType) =>
    obj.services.find((ele) => ele === service)
  );
  return filterArray;
};

import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";
import { userDB } from "../user/user.schema";
import { requestType, requestSchema } from "./request.schema";
import { uuid } from "../utils/uuid";
import HttpError from "http-errors";

export const sendRequest = async (data: requestType, user: userDB) => {
  console.log(data);
  console.log(user);
  await requestSchema.validate(data).catch((err: any) => {
    throw { success: false, message: err.errors };
  });
  const client: mongodb.MongoClient = await getClient();
  const uniqueId = await uuid();
  const insertData = { client: user, ...data, uuid: uniqueId };
  console.log(insertData);
  const response = await client
    .db()
    .collection("request")
    .insertOne(insertData);
  if (response.insertedCount <= 0) {
    throw { process: false, message: "MongoDB Error" };
  }
  // sms logic should come here
  //send sms to worker using his phone number
  //send details like who has requested the service and the all the post details :)
  return { success: true, _id: response.insertedId };
};

export const findRequest = async (workerId: string) => {
  const client: mongodb.MongoClient = await getClient();
  const requestResult = await client
    .db()
    .collection("request")
    .find({ workerId: workerId, accepted: false })
    .toArray();
  if (requestResult.length == 0) {
    throw HttpError(404, "No request found");
  }
  return requestResult;
};

export const acceptRequest = async (postId: string) => {
  const client: mongodb.MongoClient = await getClient();
  const requestResult = await client
    .db()
    .collection("request")
    .updateOne(
      { _id: new mongodb.ObjectID(postId) },
      { $set: { accepted: true } }
    );

  return requestResult;
};
export const deleteRequest = async (postId: string) => {
  const client: mongodb.MongoClient = await getClient();
  const requestResult = await client
    .db()
    .collection("request")
    .deleteOne({ _id: new mongodb.ObjectID(postId) });
  return requestResult;
};

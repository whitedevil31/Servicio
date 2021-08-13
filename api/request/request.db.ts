import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";
import { userDB } from "../user/user.schema";
import { requestType, requestSchema, assignType } from "./request.schema";

import HttpError from "http-errors";

export const sendRequest = async (data: requestType, user: userDB) => {
  await requestSchema.validate(data).catch((err: any) => {
    throw HttpError(400, err.errors.toString());
  });
  const client: mongodb.MongoClient = await getClient();
  const insertData = { client: user, ...data };
  const response = await client
    .db()
    .collection("request")
    .insertOne(insertData);
  if (response.insertedCount <= 0) {
    HttpError(500, "Internal Server Error");
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
  if (requestResult.modifiedCount == 1) {
    const assignedTo = await client
      .db()
      .collection("request")
      .findOne({ _id: new mongodb.ObjectID(postId) });
    const worker = await client
      .db()
      .collection("users")
      .findOne({ _id: new mongodb.ObjectID(assignedTo.workerId) });
    const assign: assignType = {
      worker: worker.username,
      client: assignedTo.client.username,
      profession: assignedTo.services,
      timeslots: assignedTo.timeslots,
    };
    const assignConnection = await client
      .db()
      .collection("connections")
      .insertOne({ assign });
    if (assignConnection.insertedCount !== 1) {
      throw HttpError(500, "Could not assign worker and client");
    }
  }

  if (requestResult.matchedCount !== 1) {
    throw HttpError(404, "Request of that id could not be found");
  }
  if (requestResult.modifiedCount !== 1) {
    throw HttpError(
      409,
      "Request has either been processed already or Internal server error "
    );
  }
};
export const deleteRequest = async (postId: string) => {
  const client: mongodb.MongoClient = await getClient();
  const requestResult = await client
    .db()
    .collection("request")
    .deleteOne({ _id: new mongodb.ObjectID(postId) });
  if (requestResult.deletedCount !== 1) {
    throw HttpError(404, "Request could not be found");
  }
};

export const findAssignedWorkers = async (name: string) => {
  const client: mongodb.MongoClient = await getClient();
  const requestResult = await client
    .db()
    .collection("connections")
    .find({ "assign.client": name })
    .toArray();
  console.log(requestResult);
  return requestResult;
};
export const findAssignedWorks = async (workerId: string) => {
  const client: mongodb.MongoClient = await getClient();
  const assignedWorks = await client
    .db()
    .collection("request")
    .find({ workerId: workerId, accepted: true })
    .toArray();
  return assignedWorks;
};

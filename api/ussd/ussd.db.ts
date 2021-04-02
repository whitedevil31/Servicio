import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";

export const acceptRequestOnUssd = async (contact: string) => {
  const client: mongodb.MongoClient = await getClient();
  const requestResult = await client
    .db()
    .collection("request")
    .findOneAndUpdate(
      { workerContact: contact },
      { $set: { accepted: true } },
      { returnOriginal: false }
    );
  return requestResult;
};

export const rejectRequestOnUssd = async (contact: string) => {
  const client: mongodb.MongoClient = await getClient();
  const requestResult = await client
    .db()
    .collection("request")
    .deleteOne({ workerContact: contact });
  return requestResult;
};

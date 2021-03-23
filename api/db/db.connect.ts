import { MongoClient } from "mongodb";

let client: MongoClient;
export async function connectDB(): Promise<MongoClient> {
  client = await MongoClient.connect(process.env.MONGO_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✔️ Connected to Database.");
  return client;
}
export async function getClient(): Promise<MongoClient> {
  if (!client) {
    await connectDB();
  }
  return client;
}
export default connectDB;

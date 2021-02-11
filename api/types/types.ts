import mongodb from "mongodb";

export interface userDB {
  _id: mongodb.ObjectID;
  email: string;
  role: string;
  username: string;
}

export interface postType {
  productTitle: string;
}
export interface ServiceType {
  services: Array<string>;
}

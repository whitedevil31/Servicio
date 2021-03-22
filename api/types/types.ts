import mongodb from "mongodb";

export interface userDB {
  _id: mongodb.ObjectID;
  role: string;
  username: string;
  gender: string;
  age: number;
  residence: string;
}

export interface postType {
  productTitle: string;
}
export interface ServiceType {
  services: Array<string>;
}

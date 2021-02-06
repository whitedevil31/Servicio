export interface userType {
  email: string;
  id: string;
  role: string;

  info: { username: string; age: number };
}

export interface userDB {
  id?: string;
  email: string;
  password: string;
  _id: string;
  role: string;
  // username: string;
  // age: number;
  info: { username: string; age: number };
}

export interface postType {
  productTitle: string;
}

export interface errorType {
  Error: () => void;
}

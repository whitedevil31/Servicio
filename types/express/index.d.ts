declare namespace Express {
  interface User {
    username?: string;
  }
  interface Response {
    data: { username: string };
  }
}

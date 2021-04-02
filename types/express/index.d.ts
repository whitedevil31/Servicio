declare namespace Express {
  interface User {
    username: string;
    location: { latitude: number; longitude: number };
    role: string;
  }
  interface Response {
    data: { username: string };
  }
}

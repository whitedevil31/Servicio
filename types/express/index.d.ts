declare namespace Express {
  interface User {
    username: string;
    location: { latitude: number; longitude: number };
  }
}

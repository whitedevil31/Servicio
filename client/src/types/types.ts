export interface workerPost {
  services: string[];
  pay: number;
  user: {
    username: string;
    age: number;
  };
}
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface geoPosition {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
}

export interface userType {
  role: string;
  username: string;
  password: string;
  gender: string;
  age: number;
  residence: string;
  about: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
export interface UserDetails {
  role: string;
  username: string;
  password: string;
  gender: string;
  age: number;
  residence: string;
  about: string;
}

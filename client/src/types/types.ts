export interface workerPost {
  services: string[];
  pay: number;
  user: {
    username: string;
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

export interface FilterData {
  services: string[];
}

export interface nearbyWorker {
  user: {
    username: string;
  };
  pay: number;
  services: string[];
}

export interface Timeslot {
  startTime: string;
  endTime: string;
}

export interface SelectedTimeslot {
  startTime: string[];
  endTime: string[];
}

export interface SLOT {
  start: {
    startTime: string;
    startFormat: string;
  };
  end: {
    endTime: string;
    endFormat: string;
  };
}

export interface selectSlot {
  selectSlot: string;
}

export interface ADD {
  pay: string;
  services: [];
  workerId: string;
}

export interface DATA {
  pay: string;
  services: [];
  workerId: string;
}

export interface timeslotData {
  timeslots: SLOT;
  accepted: boolean;
  workerId?: string;
  services?: [];
  pay?: string;
}

export interface workerRequest {
  username: string;
}
export interface workerModal {
  workerData: {
    pay: string;
    services: [];
    timeslots: [];
    user: {
      _id: string;
      age: number;
      residence: string;
      username: string;
      about: string;
    };
  };
}

export interface AssignedClient {
  client: {
    username: string,
    residence: string;
  };
  pay: string,
  timeslots: SLOT;
}

import { userType } from "./user/user.schema";

var rad = function (x: any) {
  return (x * Math.PI) / 180;
};

interface Aray {
  _id: string;
  lat: string;
  long: string;
}

var getDistance = function (
  arr: any,
  userLocation: { latitude: number; longitude: number }
) {
  const userArray = [];
  var i;
  for (i = 0; i < arr.length; i++) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(
      parseFloat(arr[i].location.latitude) - userLocation.latitude
    );
    var dLong = rad(
      parseFloat(arr[i].location.longitude) - userLocation.longitude
    );
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(12.6149)) *
        Math.cos(rad(12.6819)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = (R * c) / 1000;
    if (d < 10) {
      userArray.push(arr[i]);
    }

    // returns the distance in meter
  }
  return userArray;
};

export default getDistance;

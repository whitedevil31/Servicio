import { CORDS } from "../../types/types";
var rad = function (x: number) {
  return (x * Math.PI) / 180;
};
var getDistance = function (
  filterArray: CORDS[],
  userLocation: { latitude: number; longitude: number }
) {
  const userArray = [];
  var i: number;
  for (i = 0; i < filterArray.length; i++) {
    var R = 6378137;
    var dLat = rad(
      parseFloat(filterArray[i].user.location.latitude) - userLocation.latitude
    );
    var dLong = rad(
      parseFloat(filterArray[i].user.location.longitude) -
        userLocation.longitude
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
      userArray.push(filterArray[i]);
    }
  }
  return userArray;
};

export default getDistance;

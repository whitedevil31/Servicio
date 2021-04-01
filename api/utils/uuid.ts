export const uuid: () => number = () => {
  var num: number = Math.floor(Math.random() * 90000) + 10000;
  return num;
};

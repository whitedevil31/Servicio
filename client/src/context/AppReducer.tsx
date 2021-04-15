export default (state: any, action: any) => {
  switch (action.type) {
    case "ADD_FILTER":
      return {
        workerData: action.payload,
      };
    default:
      return state;
  }
};

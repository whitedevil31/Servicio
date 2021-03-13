export default (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN_USER": {
      return { loggedIn: true };
    }
    default:
      return state;
  }
};

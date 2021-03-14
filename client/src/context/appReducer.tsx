export default (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN_USER": {
      return { loggedIn: true };
    }
    case "LOGOUT_USER": {
      return { loggedIn: false };
    }
    default:
      return state;
  }
};

export default (state: any, action: any) => {
    switch(action.type) {
      case 'LOGIN_USER':
        return {
          ...state
        }
      default:
        return state;
    }
  }
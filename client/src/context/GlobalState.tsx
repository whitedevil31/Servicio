import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

export interface globalState {
  loggedIn: boolean;
  login?: () => void;
}

const initialState = { loggedIn: false };

export const GlobalContext = createContext<globalState>(initialState);

export const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const login = () => {
    dispatch({
      type: "LOGIN_USER",
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        loggedIn: state.loggedIn,
        login,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state

export interface globalState {
  loggedIn: boolean;
  login?: () => void;
}

const initialState = { loggedIn: false };
// Create context
export const GlobalContext = createContext<globalState>(initialState);

// Provider component
export const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
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
  )
}
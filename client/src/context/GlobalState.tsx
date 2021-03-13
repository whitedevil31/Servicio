import React, { createContext, useReducer } from 'react';
import AppReducer from './appReducer'

// Initial state
const initialState = {
  signin: false
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function login() {
    dispatch({
      type: 'LOGIN_USER'
    });
  }

  function logout() {
    dispatch({
      type: 'LOGOUT_USER'
    });
  }

  return (<GlobalContext.Provider value={{
    signin: state.signin,
    login,
    logout
  }}>
    {children}
  </GlobalContext.Provider>);
}
import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
interface filters {
  pay: number;
}
export interface globalState {
  workerData: filters[];
  addFilter?: any;
}

const initialState = { workerData: [] };

export const GlobalContext = createContext<globalState>(initialState);

export const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  function addFilter(filters: any) {
    dispatch({
      type: "ADD_FILTER",
      payload: filters,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        workerData: state.workerData,
        addFilter,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

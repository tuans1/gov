import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AppContext = createContext(undefined);
// A "provider" is used to encapsulate only the
// components that needs the state in this context
function AppProvider({ children }) {
  const variables = {
    navigate: useNavigate(),
  };

  return (
    <AppContext.Provider value={variables}>{children}</AppContext.Provider>
  );
}

export { AppProvider, AppContext };

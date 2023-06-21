import React, { createContext, useState } from 'react'

export const LoginContext = createContext("");

const ContextAdmin = ({ children }) => {
  const [loginadmin, setLoginAdmin] = useState("");
  return (
    <>
      <LoginContext.Provider value={{loginadmin, setLoginAdmin}}>
        {children}
      </LoginContext.Provider>
    </>
  );
};

export default ContextAdmin;
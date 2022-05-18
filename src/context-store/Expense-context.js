import React, { useState } from "react";

const ExpenseContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const ExpenseContextProvider = (props) => {
  const initialToken = localStorage.getItem("UserId");
  const [token, setToken] = useState(initialToken);

  const userIsLoggedin = !!token;

  const loginHandler = (token, email) => {
    setToken(token);
    
    localStorage.setItem("UserId", email);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("UserId");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedin,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;

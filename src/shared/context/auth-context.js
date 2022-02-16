import React, { useState } from 'react';

const AuthContext = React.createContext({
  userId: null,
  token: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const loginHandler = (uid, token) => {
    setUserId(uid);
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  const authState = {
    userId,
    token,
    isLoggedIn: !!token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authState}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

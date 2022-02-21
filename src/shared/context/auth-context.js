import React, { useState, useCallback, useEffect } from 'react';

const AuthContext = React.createContext({
  token: null,
  tokenExpiredIn: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

let logoutTimer;

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [tokenExpiredIn, setTokenExpiredIn] = useState(null);

  const loginHandler = useCallback((token, expirationDate) => {
    setToken(token);
    const tokenExpirationDate =
      expirationDate ||
      new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000);
    setTokenExpiredIn(tokenExpirationDate);
    localStorage.setItem(
      'piano-teacher-token',
      JSON.stringify({ token, expiredIn: tokenExpirationDate.toISOString() })
    );
  }, []);

  const logoutHandler = useCallback(() => {
    setToken(null);
    setTokenExpiredIn(null);
    localStorage.removeItem('piano-teacher-token');
  }, []);

  // Check token in local storage and auto-login
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('piano-teacher-token'));
    if (
      userData &&
      userData.token &&
      new Date(userData.expiredIn) > new Date()
    ) {
      loginHandler(userData.token, new Date(userData.expiredIn));
    }
  }, [loginHandler]);

  // Auto-logout if token is expired
  useEffect(() => {
    if (token && tokenExpiredIn) {
      const remainingTime = tokenExpiredIn.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logoutHandler, tokenExpiredIn]);

  const authState = {
    token,
    tokenExpiredIn,
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

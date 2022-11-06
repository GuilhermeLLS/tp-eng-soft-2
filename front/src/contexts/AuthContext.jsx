import { createContext, useState } from 'react';

export const AuthContext = createContext({
  logout: () => {},
  authenticate: () => {},
  isAuthenticated: false,
  getLoggedUser: () => {},
});

AuthContext.displayName = 'AuthContext';

export function AuthProvider({ children }) {
  const localTokens =
    localStorage.getItem('token')?.length > 0 && localStorage.getItem('user')?.length > 0;
  const [isAuthenticated, setIsAuthenticated] = useState(() => localTokens);

  function authenticate({ token, userInfo }) {
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
    localStorage.setItem('user', userInfo);
  }

  function logout() {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  function getLoggedUser() {
    return localStorage.getItem('user');
  }

  return (
    <AuthContext.Provider value={{ authenticate, isAuthenticated, getLoggedUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

import React, { useState } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
 // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: '', username: '', role: '', userId:'' });
  const [token, setToken] = useState('');

  const updateTokenOnLogin = (userData,token) => {
   // setIsAuthenticated(true);
    setUser(userData);
    setToken(token);
  };

  const rmTokenOnLogout = () => {
   // setIsAuthenticated(false);
    setUser({ name: '', username: '', role: '', userId:'' });
    setToken('')
  };

  return (
    <AuthContext.Provider value={{ user, rmTokenOnLogout, updateTokenOnLogin, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

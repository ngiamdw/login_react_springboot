import React, { useState } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: '', username: '', role: '', userId:'' });

  const updateAuthOnLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const updateAuthOnLogout = () => {
    setIsAuthenticated(false);
    setUser({ name: '', username: '', role: '', userId:'' });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, updateAuthOnLogin, updateAuthOnLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

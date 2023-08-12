import  { createContext } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  user:  { name: '', username: '', role: '', userId:'' },
  updateAuthOnLogin: () => {},
  updateAuthOnLogout: () => {}
});

export default AuthContext;

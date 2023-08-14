import  { createContext } from 'react';

const AuthContext = createContext({
  user:  { name: '', username: '', role: '', userId:'' },
  token:  '',
  rmTokenOnLogout: () => {},
  updateTokenOnLogin: () => {}
});

export default AuthContext;

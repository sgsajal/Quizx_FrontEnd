import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || null);
  const [userid, setuserid] = useState(localStorage.getItem('userid') || null);
  const [username, setusername] = useState(localStorage.getItem('username') || null);
  return (
    <AuthContext.Provider value={{ token, setToken ,userid,setuserid,username,setusername}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

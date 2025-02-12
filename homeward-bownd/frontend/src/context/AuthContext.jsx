import axios from 'axios';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const login = async (name, email) => {
    try {
      await axios.post('https://frontend-take-home-service.fetch.com/auth/login', 
        { name, email }, 
        { withCredentials: true }
      );
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post('https://frontend-take-home-service.fetch.com/auth/logout', 
        {}, 
        { withCredentials: true }
      );
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
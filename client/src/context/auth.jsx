import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [emailForVerification, setEmailForVerification] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const user = authService.getCurrentUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const { user, error } = await authService.login(email, password);
    if (user) {
      setCurrentUser(user);
    }
    return { user, error };
  };

  const signup = async (email, password, role) => {
    const { error } = await authService.signup(email, password, role);
    if (!error) {
      setEmailForVerification(email);
    }
    return { error };
  };

  const verifyOtp = async (email, otp, role) => {
    const { user, error } = await authService.verifyOtp(email, otp, role);
    if (user) {
      setCurrentUser(user);
    }
    return { user, error };
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, verifyOtp, emailForVerification, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
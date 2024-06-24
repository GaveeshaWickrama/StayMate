import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [emailForVerification, setEmailForVerification] = useState('');
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = authService.getCurrentUser();
      const storedToken = authService.getToken();
      setCurrentUser(user);
      setToken(storedToken);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const { user, error } = await authService.login(email, password);
    if (user) {
      setCurrentUser(user);
      setToken(authService.getToken());
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
      setToken(authService.getToken());
    }
    return { user, error };
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, token, loading, login, signup, verifyOtp, emailForVerification, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



import React, { createContext, useCallback, useMemo, useState } from 'react';
import { apiRequest } from '../utils/api';

export const AppContext = createContext({
  isLoggedIn: false,
  currentUser: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const login = useCallback(async (identifier, password) => {
    try {
      const data = await apiRequest('/login', 'POST', { identifier, password });
      if (!data?.ok) return false;
      setCurrentUser({
        id: data.user?.id ?? null,
        username: data.user?.username ?? identifier,
        email: data.user?.email ?? null,
        roles: data.user?.roles ?? [],
        name: data.user?.name ?? null,
      });
      return true;
    } catch (error) {
      console.warn('Login failed:', error?.message || error);
      return false;
    }
  }, []);

  const register = useCallback(async (email, password) => {
    try {
      const data = await apiRequest('/register', 'POST', { email, password });
      if (!data?.ok) return false;
      return true;
    } catch (error) {
      console.warn('Registration failed:', error?.message || error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn: !!currentUser,
      currentUser,
      login,
      register,
      logout,
    }),
    [currentUser, login, register, logout],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;

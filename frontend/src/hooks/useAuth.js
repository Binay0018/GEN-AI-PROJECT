import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import * as authApi from '../services/auth.api';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');

  const { user, setUser, loading, setLoading, initialized, setInitialized } = context;

  useEffect(() => {
    if (initialized) return;

    const bootstrap = async () => {
      setLoading(true);
      try {
        const data = await authApi.profile();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    bootstrap();
  }, [initialized, setUser, setLoading, setInitialized]);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await authApi.login({ email, password });
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const data = await authApi.register({ name, email, password });
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, login, register, logout };
}

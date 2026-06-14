import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading, initialized, setInitialized }}
    >
      {children}
    </AuthContext.Provider>
  );
}

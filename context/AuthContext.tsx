// context/AuthContext.tsx
import React, { useState, createContext, useContext, FunctionComponent, ReactNode } from 'react';

type AuthContextType = {
  token: string | null;
  authError: string | null; // new error state
  setToken: (token: string | null) => void;
  setAuthError: (error: string | null) => void; // new error setter function
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null); // initialize new error state

  return (
    <AuthContext.Provider value={{ token, setToken, authError, setAuthError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

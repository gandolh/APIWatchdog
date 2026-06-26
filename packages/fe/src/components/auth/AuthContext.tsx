import { createContext, useContext, useState, type ReactNode } from 'react';
import type { IUser } from '@apiwatchdog/shared';

interface AuthContextValue {
  currentUser: IUser | null;
  setCurrentUser: (user: IUser | null) => void;
}

const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  setCurrentUser: () => undefined,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

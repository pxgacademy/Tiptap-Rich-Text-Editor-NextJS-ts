"use client";

import { LocalUserInputs } from "@/lib/types";
import { getUserLocal, removeUserLocal, setUserLocal } from "@/utils/localUser";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: LocalUserInputs | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  login: (user: LocalUserInputs) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LocalUserInputs | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = getUserLocal();
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  const login = (user: LocalUserInputs) => {
    setUser(user);
    setUserLocal(user);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    removeUserLocal();
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

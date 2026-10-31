import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../api/axios";
import type { User } from "../types";

type AuthCtx = {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx>(null!);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get("/users/profile-data");
      const u = data.data?.user ?? data.user ?? data.data;
      setUser(u);
      if (u?._id) localStorage.setItem("userId", u._id);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (token) refreshUser();
    else setUser(null);
  }, [token, refreshUser]);

  const login = (t: string) => {
    localStorage.setItem("token", t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
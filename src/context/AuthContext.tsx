import { useState, useEffect, useCallback } from "react";
import { login as loginService, logout as logoutService } from "@/services/auth.service";
import { api } from "@/config/axios";
import type { User } from "@/types/auth.type";
import { AuthContext } from "@/hooks/use-auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser({ userId, token });
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginService({ email, password });
      setUser({ userId: data.userId, token: data.token });
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);
    } catch (err: any) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutService();
    } finally {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook helper agar mudah dipakai

// src/context/AuthContext.tsx (MODIFIKASI/BARU)

import { useState, useEffect, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import * as authService from "@/services/auth.service"; // Sesuaikan path jika perlu
import { api } from "@/config/axios";
import type { User } from "@/types/auth.type";
import { AuthContext } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import config from "@/config";

// 1. Tentukan interface berdasarkan contoh token Anda
interface DecodedToken {
  email: string;
  exp: number;
  iat: number;
  role: string;
  sub: string; // 'sub' (subject) biasanya adalah user ID
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Mulai loading saat cek token
  const navigate = useNavigate();

  // 2. Cek token di localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const token = localStorage.getItem(config.keyToken);
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);

        // Cek apakah token sudah expired
        if (decodedToken.exp * 1000 > Date.now()) {
          // Token valid
          setUser({
            id: decodedToken.sub,
            email: decodedToken.email,
            role: decodedToken.role,
          });
          setIsAuthenticated(true);
          // Set header axios untuk request selanjutnya
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          // Token expired
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Failed to decode token", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false); // Selesai cek token
  }, []);

  // 3. Bungkus fungsi login dari service Anda
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Panggil service login Anda
      const { token } = await authService.login({ email, password });

      if (token) {
        // Jika login sukses (token ada), decode dan simpan user state
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUser({
          id: decodedToken.sub,
          email: decodedToken.email,
          role: decodedToken.role,
        });
        setIsAuthenticated(true);
      }
    } catch (error) {
      // Jika login gagal, pastikan state bersih
      setUser(null);
      setIsAuthenticated(false);
      throw error; // Lempar error agar bisa ditangani di halaman Login
    } finally {
      setLoading(false);
    }
  };

  // 4. Bungkus fungsi logout dari service Anda
  const logout = () => {
    authService.logout(); // Service ini sudah menghapus token & header
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>{children}</AuthContext.Provider>;
}

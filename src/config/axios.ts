import axios from "axios";
import { toast } from "sonner";
import configGlobal from ".";

export const api = axios.create({
  baseURL: configGlobal.apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(configGlobal.keyToken);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.warning("Sesi anda sudah habis. Login kembali!");
      if (typeof window !== "undefined") {
        const currentUrl = encodeURIComponent(window.location.href);
        localStorage.clear();
        window.location.href = `/login/?redirectUrl=${currentUrl}`;
      }
    }
    return Promise.reject(error);
  }
);

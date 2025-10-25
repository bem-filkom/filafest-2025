import config from "@/config";
import { api } from "@/config/axios";

export const login = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { message, data } = response.data;

    // simpan token ke localStorage
    if (data?.token) {
      localStorage.setItem(config.keyToken, data.token);
      // set token ke header default axios
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    }

    return {
      message,
      userId: data?.userId,
      token: data?.token,
    };
  } catch (error: any) {
    if (error.response?.data) {
      const { message, data } = error.response.data;

      if (Array.isArray(data?.errors)) {
        const messages = data.errors.map((err: any) => `${err.field}: ${err.message}`).join("\n");
        throw new Error(messages);
      }

      if (typeof data?.errors === "string") {
        throw new Error(data.errors);
      }

      throw new Error(message || "Terjadi kesalahan saat login");
    }

    throw new Error("Tidak dapat terhubung ke server. Coba lagi nanti.");
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem(config.keyToken);

    delete api.defaults.headers.common["Authorization"];

    return { message: "User Logged Out Successfully" };
  } catch (error: any) {
    throw new Error(error || "Logout failed");
  }
};

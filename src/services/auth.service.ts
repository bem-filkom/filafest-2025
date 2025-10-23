import { api } from "@/config/axios";

export const login = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { message, data } = response.data;

    // simpan token ke localStorage
    if (data?.token) {
      localStorage.setItem("token", data.token);
      // set token ke header default axios
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    }

    return {
      message,
      userId: data?.userId,
      token: data?.token,
    };
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("token");

    delete api.defaults.headers.common["Authorization"];

    return { message: "User Logged Out Successfully" };
  } catch (error: any) {
    console.error("Logout failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

import { useEffect, useState } from "react";
import { api } from "@/config/axios";

const apiService = {
  async get(endpoint: string) {
    try {
      const response = await api.get(endpoint);

      return { data: response.data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.response?.data?.message || error.message || "Terjadi kesalahan.",
      };
    }
  },
};

export const useFetch = <T>(endpoint: string | null) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await apiService.get(endpoint);
      setData(data.data);
      setError(error);
      setLoading(false);
    };
    fetchData();
  }, [endpoint]);

  return { data, error, loading };
};

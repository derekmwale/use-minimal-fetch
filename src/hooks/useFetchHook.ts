import { useEffect, useState } from "react";
import api from "../lib/api";

interface FetchOptions {
  lazy?: boolean;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

export const useFetchHook = <T = any>(url: string, options: FetchOptions = {}) => {
  const { lazy = false, params, headers } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!lazy);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get<T>(url, { params, headers });
      setData(res.data);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!lazy) fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};

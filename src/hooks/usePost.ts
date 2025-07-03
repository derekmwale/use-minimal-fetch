import { useState } from "react";
import api from "../lib/api";

interface PostOptions {
  headers?: Record<string, string>;
}

export const usePost = <T = any, R = any>(url: string, options: PostOptions = {}) => {
  const { headers } = options;

  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const post = async (payload: T) => {
    setLoading(true);
    try {
      const res = await api.post<R>(url, payload, { headers });
      setData(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, post };
};

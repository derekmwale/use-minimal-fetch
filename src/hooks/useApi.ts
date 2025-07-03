import { useState, useEffect } from "react";
import api from "../lib/api";

type Method = "get" | "post" | "put" | "patch" | "delete";

interface ApiOptions {
  method?: Method;
  lazy?: boolean;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  body?: any;
}

export const useApi = <T = any>(url: string, options: ApiOptions = {}) => {
  const {
    method = "get",
    lazy = method !== "get", // GET auto-loads, others wait
    params,
    headers,
    body
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!lazy);
  const [error, setError] = useState<any>(null);

  const execute = async (overrideBody?: any) => {
    setLoading(true);
    try {
      const config = { params, headers };
      const payload = overrideBody ?? body;

      let res;
      switch (method) {
        case "get":
          res = await api.get<T>(url, config);
          break;
        case "post":
          res = await api.post<T>(url, payload, config);
          break;
        case "put":
          res = await api.put<T>(url, payload, config);
          break;
        case "patch":
          res = await api.patch<T>(url, payload, config);
          break;
        case "delete":
          res = await api.delete<T>(url, config);
          break;
      }

      setData(res?.data ?? null);
      setError(null);
      return res?.data;
    } catch (err) {
      setError(err);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!lazy && method === "get") {
      execute();
    }
  }, [url]);

  return { data, loading, error, execute };
};

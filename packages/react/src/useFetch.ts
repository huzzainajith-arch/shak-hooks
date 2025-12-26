import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseFetchOptions extends RequestInit {
  immediate?: boolean;
}

export interface UseFetchReturn<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  execute: () => Promise<void>;
  abort: () => void;
}

export function useFetch<T = any>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  const { immediate = true, ...fetchOptions } = options;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json = await response.json();
      setData(json);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  }, [url, JSON.stringify(fetchOptions)]);

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
    return () => {
      abort();
    };
  }, [execute, immediate, abort]);

  return { data, error, loading, execute, abort };
}

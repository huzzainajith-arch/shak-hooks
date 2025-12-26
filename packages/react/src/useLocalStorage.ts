import { useState, useEffect, useCallback } from 'react';
import {
  isBrowser,
  defaultSerializer,
  defaultDeserializer,
  StorageOptions
} from '@shak-hooks/core';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: StorageOptions<T> = {}
) {
  const {
    serializer = defaultSerializer,
    deserializer = defaultDeserializer
  } = options;

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isBrowser) return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (isBrowser) {
        window.localStorage.setItem(key, serializer(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, serializer, storedValue]);

  useEffect(() => {
    if (!isBrowser) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        setStoredValue(deserializer(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, deserializer]);

  return [storedValue, setValue] as const;
}

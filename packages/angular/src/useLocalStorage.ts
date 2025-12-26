import { signal, WritableSignal, effect } from '@angular/core';
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
): WritableSignal<T> {
  const {
    serializer = defaultSerializer,
    deserializer = defaultDeserializer
  } = options;

  // Initialize signal
  let startValue = initialValue;
  if (isBrowser) {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        startValue = deserializer(item);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const value = signal<T>(startValue);

  // Sync to localStorage
  effect(() => {
    const current = value();
    if (!isBrowser) return;
    try {
      if (current === null || current === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, serializer(current));
      }
    } catch (error) {
      console.error(error);
    }
  });

  // Listen for storage events
  if (isBrowser) {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        value.set(deserializer(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    // Note: Cleanup in Angular functions is tricky without a DestroyRef context or similar.
    // For a simple function, we might leak this listener if not careful.
    // Ideally this should be a service or use `DestroyRef` if available in the injection context.
  }

  return value;
}

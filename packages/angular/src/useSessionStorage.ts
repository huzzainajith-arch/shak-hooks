import { signal, WritableSignal, effect, inject, DestroyRef } from '@angular/core';
import {
  isBrowser,
  defaultSerializer,
  defaultDeserializer,
  StorageOptions
} from '@shak-hooks/core';

export function useSessionStorage<T>(
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
      const item = window.sessionStorage.getItem(key);
      if (item) {
        startValue = deserializer(item);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const value = signal<T>(startValue);

  // Sync to sessionStorage
  effect(() => {
    const current = value();
    if (!isBrowser) return;
    try {
      if (current === null || current === undefined) {
        window.sessionStorage.removeItem(key);
      } else {
        window.sessionStorage.setItem(key, serializer(current));
      }
    } catch (error) {
      console.error(error);
    }
  });

  // Listen for storage events
  if (isBrowser) {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.storageArea === window.sessionStorage && e.newValue !== null) {
        value.set(deserializer(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    try {
      const destroyRef = inject(DestroyRef);
      destroyRef.onDestroy(() => {
        window.removeEventListener('storage', handleStorageChange);
      });
    } catch (e) {}
  }

  return value;
}

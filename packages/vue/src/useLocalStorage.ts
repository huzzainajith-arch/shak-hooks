import { ref, watch, onMounted, onUnmounted } from 'vue';
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

  const storedValue = ref<T>(initialValue) as any;

  if (isBrowser) {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        storedValue.value = deserializer(item);
      }
    } catch (error) {
      console.error(error);
    }
  }

  watch(storedValue, (newValue) => {
    if (!isBrowser) return;
    try {
      if (newValue === null || newValue === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, serializer(newValue));
      }
    } catch (error) {
      console.error(error);
    }
  }, { deep: true });

  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === key && e.newValue !== null) {
      storedValue.value = deserializer(e.newValue);
    }
  };

  onMounted(() => {
    if (isBrowser) {
      window.addEventListener('storage', handleStorageChange);
    }
  });

  onUnmounted(() => {
    if (isBrowser) {
      window.removeEventListener('storage', handleStorageChange);
    }
  });

  return storedValue;
}

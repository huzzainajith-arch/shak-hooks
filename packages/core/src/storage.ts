import { isBrowser } from "./utils";

export interface StorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

export const defaultSerializer = (value: any) => JSON.stringify(value);
export const defaultDeserializer = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export function getStorageItem<T>(
  key: string,
  storage: Storage | undefined,
  deserializer: (value: string) => T = defaultDeserializer
): T | null {
  if (!isBrowser || !storage) return null;
  try {
    const value = storage.getItem(key);
    return value ? deserializer(value) : null;
  } catch {
    return null;
  }
}

export function setStorageItem<T>(
  key: string,
  value: T,
  storage: Storage | undefined,
  serializer: (value: T) => string = defaultSerializer
): void {
  if (!isBrowser || !storage) return;
  try {
    storage.setItem(key, serializer(value));
  } catch (e) {
    console.error(e);
  }
}

export function removeStorageItem(
  key: string,
  storage: Storage | undefined
): void {
  if (!isBrowser || !storage) return;
  try {
    storage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
}

import { signal } from '@angular/core';

export function useCopyToClipboard() {
  const value = signal<string | null>(null);
  const error = signal<Error | null>(null);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      value.set(text);
      error.set(null);
      return true;
    } catch (e) {
      error.set(e as Error);
      value.set(null);
      return false;
    }
  };

  return { value, copy, error };
}

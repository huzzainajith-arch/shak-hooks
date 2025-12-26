import { useState } from 'react';

export function useCopyToClipboard() {
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setValue(text);
      setError(null);
      return true;
    } catch (e) {
      setError(e as Error);
      setValue(null);
      return false;
    }
  };

  return [value, copy, error] as const;
}

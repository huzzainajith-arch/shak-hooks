import { useState } from 'react';

export function useDefault<T>(initialValue: T, defaultValue: T) {
  const [state, setState] = useState<T | undefined | null>(initialValue);
  return [state === undefined || state === null ? defaultValue : state, setState] as const;
}

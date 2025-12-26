import { useEffect } from 'react';

export function useLogger(name: string, ...rest: any[]) {
  useEffect(() => {
    console.log(`${name} mounted`, ...rest);
    return () => console.log(`${name} unmounted`);
  }, []);

  useEffect(() => {
    console.log(`${name} updated`, ...rest);
  });
}

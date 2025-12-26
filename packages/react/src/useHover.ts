import { useState, RefObject } from 'react';
import { useEventListener } from './useEventListener';

export function useHover<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>
): boolean {
  const [value, setValue] = useState<boolean>(false);

  const handleMouseEnter = () => setValue(true);
  const handleMouseLeave = () => setValue(false);

  useEventListener('mouseenter', handleMouseEnter, elementRef.current);
  useEventListener('mouseleave', handleMouseLeave, elementRef.current);

  return value;
}

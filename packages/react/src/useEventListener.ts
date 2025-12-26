import { useEffect, useRef } from 'react';
import { isBrowser } from '@shak-hooks/core';

export function useEventListener(
  eventName: string,
  handler: (event: any) => void,
  element?: EventTarget | null
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement: EventTarget | Window = element || (isBrowser ? window : null) as any;
    if (!isBrowser || !targetElement) return;

    const eventListener = (event: Event) => savedHandler.current(event);

    targetElement.addEventListener(eventName, eventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

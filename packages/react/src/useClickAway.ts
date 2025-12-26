import { RefObject, useEffect, useRef } from 'react';
import { useEventListener } from './useEventListener';

export function useClickAway<T extends Event = Event>(
  ref: RefObject<HTMLElement | null>,
  handler: (event: T) => void,
  events: string[] = ['mousedown', 'touchstart']
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (event: any) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      savedHandler.current(event);
    };

    for (const eventName of events) {
      document.addEventListener(eventName, listener);
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, listener);
      }
    };
  }, [ref, events]);
}

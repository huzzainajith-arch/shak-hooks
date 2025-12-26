import { unref } from 'vue';
import { useEventListener, MaybeRef } from './useEventListener';

export function useClickAway(
  target: MaybeRef<HTMLElement | null | undefined>,
  handler: (event: Event) => void,
  events: string[] = ['mousedown', 'touchstart']
) {
  const listener = (event: Event) => {
    const el = unref(target);
    if (!el) return;

    if (el === event.target || event.composedPath().includes(el)) {
      return;
    }

    handler(event);
  };

  events.forEach((event) => {
    useEventListener(window, event, listener);
  });
}

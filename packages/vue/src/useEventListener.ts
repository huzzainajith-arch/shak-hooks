import { onMounted, onUnmounted, watch, isRef, unref, Ref } from 'vue';
import { isBrowser } from '@shak-hooks/core';

export type MaybeRef<T> = T | Ref<T>;

export function useEventListener(
  target: MaybeRef<EventTarget | null | undefined>,
  event: string,
  listener: (event: any) => void,
  options?: boolean | AddEventListenerOptions
): () => void;

export function useEventListener(
  event: string,
  listener: (event: any) => void,
  options?: boolean | AddEventListenerOptions
): () => void;

export function useEventListener(...args: any[]) {
  if (!isBrowser) return () => {};

  let target: MaybeRef<EventTarget | null | undefined>;
  let event: string;
  let listener: any;
  let options: boolean | AddEventListenerOptions | undefined;

  if (typeof args[0] === 'string') {
    target = window;
    event = args[0];
    listener = args[1];
    options = args[2];
  } else {
    target = args[0];
    event = args[1];
    listener = args[2];
    options = args[3];
  }

  let cleanup = () => {};

  const stop = () => {
    cleanup();
  };

  const start = () => {
    stop();
    const el = unref(target);
    
    if (!el) return;

    (el as EventTarget).addEventListener(event, listener, options);
    cleanup = () => (el as EventTarget).removeEventListener(event, listener, options);
  };

  if (isRef(target)) {
    watch(target, () => start(), { immediate: true });
  } else {
    onMounted(start);
  }

  onUnmounted(stop);

  return stop;
}

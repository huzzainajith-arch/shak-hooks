import { effect, inject, DestroyRef, ElementRef, Signal } from '@angular/core';
import { isBrowser } from '@shak-hooks/core';

export function useEventListener(
  target: EventTarget | Signal<EventTarget | null> | ElementRef | string,
  eventNameOrHandler: string | ((event: any) => void),
  handler?: (event: any) => void
) {
  if (!isBrowser) return;

  let eventName: string;
  let listener: (event: any) => void;
  let targetSource: any = target;

  if (typeof target === 'string') {
    eventName = target;
    listener = eventNameOrHandler as any;
    targetSource = window;
  } else {
    eventName = eventNameOrHandler as string;
    listener = handler!;
  }

  let cleanup = () => {};

  const register = (el: EventTarget | null) => {
    cleanup();
    if (!el) return;
    el.addEventListener(eventName, listener);
    cleanup = () => el.removeEventListener(eventName, listener);
  };

  if (typeof targetSource === 'function') {
     effect(() => {
         register(targetSource());
     });
  } else if (targetSource instanceof ElementRef) {
      register(targetSource.nativeElement);
  } else {
      register(targetSource);
  }

  try {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(cleanup);
  } catch (e) {}
}

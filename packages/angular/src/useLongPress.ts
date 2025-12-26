import { Injector, inject, DestroyRef } from '@angular/core';

export function useLongPress(
  callback: (e: any) => void,
  options: { threshold?: number; onStart?: (e: any) => void; onFinish?: (e: any) => void; onCancel?: (e: any) => void } = {},
  injector?: Injector
) {
  const { threshold = 400, onStart, onFinish, onCancel } = options;
  let timer: any = null;
  let isLongPress = false;
  
  const destroyRef = injector ? injector.get(DestroyRef) : inject(DestroyRef);

  const start = (event: any) => {
    if (onStart) onStart(event);
    isLongPress = false;
    timer = setTimeout(() => {
      isLongPress = true;
      callback(event);
    }, threshold);
  };

  const stop = (event: any) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (isLongPress) {
      if (onFinish) onFinish(event);
    } else {
      if (onCancel) onCancel(event);
    }
  };

  destroyRef.onDestroy(() => {
    if (timer) clearTimeout(timer);
  });

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
}

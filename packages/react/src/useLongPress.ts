import { useCallback, useRef } from 'react';

export function useLongPress(
  callback: (e: any) => void,
  options: { threshold?: number; onStart?: (e: any) => void; onFinish?: (e: any) => void; onCancel?: (e: any) => void } = {}
) {
  const { threshold = 400, onStart, onFinish, onCancel } = options;
  const timerRef = useRef<any>(null);
  const isLongPress = useRef(false);

  const start = useCallback(
    (event: any) => {
      if (onStart) onStart(event);
      isLongPress.current = false;
      timerRef.current = setTimeout(() => {
        isLongPress.current = true;
        callback(event);
      }, threshold);
    },
    [callback, threshold, onStart]
  );

  const stop = useCallback(
    (event: any) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (isLongPress.current) {
        if (onFinish) onFinish(event);
      } else {
        if (onCancel) onCancel(event);
      }
    },
    [onFinish, onCancel]
  );

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
}

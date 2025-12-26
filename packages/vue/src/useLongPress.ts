import { ref } from 'vue';

export function useLongPress(
  callback: (e: any) => void,
  options: { threshold?: number; onStart?: (e: any) => void; onFinish?: (e: any) => void; onCancel?: (e: any) => void } = {}
) {
  const { threshold = 400, onStart, onFinish, onCancel } = options;
  let timer: any = null;
  const isLongPress = ref(false);

  const start = (event: any) => {
    if (onStart) onStart(event);
    isLongPress.value = false;
    timer = setTimeout(() => {
      isLongPress.value = true;
      callback(event);
    }, threshold);
  };

  const stop = (event: any) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (isLongPress.value) {
      if (onFinish) onFinish(event);
    } else {
      if (onCancel) onCancel(event);
    }
  };

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
}

import { ref, watch, Ref, unref } from 'vue';

export function useThrottle<T>(value: Ref<T> | T, interval: number = 500) {
  const throttledValue = ref(unref(value)) as Ref<T>;
  let lastExecuted = Date.now();
  let timerId: any = null;

  const update = (newValue: T) => {
    if (Date.now() >= lastExecuted + interval) {
      lastExecuted = Date.now();
      throttledValue.value = newValue;
    } else {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        lastExecuted = Date.now();
        throttledValue.value = newValue;
      }, interval - (Date.now() - lastExecuted));
    }
  };

  watch(() => unref(value), update);

  return throttledValue;
}

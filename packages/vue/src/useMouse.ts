import { ref, readonly } from 'vue';
import { useEventListener } from './useEventListener';

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  useEventListener(window, 'mousemove', (event: MouseEvent) => {
    x.value = event.pageX;
    y.value = event.pageY;
  });

  return {
    x: readonly(x),
    y: readonly(y),
  };
}

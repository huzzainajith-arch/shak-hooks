import { ref, onMounted, onUnmounted } from 'vue';

export function useIdle(ms: number = 60000) {
  const idle = ref(false);
  let timeoutId: any = null;

  const handleEvent = () => {
    idle.value = false;
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      idle.value = true;
    }, ms);
  };

  const events = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];

  onMounted(() => {
    events.forEach((event) => window.addEventListener(event, handleEvent));
    timeoutId = setTimeout(() => {
      idle.value = true;
    }, ms);
  });

  onUnmounted(() => {
    events.forEach((event) => window.removeEventListener(event, handleEvent));
    if (timeoutId) clearTimeout(timeoutId);
  });

  return idle;
}

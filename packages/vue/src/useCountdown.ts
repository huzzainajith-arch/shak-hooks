import { ref, onMounted, onUnmounted } from 'vue';

export function useCountdown(initialSeconds: number) {
  const count = ref(initialSeconds);
  let intervalId: any = null;

  const stop = () => {
    if (intervalId) clearInterval(intervalId);
  };

  const start = () => {
    stop();
    intervalId = setInterval(() => {
      if (count.value <= 0) {
        stop();
        count.value = 0;
      } else {
        count.value--;
      }
    }, 1000);
  };

  const reset = () => {
    stop();
    count.value = initialSeconds;
  };

  onMounted(start);
  onUnmounted(stop);

  return { count, start, stop, reset };
}

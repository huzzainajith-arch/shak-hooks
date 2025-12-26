import { ref, onMounted, onUnmounted } from 'vue';

export function useContinuousRetry(
  callback: () => boolean | Promise<boolean>,
  interval: number = 100,
  options: { maxRetries?: number } = {}
) {
  const hasResolved = ref(false);
  let intervalId: any = null;
  let retries = 0;

  const tick = async () => {
    if (hasResolved.value) return;

    if (options.maxRetries && retries >= options.maxRetries) {
      clearInterval(intervalId);
      return;
    }

    try {
      const result = await callback();
      if (result) {
        hasResolved.value = true;
        clearInterval(intervalId);
      }
    } catch (e) {
      // ignore
    }
    retries++;
  };

  onMounted(() => {
    intervalId = setInterval(tick, interval);
  });

  onUnmounted(() => {
    clearInterval(intervalId);
  });

  return hasResolved;
}

import { onMounted, onUnmounted, watch, toValue, MaybeRefOrGetter } from 'vue';

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export function useRandomInterval(
  callback: () => void,
  minDelay: MaybeRefOrGetter<number | null>,
  maxDelay: MaybeRefOrGetter<number | null>
) {
  let timeoutId: number | null = null;

  const clean = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const start = () => {
    clean();
    const min = toValue(minDelay);
    const max = toValue(maxDelay);

    if (typeof min === 'number' && typeof max === 'number') {
      const handleTick = () => {
        const nextTickAt = random(min, max);
        timeoutId = window.setTimeout(() => {
          callback();
          handleTick();
        }, nextTickAt);
      };
      handleTick();
    }
  };

  watch([() => toValue(minDelay), () => toValue(maxDelay)], start);

  onMounted(start);
  onUnmounted(clean);

  return clean;
}

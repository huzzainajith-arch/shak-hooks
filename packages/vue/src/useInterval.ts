import { onMounted, onUnmounted, watch, toValue, MaybeRefOrGetter } from 'vue';

export function useInterval(callback: () => void, delay: MaybeRefOrGetter<number | null>) {
  let id: any = null;

  const clean = () => {
    if (id) {
      clearInterval(id);
      id = null;
    }
  };

  const start = () => {
    clean();
    const d = toValue(delay);
    if (d !== null) {
      id = setInterval(callback, d);
    }
  };

  watch(() => toValue(delay), start);

  onMounted(start);
  onUnmounted(clean);
}

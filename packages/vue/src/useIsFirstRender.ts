import { ref, onMounted } from 'vue';

export function useIsFirstRender() {
  const isFirst = ref(true);
  onMounted(() => {
    isFirst.value = false;
  });
  return isFirst;
}

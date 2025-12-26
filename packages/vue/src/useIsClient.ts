import { ref, onMounted } from 'vue';

export function useIsClient() {
  const isClient = ref(false);
  onMounted(() => {
    isClient.value = true;
  });
  return isClient;
}

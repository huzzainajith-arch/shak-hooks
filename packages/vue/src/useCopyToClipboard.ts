import { ref } from 'vue';

export function useCopyToClipboard() {
  const value = ref<string | null>(null);
  const error = ref<Error | null>(null);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      value.value = text;
      error.value = null;
      return true;
    } catch (e) {
      error.value = e as Error;
      value.value = null;
      return false;
    }
  };

  return { value, copy, error };
}

import { ref, watchEffect, onUnmounted, toValue, MaybeRefOrGetter, Ref } from 'vue';

export interface UseFetchOptions extends RequestInit {
  immediate?: boolean;
}

export interface UseFetchReturn<T> {
  data: Ref<T | null>;
  error: Ref<Error | null>;
  loading: Ref<boolean>;
  execute: () => Promise<void>;
  abort: () => void;
}

export function useFetch<T = any>(
  url: MaybeRefOrGetter<string>,
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  const { immediate = true, ...fetchOptions } = options;
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(false);
  
  let abortController: AbortController | null = null;

  const abort = () => {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
  };

  const execute = async () => {
    loading.value = true;
    error.value = null;
    data.value = null;

    abort();

    const controller = new AbortController();
    abortController = controller;

    try {
      const response = await fetch(toValue(url), {
        ...fetchOptions,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json = await response.json();
      data.value = json;
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        error.value = err;
      }
    } finally {
      if (abortController === controller) {
        loading.value = false;
      }
    }
  };

  if (immediate) {
    watchEffect(() => {
      execute();
    });
  }

  onUnmounted(() => {
    abort();
  });

  return { data, error, loading, execute, abort } as UseFetchReturn<T>;
}

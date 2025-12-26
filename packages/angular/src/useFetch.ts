import { signal, effect, inject, DestroyRef, Signal } from '@angular/core';

export interface UseFetchOptions extends RequestInit {
  immediate?: boolean;
}

export function useFetch<T = any>(
  url: Signal<string> | string,
  options: UseFetchOptions = {}
) {
  const { immediate = true, ...fetchOptions } = options;
  const data = signal<T | null>(null);
  const error = signal<Error | null>(null);
  const loading = signal<boolean>(false);
  
  let abortController: AbortController | null = null;

  const abort = () => {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
  };

  const execute = async () => {
    const currentUrl = typeof url === 'string' ? url : url();
    
    loading.set(true);
    error.set(null);
    data.set(null);

    abort();

    const controller = new AbortController();
    abortController = controller;

    try {
      const response = await fetch(currentUrl, {
        ...fetchOptions,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json = await response.json();
      data.set(json);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        error.set(err);
      }
    } finally {
      if (abortController === controller) {
        loading.set(false);
      }
    }
  };

  if (immediate) {
    if (typeof url === 'function') {
        effect(() => {
            // Track url dependency
            url();
            execute();
        }, { allowSignalWrites: true });
    } else {
        execute();
    }
  }

  try {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => {
      abort();
    });
  } catch (e) {}

  return { data, error, loading, execute, abort };
}

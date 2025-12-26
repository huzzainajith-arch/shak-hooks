import { ref, onMounted, onUnmounted, readonly, Ref } from 'vue';
import { isBrowser } from '@shak-hooks/core';

export type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface UseScriptOptions {
  removeOnUnmount?: boolean;
}

export function useScript(src: string, options: UseScriptOptions = {}): Ref<ScriptStatus> {
  const { removeOnUnmount = false } = options;
  const status = ref<ScriptStatus>('idle');

  let script: HTMLScriptElement | null = null;

  const setStatusFromEvent = (event: Event) => {
    status.value = event.type === 'load' ? 'ready' : 'error';
  };

  onMounted(() => {
    if (!isBrowser || !src) return;

    script = document.querySelector(`script[src="${src}"]`);

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-status', 'loading');
      document.body.appendChild(script);
      status.value = 'loading';
    } else {
      status.value = script.getAttribute('data-status') as ScriptStatus || 'ready';
    }

    script.addEventListener('load', setStatusFromEvent);
    script.addEventListener('error', setStatusFromEvent);
  });

  onUnmounted(() => {
    if (script) {
      script.removeEventListener('load', setStatusFromEvent);
      script.removeEventListener('error', setStatusFromEvent);
      if (removeOnUnmount) {
        script.remove();
      }
    }
  });

  return readonly(status);
}

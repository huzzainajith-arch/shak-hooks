import { signal, inject, DestroyRef } from '@angular/core';
import { isBrowser } from '@shak-hooks/core';

export type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface UseScriptOptions {
  removeOnUnmount?: boolean;
}

export function useScript(src: string, options: UseScriptOptions = {}) {
  const { removeOnUnmount = false } = options;
  const status = signal<ScriptStatus>('idle');

  if (isBrowser && src) {
    let script: HTMLScriptElement | null = document.querySelector(`script[src="${src}"]`);

    const setStatusFromEvent = (event: Event) => {
      status.set(event.type === 'load' ? 'ready' : 'error');
    };

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-status', 'loading');
      document.body.appendChild(script);
      status.set('loading');
    } else {
      status.set(script.getAttribute('data-status') as ScriptStatus || 'ready');
    }

    script.addEventListener('load', setStatusFromEvent);
    script.addEventListener('error', setStatusFromEvent);

    try {
      const destroyRef = inject(DestroyRef);
      destroyRef.onDestroy(() => {
        if (script) {
          script.removeEventListener('load', setStatusFromEvent);
          script.removeEventListener('error', setStatusFromEvent);
          if (removeOnUnmount) {
            script.remove();
          }
        }
      });
    } catch (e) {}
  }

  return status;
}

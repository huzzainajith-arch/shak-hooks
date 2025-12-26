import { useState, useEffect } from 'react';
import { isBrowser } from '@shak-hooks/core';

export type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface UseScriptOptions {
  removeOnUnmount?: boolean;
}

export function useScript(src: string, options: UseScriptOptions = {}): ScriptStatus {
  const { removeOnUnmount = false } = options;
  const [status, setStatus] = useState<ScriptStatus>(() => {
    if (!isBrowser) return 'idle';
    const script = document.querySelector(`script[src="${src}"]`);
    return script ? 'ready' : 'idle';
  });

  useEffect(() => {
    if (!isBrowser || !src) {
      setStatus('idle');
      return;
    }

    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;

    if (script) {
      setStatus('ready');
    } else {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-status', 'loading');
      document.body.appendChild(script);
      setStatus('loading');

      const setAttributeFromEvent = (event: Event) => {
        const status = event.type === 'load' ? 'ready' : 'error';
        script?.setAttribute('data-status', status);
        setStatus(status);
      };

      script.addEventListener('load', setAttributeFromEvent);
      script.addEventListener('error', setAttributeFromEvent);
    }

    const setStateFromEvent = (event: Event) => {
      setStatus(event.type === 'load' ? 'ready' : 'error');
    };

    script.addEventListener('load', setStateFromEvent);
    script.addEventListener('error', setStateFromEvent);

    return () => {
      if (script) {
        script.removeEventListener('load', setStateFromEvent);
        script.removeEventListener('error', setStateFromEvent);
      }
      if (removeOnUnmount && script) {
        script.remove();
      }
    };
  }, [src, removeOnUnmount]);

  return status;
}

import { signal, Injector, inject, PLATFORM_ID } from '@angular/core';

export function useIsClient(injector?: Injector) {
  const platformId = injector ? injector.get(PLATFORM_ID) : inject(PLATFORM_ID);
  return signal(platformId === 'browser');
}

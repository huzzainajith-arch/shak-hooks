import {
  createEnvironmentInjector,
  Injector,
  PLATFORM_ID,
  Provider,
  runInInjectionContext,
  ɵINJECTOR_SCOPE,
} from "@angular/core";

export type AngularTestContext = {
  injector: Injector;
  run: <T>(fn: () => T) => T;
  destroy: () => void;
};

function findInjectorRecords(injector: any): Map<any, any> | undefined {
  const maybeRecords = injector?.records ?? injector?._records ?? injector?.ɵrecords;
  if (maybeRecords && typeof maybeRecords.get === "function" && typeof maybeRecords.entries === "function") {
    return maybeRecords as Map<any, any>;
  }
  return undefined;
}

function findTokenByName(injector: Injector, name: string): any | undefined {
  const records = findInjectorRecords(injector as any);
  if (!records) return undefined;

  for (const [token] of records.entries()) {
    if (token?.name === name) return token;
  }
  return undefined;
}

export function flushAngularEffects(injector: Injector) {
  const effectManagerToken = findTokenByName(injector, "EffectManager");
  if (!effectManagerToken) return;
  const effectManager = (injector as any).get(effectManagerToken);
  if (effectManager && typeof effectManager.flush === "function") effectManager.flush();
}

export function createAngularTestContext(extraProviders: Provider[] = []): AngularTestContext {
  const injector = createEnvironmentInjector(
    [
      { provide: ɵINJECTOR_SCOPE, useValue: "root" },
      { provide: PLATFORM_ID, useValue: "browser" },
      ...extraProviders,
    ],
    Injector.NULL as any
  );

  return {
    injector,
    run: (fn) => runInInjectionContext(injector, fn),
    destroy: () => {
      const destroy = (injector as any).destroy;
      if (typeof destroy === "function") destroy.call(injector);
    },
  };
}

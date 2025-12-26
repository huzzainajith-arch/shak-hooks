import { createApp, defineComponent } from 'vue';

export function withSetup<T>(hook: (...args: any[]) => T, args: any[] = []) {
  let result: T;
  const app = createApp(defineComponent({
    setup() {
      result = hook(...args);
      return () => {};
    }
  }));
  app.mount(document.createElement('div'));
  // @ts-ignore
  return { result, app };
}

import 'zone.js';
import 'zone.js/testing';

console.log('Zone defined:', !!(globalThis as any).Zone);
// @ts-ignore
console.log('FakeAsyncTestZoneSpec defined:', !!Zone.current.get('FakeAsyncTestZoneSpec'));
// @ts-ignore
console.log('FakeAsyncTestZoneSpec on Zone:', !!(Zone as any)['FakeAsyncTestZoneSpec']);


const { getTestBed } = await import('@angular/core/testing');
const {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} = await import('@angular/platform-browser-dynamic/testing');

try {
  getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );
} catch {
  // Ignore if already initialized
}


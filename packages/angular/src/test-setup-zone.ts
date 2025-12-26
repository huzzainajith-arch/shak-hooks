import 'zone.js';
import 'zone.js/testing';

// Ensure Zone is exposed
if (typeof window !== 'undefined') {
  (window as any).Zone = (globalThis as any).Zone;
}

// Intercept afterEach to prevent Angular from registering resetFakeAsyncZone
const originalAfterEach = (globalThis as any).afterEach;
(globalThis as any).afterEach = function(fn: any, timeout?: number) {
  if (fn.name === 'resetFakeAsyncZone' || fn.toString().includes('resetFakeAsyncZone')) {
    return;
  }
  if (originalAfterEach) {
    return originalAfterEach(fn, timeout);
  }
} as any;

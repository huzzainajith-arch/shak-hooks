# Shak Hooks Documentation

This library provides a collection of utility hooks for Angular, React, and Vue.

## Status
- **Angular:** All tests passed.
- **React:** All tests passed.
- **Vue:** All tests passed.

## Framework Docs

- React: `packages/react/README.md`
- Vue: `packages/vue/README.md`
- Angular: `packages/angular/README.md`
- More examples: `USAGE.md`, `EXAMPLES.md`

## Installation

```bash
npm install @shak-hooks/angular
# or
npm install @shak-hooks/react
# or
npm install @shak-hooks/vue
# or (convenience alias names)
npm install @shak-hooks/usehooks
npm install @shak-hooks/usehooks-vue
npm install @shak-hooks/usehooks-angular
```

## Available Hooks

| Hook | Description | Common use cases |
|------|-------------|------------------|
| `useBattery` | Tracks device battery state. | Power-saving UI, battery indicator |
| `useClickAway` | Triggers a callback when clicking outside a target element. | Close dropdowns, modals, popovers |
| `useContinuousRetry` | Retries a callback until it returns true (or max retries). | Poll "ready" flags, retry flaky APIs |
| `useCopyToClipboard` | Copies text to the clipboard. | Copy API keys, share links, invite codes |
| `useCountdown` | Manages a countdown timer. | OTP resend timer, quiz timer, redirects |
| `useCounter` | Counter state with helpers. | Quantity picker, pagination, stepper |
| `useDebounce` | Debounces a value/signal/ref. | Search input, autosave, expensive filters |
| `useDefault` | Applies a default when value is null/undefined. | Form defaults, optional config fallbacks |
| `useDocumentTitle` | Manages the document title. | Page titles, unread counts |
| `useEventListener` | Manages event listeners. | Keyboard shortcuts, scroll/resize listeners |
| `useFavicon` | Manages the document favicon. | Unread badge icon, status indicator |
| `useFetch` | Reactive fetch client. | Data fetching, loading/error state |
| `useGeolocation` | Tracks user geolocation. | Location-based content, maps |
| `useHistoryState` | Manages history state. | Persist UI state across back/forward |
| `useHover` | Tracks hover state for an element. | Tooltips, hover cards, prefetching |
| `useIdle` | Tracks user idle state. | Auto logout, pause polling, idle UI |
| `useIntersectionObserver` | Tracks element intersection. | Infinite scroll, lazy loading, reveal animations |
| `useInterval` | Runs a callback on an interval. | Polling, clocks, recurring updates |
| `useIntervalWhen` | Runs an interval gated by a condition. | Only poll when visible/online |
| `useIsClient` | Checks if code is running on the client. | Avoid SSR mismatch, client-only UI |
| `useIsFirstRender` | Indicates the first render. | Skip effects on first render |
| `useKeyPress` | Tracks key press events. | Shortcuts, games, input UX |
| `useList` | List state with helper actions. | Dynamic forms, todo lists |
| `useLocalStorage` | LocalStorage-backed state. | Persist theme, preferences |
| `useLockBodyScroll` | Locks body scroll. | Modal/drawer open behavior |
| `useLogger` | Logging helper. | Debug renders/lifecycle |
| `useLongPress` | Long-press detection. | Mobile context menu, press-and-hold |
| `useMap` | `Map` state with helper actions. | Caches, keyed collections |
| `useMeasure` | Measures element size and position. | Layout measurement, tooltip placement |
| `useMediaQuery` | Tracks media queries. | Responsive UI, prefers-color-scheme |
| `useMouse` | Tracks mouse position. | Cursor effects, hover-follow tooltips |
| `useNetworkState` | Tracks network connection state. | Offline banner, disable actions |
| `useObjectState` | Object state with merge update. | Form objects, partial updates |
| `useOrientation` | Tracks device orientation. | Rotate UI, orientation-specific layouts |
| `usePageLeave` | Triggers when the mouse leaves the page. | Exit-intent prompts, analytics |
| `usePreferredLanguage` | Tracks preferred language. | i18n default, locale selection |
| `usePrevious` | Tracks the previous value. | Compare changes, animations |
| `useQueue` | Queue state with helper actions. | Toast queue, jobs, uploads |
| `useRandomInterval` | Runs a callback at random intervals. | Jittered polling, randomized timers |
| `useRenderCount` | Counts component renders. | Debug performance, render tracking |
| `useRenderInfo` | Logs render timing/info. | Debug rendering, perf insights |
| `useScript` | Loads external scripts. | Google Maps SDK, analytics scripts |
| `useSessionStorage` | SessionStorage-backed state. | Wizard steps, temporary drafts |
| `useSet` | `Set` state with helper actions. | Multi-select, toggled item sets |
| `useThrottle` | Throttles a value. | Scroll handlers, resize events |
| `useTimeout` | Runs a callback after delay. | Delayed tooltips, delayed actions |
| `useToggle` | Boolean toggle state. | Modals, flags, on/off state |
| `useVisibilityChange` | Tracks document visibility. | Pause polling when hidden |
| `useWindowScroll` | Tracks window scroll position. | Scroll progress, sticky UI |
| `useWindowSize` | Tracks window size. | Responsive layout, canvas sizing |

## Detailed API Reference

### useBattery

Tracks the battery status of the device.

**Return Value:**
Object containing:
- `charging` (boolean): Whether the battery is currently charging.
- `chargingTime` (number): Seconds until fully charged.
- `dischargingTime` (number): Seconds until discharged.
- `level` (number): Battery level (0-1).

**Example (React):**
```tsx
import { useBattery } from '@shak-hooks/react';

const BatteryStatus = () => {
  const { level, charging } = useBattery();
  return (
    <div>
      Battery: {Math.round(level * 100)}%
      {charging ? ' (Charging)' : ''}
    </div>
  );
};
```

### useClickAway

Trigger a callback when the user clicks outside a specific element.

**Parameters:**
- `target`: The target element (Ref/Signal/Element).
- `handler`: Callback function.
- `events` (optional): Array of events to listen to (default: `['mousedown', 'touchstart']`).

**Example (Angular):**
```ts
import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { useClickAway } from '@shak-hooks/angular';

@Component({ ... })
export class ModalComponent {
  @ViewChild('modal') modalRef!: ElementRef;
  isOpen = signal(false);

  constructor() {
    useClickAway(this.modalRef, () => {
      this.isOpen.set(false);
    });
  }
}
```

### useCopyToClipboard

Copies text to the clipboard.

**Return Value:**
Object containing:
- `value`: The copied text (Signal/State).
- `copy`: Function to copy text. Returns a promise resolving to boolean (success).
- `error`: Error object if copy failed.

**Example (Vue):**
```vue
<script setup>
import { useCopyToClipboard } from '@shak-hooks/vue';

const { copy, value } = useCopyToClipboard();
</script>

<template>
  <button @click="copy('Hello!')">Copy</button>
  <span v-if="value">Copied: {{ value }}</span>
</template>
```

### useNetworkState

Tracks the state of the network connection.

**Return Value:**
Object containing:
- `online` (boolean): True if connected.
- `downlink` (number): Effective bandwidth estimate in Mb/s.
- `effectiveType` (string): 'slow-2g', '2g', '3g', or '4g'.
- `rtt` (number): Estimated round-trip time.

**Example (React):**
```tsx
import { useNetworkState } from '@shak-hooks/react';

const NetworkStatus = () => {
  const { online, effectiveType } = useNetworkState();
  
  return (
    <div>
      Status: {online ? 'Online' : 'Offline'}
      {online && <div>Type: {effectiveType}</div>}
    </div>
  );
};
```

---
*Note: This documentation covers a subset of the available hooks. The library follows a consistent pattern across frameworks.*

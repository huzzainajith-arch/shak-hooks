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

| Hook | Description |
|------|-------------|
| `useBattery` | Tracks device battery state. |
| `useClickAway` | Triggers a callback when clicking outside a target element. |
| `useContinuousRetry` | Continuously retries a callback until it returns true or max retries reached. |
| `useCopyToClipboard` | Copies text to the clipboard. |
| `useCountdown` | Manages a countdown timer. |
| `useCounter` | Manages a counter with min/max limits. |
| `useDebounce` | Debounces a value. |
| `useDefault` | Returns a default value if the state is null or undefined. |
| `useDocumentTitle` | Manages the document title. |
| `useEventListener` | Manages event listeners. |
| `useFavicon` | Manages the document favicon. |
| `useFetch` | reactive fetch client. |
| `useGeolocation` | Tracks user geolocation. |
| `useHistoryState` | Manages history state. |
| `useHover` | Tracks if an element is being hovered. |
| `useIdle` | Tracks user idle state. |
| `useIntersectionObserver` | Tracks element intersection. |
| `useInterval` | Manages intervals. |
| `useIntervalWhen` | Manages intervals with a condition. |
| `useIsClient` | Checks if code is running on the client. |
| `useKeyPress` | Tracks key press events. |
| `useList` | Manages a list state. |
| `useLocalStorage` | Manages localStorage. |
| `useLockBodyScroll` | Locks body scroll. |
| `useLogger` | Logger utility. |
| `useLongPress` | Tracks long press events. |
| `useMap` | Manages a Map state. |
| `useMeasure` | Measures element size and position. |
| `useMediaQuery` | Tracks media queries. |
| `useMouse` | Tracks mouse position. |
| `useNetworkState` | Tracks network connection state. |
| `useObjectState` | Manages an object state. |
| `useOrientation` | Tracks device orientation. |
| `usePageLeave` | Triggers when the mouse leaves the page. |
| `usePreferredLanguage` | Tracks preferred language. |
| `usePrevious` | Tracks the previous value of a state. |
| `useQueue` | Manages a queue. |
| `useRandomInterval` | Runs a callback at random intervals. |
| `useScript` | Loads external scripts. |
| `useSessionStorage` | Manages sessionStorage. |
| `useSet` | Manages a Set state. |
| `useThrottle` | Throttles a value. |
| `useTimeout` | Manages timeouts. |
| `useToggle` | Manages a boolean toggle state. |
| `useVisibilityChange` | Tracks document visibility. |
| `useWindowScroll` | Tracks window scroll position. |
| `useWindowSize` | Tracks window size. |

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

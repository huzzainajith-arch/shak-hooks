import { signal, inject, DestroyRef } from '@angular/core';
import { isBrowser } from '@shak-hooks/core';

export interface NetworkState {
  online: boolean;
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: string;
  rtt?: number;
  saveData?: boolean;
  type?: string;
}

function getConnection() {
  if (isBrowser && typeof navigator !== 'undefined') {
    return (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  }
  return null;
}

function getNetworkState(): NetworkState {
  const connection = getConnection();
  return {
    online: isBrowser ? navigator.onLine : true,
    downlink: connection?.downlink,
    downlinkMax: connection?.downlinkMax,
    effectiveType: connection?.effectiveType,
    rtt: connection?.rtt,
    saveData: connection?.saveData,
    type: connection?.type,
  };
}

export function useNetworkState() {
  const state = signal<NetworkState>(getNetworkState());

  if (isBrowser) {
    const handleStateChange = () => {
      state.set(getNetworkState());
    };

    window.addEventListener('online', handleStateChange);
    window.addEventListener('offline', handleStateChange);
    
    const connection = getConnection();
    if (connection) {
      connection.addEventListener('change', handleStateChange);
    }

    try {
      const destroyRef = inject(DestroyRef);
      destroyRef.onDestroy(() => {
        window.removeEventListener('online', handleStateChange);
        window.removeEventListener('offline', handleStateChange);
        if (connection) {
          connection.removeEventListener('change', handleStateChange);
        }
      });
    } catch (e) {}
  }

  return state;
}

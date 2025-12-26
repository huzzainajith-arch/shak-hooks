import { ref, onMounted, onUnmounted, readonly } from 'vue';
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
  const state = ref<NetworkState>(getNetworkState());

  const handleStateChange = () => {
    state.value = getNetworkState();
  };

  onMounted(() => {
    if (!isBrowser) return;
    window.addEventListener('online', handleStateChange);
    window.addEventListener('offline', handleStateChange);
    
    const connection = getConnection();
    if (connection) {
      connection.addEventListener('change', handleStateChange);
    }
  });

  onUnmounted(() => {
    if (!isBrowser) return;
    window.removeEventListener('online', handleStateChange);
    window.removeEventListener('offline', handleStateChange);
    
    const connection = getConnection();
    if (connection) {
      connection.removeEventListener('change', handleStateChange);
    }
  });

  return readonly(state);
}

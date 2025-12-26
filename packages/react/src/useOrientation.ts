import { useState, useEffect } from 'react';
import { isBrowser } from '@shak-hooks/core';

export interface OrientationState {
  angle: number;
  type: string;
}

const defaultState: OrientationState = {
  angle: 0,
  type: 'landscape-primary',
};

export function useOrientation(): OrientationState {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    if (!isBrowser) return;

    const handleChange = () => {
      const { angle, type } = window.screen.orientation;
      setState({ angle, type });
    };

    const handleOrientationChange = () => {
        // Fallback for older browsers
        setState({
            angle: Number(window.orientation) || 0,
            type: 'unknown'
        });
    }

    if (window.screen?.orientation) {
        handleChange();
        window.screen.orientation.addEventListener('change', handleChange);
    } else {
        window.addEventListener('orientationchange', handleOrientationChange);
    }

    return () => {
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', handleChange);
      } else {
        window.removeEventListener('orientationchange', handleOrientationChange);
      }
    };
  }, []);

  return state;
}

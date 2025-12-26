import { useState, useEffect } from 'react';

export interface BatteryState {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

export function useBattery() {
  const [state, setState] = useState<BatteryState>({
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 1,
  });

  useEffect(() => {
    let battery: any;

    const handleChange = () => {
      setState({
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
        level: battery.level,
      });
    };

    (navigator as any).getBattery?.().then((b: any) => {
      battery = b;
      handleChange();
      b.addEventListener('levelchange', handleChange);
      b.addEventListener('chargingchange', handleChange);
      b.addEventListener('chargingtimechange', handleChange);
      b.addEventListener('dischargingtimechange', handleChange);
    });

    return () => {
      if (battery) {
        battery.removeEventListener('levelchange', handleChange);
        battery.removeEventListener('chargingchange', handleChange);
        battery.removeEventListener('chargingtimechange', handleChange);
        battery.removeEventListener('dischargingtimechange', handleChange);
      }
    };
  }, []);

  return state;
}

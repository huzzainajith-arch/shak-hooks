import { signal, Injector, inject, DestroyRef } from '@angular/core';

export interface BatteryState {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

export function useBattery(injector?: Injector) {
  const charging = signal(false);
  const chargingTime = signal(0);
  const dischargingTime = signal(0);
  const level = signal(1);
  
  const destroyRef = injector ? injector.get(DestroyRef) : inject(DestroyRef);

  let battery: any;

  const handleChange = () => {
    charging.set(battery.charging);
    chargingTime.set(battery.chargingTime);
    dischargingTime.set(battery.dischargingTime);
    level.set(battery.level);
  };

  (navigator as any).getBattery?.().then((b: any) => {
    battery = b;
    handleChange();
    b.addEventListener('levelchange', handleChange);
    b.addEventListener('chargingchange', handleChange);
    b.addEventListener('chargingtimechange', handleChange);
    b.addEventListener('dischargingtimechange', handleChange);
  });

  destroyRef.onDestroy(() => {
    if (battery) {
      battery.removeEventListener('levelchange', handleChange);
      battery.removeEventListener('chargingchange', handleChange);
      battery.removeEventListener('chargingtimechange', handleChange);
      battery.removeEventListener('dischargingtimechange', handleChange);
    }
  });

  return { charging, chargingTime, dischargingTime, level };
}

import { ref, onMounted, onUnmounted } from 'vue';

export interface BatteryState {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

export function useBattery() {
  const charging = ref(false);
  const chargingTime = ref(0);
  const dischargingTime = ref(0);
  const level = ref(1);

  let battery: any;

  const handleChange = () => {
    charging.value = battery.charging;
    chargingTime.value = battery.chargingTime;
    dischargingTime.value = battery.dischargingTime;
    level.value = battery.level;
  };

  onMounted(() => {
    (navigator as any).getBattery?.().then((b: any) => {
      battery = b;
      handleChange();
      b.addEventListener('levelchange', handleChange);
      b.addEventListener('chargingchange', handleChange);
      b.addEventListener('chargingtimechange', handleChange);
      b.addEventListener('dischargingtimechange', handleChange);
    });
  });

  onUnmounted(() => {
    if (battery) {
      battery.removeEventListener('levelchange', handleChange);
      battery.removeEventListener('chargingchange', handleChange);
      battery.removeEventListener('chargingtimechange', handleChange);
      battery.removeEventListener('dischargingtimechange', handleChange);
    }
  });

  return { charging, chargingTime, dischargingTime, level };
}

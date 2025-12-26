import { ref, onMounted, onUnmounted } from 'vue';

export function useGeolocation(options?: PositionOptions) {
  const loading = ref(true);
  const accuracy = ref<number | null>(null);
  const altitude = ref<number | null>(null);
  const altitudeAccuracy = ref<number | null>(null);
  const heading = ref<number | null>(null);
  const latitude = ref<number | null>(null);
  const longitude = ref<number | null>(null);
  const speed = ref<number | null>(null);
  const timestamp = ref<number | null>(null);
  const error = ref<GeolocationPositionError | null>(null);

  let watchId: number;

  const onEvent = ({ coords, timestamp: ts }: GeolocationPosition) => {
    loading.value = false;
    timestamp.value = ts;
    latitude.value = coords.latitude;
    longitude.value = coords.longitude;
    altitude.value = coords.altitude;
    accuracy.value = coords.accuracy;
    altitudeAccuracy.value = coords.altitudeAccuracy;
    heading.value = coords.heading;
    speed.value = coords.speed;
    error.value = null;
  };

  const onError = (err: GeolocationPositionError) => {
    loading.value = false;
    error.value = err;
  };

  onMounted(() => {
    navigator.geolocation.getCurrentPosition(onEvent, onError, options);
    watchId = navigator.geolocation.watchPosition(onEvent, onError, options);
  });

  onUnmounted(() => {
    navigator.geolocation.clearWatch(watchId);
  });

  return {
    loading,
    accuracy,
    altitude,
    altitudeAccuracy,
    heading,
    latitude,
    longitude,
    speed,
    timestamp,
    error,
  };
}

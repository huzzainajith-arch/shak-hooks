import { signal, Injector, inject, DestroyRef } from '@angular/core';

export function useGeolocation(options?: PositionOptions, injector?: Injector) {
  const loading = signal(true);
  const accuracy = signal<number | null>(null);
  const altitude = signal<number | null>(null);
  const altitudeAccuracy = signal<number | null>(null);
  const heading = signal<number | null>(null);
  const latitude = signal<number | null>(null);
  const longitude = signal<number | null>(null);
  const speed = signal<number | null>(null);
  const timestamp = signal<number | null>(null);
  const error = signal<GeolocationPositionError | null>(null);
  
  const destroyRef = injector ? injector.get(DestroyRef) : inject(DestroyRef);

  let watchId: number;

  const onEvent = ({ coords, timestamp: ts }: GeolocationPosition) => {
    loading.set(false);
    timestamp.set(ts);
    latitude.set(coords.latitude);
    longitude.set(coords.longitude);
    altitude.set(coords.altitude);
    accuracy.set(coords.accuracy);
    altitudeAccuracy.set(coords.altitudeAccuracy);
    heading.set(coords.heading);
    speed.set(coords.speed);
    error.set(null);
  };

  const onError = (err: GeolocationPositionError) => {
    loading.set(false);
    error.set(err);
  };

  navigator.geolocation.getCurrentPosition(onEvent, onError, options);
  watchId = navigator.geolocation.watchPosition(onEvent, onError, options);

  destroyRef.onDestroy(() => {
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

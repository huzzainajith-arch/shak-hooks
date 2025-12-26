import { useState, useEffect } from 'react';

export function useGeolocation(options?: PositionOptions) {
  const [state, setState] = useState<{
    loading: boolean;
    accuracy: number | null;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    latitude: number | null;
    longitude: number | null;
    speed: number | null;
    timestamp: number | null;
    error: GeolocationPositionError | null;
  }>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });

  useEffect(() => {
    const onEvent = ({ coords, timestamp }: GeolocationPosition) => {
      setState({
        loading: false,
        timestamp,
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude,
        accuracy: coords.accuracy,
        altitudeAccuracy: coords.altitudeAccuracy,
        heading: coords.heading,
        speed: coords.speed,
        error: null,
      });
    };

    const onError = (error: GeolocationPositionError) => {
      setState((s) => ({ ...s, loading: false, error }));
    };

    navigator.geolocation.getCurrentPosition(onEvent, onError, options);
    const watchId = navigator.geolocation.watchPosition(onEvent, onError, options);

    return () => navigator.geolocation.clearWatch(watchId);
  }, [options]);

  return state;
}

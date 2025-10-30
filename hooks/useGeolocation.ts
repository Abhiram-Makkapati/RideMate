import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setLocation(position.coords);
      setLoading(false);
    };

    const handleError = (error: GeolocationPositionError) => {
      setError(`Error getting location: ${error.message}`);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { location, error, loading };
};

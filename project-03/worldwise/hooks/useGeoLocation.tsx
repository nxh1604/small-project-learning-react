import { useState } from "react";

export function useGeolocation(defaultValue = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation) return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}

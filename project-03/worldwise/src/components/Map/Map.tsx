import { useState, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useCitiesContext } from "../../../contexts/CitiesContext";

import styles from "./Map.module.css";
import Button from "../Button/Button";
import { useGeolocation } from "../../../hooks/useGeoLocation";
import { useUrlLocation } from "../../../hooks/useUrlLocation";

const Map = (): JSX.Element => {
  const [mapPosition, setMapPosition] = useState<number[]>([17, 108]);
  const { isLoading: loadingGeoLocationg, position: geoLocation, getPosition } = useGeolocation();
  const [lat, lng] = useUrlLocation();
  const navigateToUserLocation = useCallback(useNavigate(), []);
  const { cities } = useCitiesContext();

  const conditionUseLocate = geoLocation
    ? geoLocation.lat === mapPosition[0] && geoLocation.lng === mapPosition[1]
      ? false
      : true
    : true;

  useEffect(() => {
    if (geoLocation) {
      setMapPosition([geoLocation.lat, geoLocation.lng]);
      navigateToUserLocation(`form?lat=${geoLocation.lat}&lng=${geoLocation.lng}`);
    }
  }, [geoLocation, navigateToUserLocation]);

  useEffect(() => {
    if (lng && lat) setMapPosition([Number(lat), Number(lng)]);
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      {conditionUseLocate && (
        <Button
          type='position'
          onClick={() => {
            getPosition();
          }}>
          {loadingGeoLocationg ? "loading..." : "use your location"}
        </Button>
      )}
      <MapContainer
        center={[mapPosition[0], mapPosition[1]]}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {cities?.map((city) => {
          return (
            <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
              <Popup>
                <img
                  src={`https://flagsapi.com/${city.emoji}/shiny/64.png`}
                  alt='country flag'
                  width={`40px`}
                />
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeMapPosition mapPosition={mapPosition} usingUserLocation={conditionUseLocate} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

const ChangeMapPosition = ({ usingUserLocation, mapPosition }) => {
  const map = useMap();
  if (!usingUserLocation) {
    map.flyTo(mapPosition, 10);
  } else {
    map.setView(mapPosition);
  }
  return null;
};

const DetectClick = () => {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
};

export default Map;

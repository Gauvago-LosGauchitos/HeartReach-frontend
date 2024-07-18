import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export const LocationMarker = ({ setLocation }) => {
  const [position, setPosition] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [positionLoaded, setPositionLoaded] = useState(false);

  useEffect(() => {
    // Obtener la posicion del usuario
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setUserPosition([latitude, longitude]);
      setPositionLoaded(true);
    }, (err) => {
      console.error("Error getting user position:", err);
      setPositionLoaded(true);
    });
  }, []);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation(e.latlng);
    }
  });


  return position === null ? null : (
    <Marker position={position} icon={new L.Icon.Default()}>
    </Marker>
  );

  
};

export const LocationPicker = ({ setLocation }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [positionLoaded, setPositionLoaded] = useState(false);

  useEffect(() => {
    // Obtener la posicion del usuario
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setUserPosition([latitude, longitude]);
      setPositionLoaded(true);
    }, (err) => {
      console.error("Error getting user position:", err);
      setPositionLoaded(true);
    });
  }, []);

  if (!positionLoaded) {
    return <div>Cargando la ubicación del usuario...</div>;
}

  const mapCenter = userPosition ? userPosition : [40.416775, -3.70379];
  const zoomLevel = userPosition ? 10 : 6;

  return (
    <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height: "500px", width: "100%" } }>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {userPosition && (
                <>
                    <Marker position={userPosition}>
                        <Popup>Tu ubicación actual</Popup>
                    </Marker>
                </>
            )}
      <LocationMarker setLocation={setLocation} />
    </MapContainer>
  );
};


import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export const LocationMarker = ({ setLocation }) => {
  const [position, setPosition] = useState(null);

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
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '25vh', width: '25vw' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker setLocation={setLocation} />
    </MapContainer>
  );
};


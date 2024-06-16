import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix the default icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export const MapComponent = () => {
    const [userPosition, setUserPosition] = useState(null);
    const [positionLoaded, setPositionLoaded] = useState(false);
    const [volunteerLocations, setVolunteerLocations] = useState([]);

    useEffect(() => {
        // Get user's current position
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            setUserPosition([latitude, longitude]);
            setPositionLoaded(true);
        }, (err) => {
            console.error("Error getting user position:", err);
            setPositionLoaded(true); // Set position loaded even on error to avoid repeated attempts
        });
    }, []);

    useEffect(() => {
        // Simulate volunteer locations (replace with actual data when available)
        const simulatedVolunteers = [
            { id: 1, position: [51.505, -0.09], title: "Voluntariado 1" },
            { id: 2, position: [51.51, -0.1], title: "Voluntariado 2" },
            { id: 3, position: [51.515, -0.11], title: "Voluntariado 3" },
        ];

        setVolunteerLocations(simulatedVolunteers);
    }, []);

    if (!positionLoaded) {
        return <div>Cargando la ubicación del usuario...</div>;
    }

    // Center map on user's position if available, otherwise default to Madrid, Spain
    const mapCenter = userPosition ? userPosition : [40.416775, -3.70379];
    const zoomLevel = userPosition ? 10 : 6;

    return (
        <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {userPosition && (
                <>
                    <Marker position={userPosition}>
                        <Popup>Tu ubicación actual</Popup>
                    </Marker>
                    <Circle center={userPosition} radius={10000} fillColor="#ff7800" fillOpacity={0.2} stroke={false} />
                </>
            )}

            {volunteerLocations.map(volunteer => (
                <Marker key={volunteer.id} position={volunteer.position}>
                    <Popup>{volunteer.title}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};


import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import haversine from 'haversine-distance';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export const MapComponent = ({ volunteers }) => {
    const [userPosition, setUserPosition] = useState(null);
    const [positionLoaded, setPositionLoaded] = useState(false);
    const [nearbyVolunteers, setNearbyVolunteers] = useState([]);

    useEffect(() => {
        // Obtener la posición del usuario
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            setUserPosition([latitude, longitude]);
            setPositionLoaded(true);
        }, (err) => {
            console.error("Error getting user position:", err);
            setPositionLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (userPosition) {
            console.log('User position:', userPosition);
            const filteredVolunteers = volunteers.filter(volunteer => {
                console.log('Volunteer position:', volunteer.location);
                const distance = haversine(
                    { lat: userPosition[0], lng: userPosition[1] },
                    { lat: volunteer.location.lat, lng: volunteer.location.lng }
                );
                console.log('Distance:', distance);
                return distance <= 10000; // 10 km
            });
            console.log('Filtered Volunteers:', filteredVolunteers);
            setNearbyVolunteers(filteredVolunteers);
        }
    }, [userPosition, volunteers]);

    if (!positionLoaded) {
        return <div>Cargando la ubicación del usuario...</div>;
    }

    // Centra el mapa en la ubicación del usuario
    const mapCenter = userPosition ? userPosition : [40.416775, -3.70379];
    const zoomLevel = userPosition ? 10 : 6;

    return (
        <MapContainer center={mapCenter} zoom={zoomLevel} scrollWheelZoom={false} style={{ height: "500px", width: "100%" }}>
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

            {nearbyVolunteers.map(volunteer => (
                <Marker key={volunteer.id} position={[volunteer.location.lat, volunteer.location.lng]}>
                    <Popup>{volunteer.title}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

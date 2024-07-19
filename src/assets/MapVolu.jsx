import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { useVolunteer } from '../shared/hooks/useVolunteer';
import { useParams,  } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export const MapVolu = () => {
    const [userPosition, setUserPosition] = useState(null);
    const [positionLoaded, setPositionLoaded] = useState(false);
    const [volunteerLocations, setVolunteerLocations] = useState([]);
    const { selectedVolu, getVolunteer } = useVolunteer();
    const { id } = useParams();

    

    useEffect(() => {
        const fetchData = async () => {
            await getVolunteer(id);
            setPositionLoaded(true);
        };
        fetchData();
    }, []);

    if (!positionLoaded) {
        return <div>Cargando la ubicación del usuario...</div>;
    }

    // Centra el mapa en la ubucacion del usuario
    const mapCenter = selectedVolu.volunteer.location ? selectedVolu.volunteer.location : [];
    const zoomLevel =  90 ;

    return (
        <MapContainer center={mapCenter} zoom={zoomLevel} scrollWheelZoom={false} style={{ height: "500px", width: "100%" } }>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {selectedVolu.volunteer.location && (
                <>
                    <Marker position={selectedVolu.volunteer.location}>
                        <Popup>Tu ubicación actual</Popup>
                    </Marker>
                    <Circle center={selectedVolu.volunteer.location} radius={1000} fillColor="#ff7800" fillOpacity={0.2} stroke={false} />
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


// src/hooks/useSoli.jsx

import { useState, useEffect } from "react";
import { getPendingOrgs, confirmOrganization, rejectOrganization } from "../../services/api.js";

export const useSoli = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSolicitudes = async () => {
        setLoading(true);
        try {
            const response = await getPendingOrgs();
            setSolicitudes(response); // Asegúrate de que `response` sea un array de solicitudes
        } catch (err) {
            console.error("Error al obtener las solicitudes:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const aceptarSolicitud = async (name) => {
        setLoading(true);
        try {
            const response = await confirmOrganization({ name });
            fetchSolicitudes(); // Refresh the list after accepting
            return response;
        } catch (err) {
            console.error("Error al aceptar la solicitud:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const denegarSolicitud = async (name) => {
        setLoading(true);
        try {
            const response = await rejectOrganization({ name });
            fetchSolicitudes(); // Refresh the list after rejecting
            return response;
        } catch (err) {
            console.error("Error al denegar la solicitud:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSolicitudes();
    }, []);

    return {
        solicitudes,
        loading,
        error,
        aceptarSolicitud,
        denegarSolicitud
    };
};

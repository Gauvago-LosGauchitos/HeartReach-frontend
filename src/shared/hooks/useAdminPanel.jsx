import { useState, useEffect } from "react";
import { getUsers, getAdmins, getAdminAssociations } from "../../services/api.js"; // Asegúrate de que estas funciones estén en api.js

export const useAdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [adminAssociations, setAdminAssociations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usersResp, adminsResp, adminAssociationsResp] = await Promise.all([
                getUsers(),
                getAdmins(),
                getAdminAssociations()
            ]);
            setUsers(usersResp);
            setAdmins(adminsResp);
            setAdminAssociations(adminAssociationsResp);
        } catch (err) {
            console.error("Error al obtener los datos:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        users,
        admins,
        adminAssociations,
        loading,
        error
    };
};

import React, { useEffect, useState } from 'react';
import { getUser } from '../../services/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';
import { Footer } from '../Footer/Footer.jsx'
import './UserProfile.css'; // Importamos el archivo CSS

export const UserProfile = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const response = await getUser();
                if (response.error) {
                    toast.error(
                        response?.err?.data?.message ||
                        response?.err?.response?.data?.message ||
                        response?.err?.message ||
                        'Error al obtener el usuario'
                    );
                } else {
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                toast.error('Error al obtener el usuario');
            }
            setIsLoading(false);
        };

        fetchUser();
    }, []);

    return (


        <div>
            <NavBar />
            <div className="user-profile-container">
            {isLoading ? (
                <p>Cargando usuario...</p>
            ) : (
                <div className="user-profile-card">
                    <div className="user-profile-details">
                        <div className="profile-circle"></div>
                        <div className="user-profile-image">
                            {user.imageProfile && (
                                <img src={user.imageProfile} alt="Imagen de Perfil" />
                            )}
                        </div>
                        <h2>{user.name} {user.surname}</h2>
                        <p><strong>correo electrónico:</strong> {user.email}</p>
                        <p><strong>número de teléfono:</strong> {user.phone}</p>
                        <p><strong>DPI:</strong> {user.dpi}</p>
                        <p><strong>Username:</strong> {user.username}</p>
                        <div className="assigned-volunteer">
                            <p><strong>HABILIDADES:</strong></p>
                            <p>{user.habilities}</p>
                        </div>
                    </div>
                </div>
            )}

            </div>


            
            <Footer />
        </div>

    );
};


import React, { useEffect, useState } from 'react';
import { getUser } from '../../services/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';
import { Footer } from '../Footer/Footer.jsx';
import './UserEditProfile.css'; // Importamos el archivo CSS

export const UserEditProfile = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const toggleEdit = () => {
        setIsEditable(!isEditable);
    };

    return (
        <body className='bodyU'>
            <div>
                <NavBar />
                <div className="user-profile-container">
                    {isLoading ? (
                        <p>Cargando usuario...</p>
                    ) : (
                        <div className="user-profile-card2">
                            <div className="user-profile-details2">
                                <div className="profile-circle2"></div>
                                <div className="user-profile-image2">
                                    {user.imageProfile && (
                                        <img src={user.imageProfile} alt="Imagen de Perfil2" />
                                    )}
                                </div>
                                <div className='user-profile-data2'>
                                    <div className='data-volunteer2'>
                                        <h2>{user.name} {user.surname}</h2>
                                        <p>
                                            <label>Correo electrónico:</label>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                value={user.email || ''} 
                                                onChange={handleChange} 
                                                disabled={!isEditable}
                                            />
                                        </p>
                                        <p>
                                            <label>Número de teléfono:</label>
                                            <input 
                                                type="text" 
                                                name="phone" 
                                                value={user.phone || ''} 
                                                onChange={handleChange} 
                                                disabled={!isEditable}
                                            />
                                        </p>
                                        <p>
                                            <label>DPI:</label>
                                            <input 
                                                type="text" 
                                                name="dpi" 
                                                value={user.dpi || ''} 
                                                onChange={handleChange} 
                                                disabled={!isEditable}
                                            />
                                        </p>
                                        <p>
                                            <label>Username:</label>
                                            <input 
                                                type="text" 
                                                name="username" 
                                                value={user.username || ''} 
                                                onChange={handleChange} 
                                                disabled={!isEditable}
                                            />
                                        </p>
                                    </div>

                                    <div className="assigned-volunteer2">
                                        <p><strong>HABILIDADES:</strong></p>
                                        <textarea
                                            name="habilities"
                                            value={user.habilities || ''}
                                            onChange={handleChange}
                                            disabled={!isEditable}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="edit-button-container2">
                                <button onClick={toggleEdit}>
                                    {isEditable ? 'Guardar' : 'Editar'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </body>
    );
};

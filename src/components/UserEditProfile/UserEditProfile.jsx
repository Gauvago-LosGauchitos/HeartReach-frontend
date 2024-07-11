import React, { useEffect, useState } from 'react';
import { getUser, updateUser } from '../../services/api';
import toast from 'react-hot-toast';
import { NavBar } from '../NavBar/NavBar';
import { Footer } from '../Footer/Footer.jsx';
import './UserEditProfile.css';

export const UserEditProfile = () => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        dpi: '',
        username: '',
        habilities: '',
        imageProfile: '', // Agregar el campo para la imagen de perfil
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [fileInputVisible, setFileInputVisible] = useState(false); // Estado para mostrar/ocultar el input de archivo

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
        if (!isEditable) {
            setFileInputVisible(true); // Mostrar el input de archivo al activar la edición
        } else {
            setFileInputVisible(false); // Ocultar el input de archivo al desactivar la edición
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setUser((prevUser) => ({
                    ...prevUser,
                    imageProfile: reader.result,
                }));
            };
        }
    };

    const handleSave = async () => {
        try {
            const response = await updateUser(user);
            if (response.error) {
                toast.error(
                    response?.err?.data?.message ||
                    response?.err?.response?.data?.message ||
                    response?.err?.message ||
                    'Error al actualizar el perfil'
                );
            } else {
                toast.success('Perfil actualizado exitosamente');
                setIsEditable(false);
                setFileInputVisible(false); // Ocultar el input de archivo después de guardar
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Error al actualizar el perfil');
        }
    };

    return (
        <div className='bodyU'>
            <NavBar />
            <div className="user-profile-container">
                {isLoading ? (
                    <p>Cargando usuario...</p>
                ) : (
                    <div className="user-profile-card">
                        <div className="user-profile-details">
                            <div className="profile-circle"></div>
                            <div className='user-profile-data'>
                                <div className="user-profile-image">
                                    {user.imageProfile && (
                                        <img src={user.imageProfile} alt="Imagen de Perfil" />
                                    )}
                                </div>
                                {isEditable && fileInputVisible && (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                )}
                                <div className='data-volunteer'>
                                <p>
                                        <label>Nombre:</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            value={user.name || ''} 
                                            onChange={handleChange} 
                                            disabled={!isEditable}
                                        />
                                    </p>
                                    <p>
                                        <label>Apellido:</label>
                                        <input 
                                            type="text" 
                                            name="surname" 
                                            value={user.surname || ''} 
                                            onChange={handleChange} 
                                            disabled={!isEditable}
                                        />
                                    </p>
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
                                    {/* Nuevos campos para name y surname */}
                                    {isEditable && (
                                        <>
                                            <p>
                                                <label>Nombre:</label>
                                                <input 
                                                    type="text" 
                                                    name="name" 
                                                    value={user.name || ''} 
                                                    onChange={handleChange} 
                                                />
                                            </p>
                                            <p>
                                                <label>Apellido:</label>
                                                <input 
                                                    type="text" 
                                                    name="surname" 
                                                    value={user.surname || ''} 
                                                    onChange={handleChange} 
                                                />
                                            </p>
                                        </>
                                    )}
                                </div>

                                <div className="assigned-volunteer">
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
                        <div className="edit-button-container">
                            {isEditable ? (
                                <button onClick={handleSave}>
                                    Guardar
                                </button>
                            ) : (
                                <button onClick={toggleEdit}>
                                    Editar
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};
import React from 'react';
import { useAdminPanel } from '../../shared/hooks/useAdminPanel'; // Asegúrate de que este hook esté creado y exportado desde el archivo correcto
import './AdminPanel.css'; // Importa el archivo CSS
import { Spinner } from '../../assets/spinner/spinner';
import { NavBar } from '../NavBar/NavBar';
import { Footer } from '../Footer/Footer';
import defaultImage from '../../assets/img/default.png'; // Imagen por defecto

export const AdminPanel = () => {
    const { users = [], admins = [], adminAssociations = [], loading, error } = useAdminPanel();

    if (loading) return <Spinner />;

    const renderUserList = (userList) => (
        <ul>
            {userList.length === 0 ? (
                <li>No users found.</li>
            ) : (
                userList.map(user => (
                    <li key={user._id} className="user-card">
                        <div className="user-image">
                            <img
                                src={user.imageProfile && user.imageProfile.length > 0 ? user.imageProfile[0] : defaultImage}
                                alt={user.name}
                                className="user-image"
                            />
                        </div>
                        <div className="user-details">
                            <p><strong>Name:</strong> {user.name} {user.surname}</p>
                            <p><strong>DPI:</strong> {user.dpi}</p>
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                            <p><strong>Habilities:</strong> {user.habilities || 'N/A'}</p>
                        </div>
                    </li>
                ))
            )}
        </ul>
    );

    return (
        <div>
            <NavBar />
            <div className="admin-panel">
                <h1>Admin Panel</h1>
                
                <h2>Users</h2>
                {renderUserList(users)}

                <h2>Admins</h2>
                {renderUserList(admins)}

                <h2>Admin Associations</h2>
                {renderUserList(adminAssociations)}
            </div>
            <Footer />
        </div>
    );
};

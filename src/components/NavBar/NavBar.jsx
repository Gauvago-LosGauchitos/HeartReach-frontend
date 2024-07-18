import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import toast from 'react-hot-toast';
import userDefault from '../../assets/img/userDefault.png';
import profileIcon from '../../assets/img/profileIcon.png'; 
import logoutIcon from '../../assets/img/logOutIcon.png'; 
import { getUser, updateUser } from '../../services/api';
import './NavBar.css';

export const NavBar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
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


    const handleHome = () =>{
        navigate('/home')
    }

    const logOut = () =>{
        localStorage.removeItem('authToken');
        navigate('/login')
    }

    const handleAbout = () =>{
        navigate('/AboutUs')
    }

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleProfileClick = () => {
        navigate('/userEditProfile');
    };

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
        <div className="widget-container">
            <div className="left-section">
                <img src={logo} alt="logo" className="logo-image" />
                <div className="searchBox">
                    <input className="searchInput" type="text" name="" placeholder="Search" />
                    <button className="searchButton" href="#">
                    </button>   
                </div>
            </div>
            <div className="right-section">
                <a onClick={handleHome} href="#" className="nav-link">Inicio</a>
                <a onClick={handleAbout} href='#' className="nav-link">¿Quiénes somos?</a>
                <div className="user-menu" onClick={toggleDropdown}>
                    <img src={user.imageProfile || userDefault} alt="user icon" className="user-image" />
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <div className="dropdown-header">
                                <img src={user.imageProfile || userDefault} alt="user icon" className="user-dropdown-image" />
                                
                                <div className="user-name">{user.name || ''}</div>
                            </div>
                            <div className="dropdown-links">
                                <a href="#" className="dropdown-link" onClick={handleProfileClick}>
                                    <img src={profileIcon} alt="Profile Icon" className="dropdown-icon" /> Profile
                                </a>
                                <a href="#" className="dropdown-link" onClick={logOut}>
                                    <img src={logoutIcon}  alt="Logout Icon" className="dropdown-icon" /> Logout
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

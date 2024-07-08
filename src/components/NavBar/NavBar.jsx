import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';
import search from '../../assets/img/search.png';
import profileIcon from '../../assets/img/profileIcon.png'; 
import logoutIcon from '../../assets/img/logOutIcon.png'; 
import './NavBar.css';

export const NavBar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const navigate = useNavigate()

    const handleHome = () =>{
        navigate('/home')
    }

    const handleAbout = () =>{
        navigate('/AboutUs')
    }

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleProfileClick = () => {
        navigate('/userProfile');
    };

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
                    <img src="https://placehold.co/30x30" alt="user icon" className="user-image" />
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <div className="dropdown-header">
                                <img src="https://placehold.co/50x50" alt="user icon" className="user-dropdown-image" />
                                <div className="user-name">John Doe</div>
                            </div>
                            <div className="dropdown-links">
                                <a href="#" className="dropdown-link" onClick={handleProfileClick}>
                                    <img src={profileIcon} alt="Profile Icon" className="dropdown-icon" /> Profile
                                </a>
                                <a href="#" className="dropdown-link">
                                    <img src={logoutIcon} alt="Logout Icon" className="dropdown-icon" /> Logout
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

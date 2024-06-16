import React, { useState } from 'react';
import logo from '../../assets/img/logo.png';
import search from '../../assets/img/search.png';
import profileIcon from '../../assets/img/profileIcon.png'; 
import logoutIcon from '../../assets/img/logOutIcon.png'; 
import './NavBar.css';

export const NavBar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
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
                <a href="#" className="nav-link">Inicio</a>
                <a href="#" className="nav-link">¿Quiénes somos?</a>
                <div className="user-menu" onClick={toggleDropdown}>
                    <img src="https://placehold.co/30x30" alt="user icon" className="user-image" />
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <div className="dropdown-header">
                                <img src="https://placehold.co/50x50" alt="user icon" className="user-dropdown-image" />
                                <div className="user-name">John Doe</div>
                            </div>
                            <div className="dropdown-links">
                                <a href="#" className="dropdown-link">
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

import React, { useEffect } from 'react';
import './HomePage.css';
import personaTexto from '../../assets/img/personaTexto.png';
import logo from '../../assets/img/logo.png';
import ScrollReveal from 'scrollreveal';

export const HomePage = () => {

    useEffect(() => {
        const scrollRevealOption = {
            distance: "50px",
            origin: "bottom",
            duration: 1000,
        };

        // header container
        ScrollReveal().reveal(".header__container img", {
            duration: 1000,
        });

        ScrollReveal().reveal(".header__content", {
            ...scrollRevealOption,
            origin: "right",
            delay: 500,
        });

        ScrollReveal().reveal(".header__tag", {
            ...scrollRevealOption,
            origin: "left",
            delay: 1000,
        });
    }, []); // Empty dependency array ensures this runs once after initial render

    return (
        <div className='bodyHomePage'>
            <header className="header">
                <nav>
                    <div className="nav__logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="nav__text">
                        <h4>Heart Reach</h4>
                    </div>
                    <div className="nav__actions">
                        <a href="#"><i className="ri-user-3-line"></i></a>
                        <a href="#"><i className="ri-gift-line"></i></a>
                        <a href="#"><i className="ri-map-pin-2-line"></i></a>
                    </div>
                </nav>
                <div className="section__container header__container">
                    <img src={personaTexto} alt="header" />
                    <div className="header__content">
                        <h4>HeartReach</h4>
                        <p>
                            Buscamos que las personas interesadas en contribuir con causas sociales, como por ejemplo recoger
                            basura en las playas, adopción de animales, etc., puedan tener un acceso más rápido y fácil a estos
                            voluntariados, así como ayudar a las organizaciones que promueven estos mismos voluntariados a darse
                            a conocer y conseguir la ayuda necesaria.
                        </p>
                    </div>
                    <div className="header__tag">
                        Encuentra tu voluntariado <span><i className="ri-shopping-basket-line"></i></span>
                    </div>
                </div>
            </header>

            <section className="volunteers">
                <h2>Volunteers</h2>
                <div className="volunteer-options">
                    <div className="option">
                        <img src="https://via.placeholder.com/150" alt="Recolección de Basura en Playa"/>
                        <p>Recolección de Basura en Playa</p>
                    </div>
                    <div className="option">
                        <img src="https://via.placeholder.com/150" alt="Adopción de animales"/>
                        <p>Adopción de animales</p>
                    </div>
                    <div className="option">
                        <img src="https://via.placeholder.com/150" alt="Entrega de víveres"/>
                        <p>Entrega de víveres</p>
                    </div>
                    <div className="option">
                        <img src="https://via.placeholder.com/150" alt="Visita a adultos mayores"/>
                        <p>Visita a adultos mayores</p>
                    </div>
                </div>
            </section>

            <div className="footer__bar">
                Copyright © 2023 Web Design Mastery. All rights reserved.
            </div>
        </div>
    );
};

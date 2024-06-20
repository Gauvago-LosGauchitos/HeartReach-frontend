import React, { useEffect } from 'react';
import './HomePage.css';
import personaTexto from '../../assets/img/personaTexto.png';
import ScrollReveal from 'scrollreveal';
import { NavBar } from '../NavBar/NavBar';
import { Footer } from '../Footer/Footer';
import { MapComponent } from '../../assets/mapContent';

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
            origin: "left",
            delay: 500,
        });

        ScrollReveal().reveal(".header__tag", {
            ...scrollRevealOption,
            origin: "right",
            delay: 1000,
        });
    }, []);

    return (
        <div className='bodyHomePage'>
            <NavBar/>
            <header className="header__container">
                <div className="header__image">
                    <img src={personaTexto} alt="header" />
                </div>
                <div className="header__content">
                    <h2>EMPIEZA TU AVENTURA</h2>
                    <h1>
                        HeartReach<br /><span className="h1__span-1">Voluntariado</span>
                        <span className="h1__span-2">para todos</span>
                    </h1>
                    <p>
                        Buscamos que las personas interesadas en contribuir con causas sociales puedan tener un acceso 
                        más rápido y eficaz a estos voluntariados; así como ayudar a las organizaciones que promueven 
                        estos mismos a darse conocer y conseguir la ayuda necesaria.
                    </p>
                    <div className="header__btn">
                        <button className="btn">Learn More</button>
                    </div>
                    
                </div>
            </header>
            

            <section className="volunteers">
                <h2>Voluntariados</h2>
                <div className="volunteer-options">
                    <div className="option">
                        <img src="https://via.placeholder.com/150" alt="Recolección de Basura en Playa" />
                        <p>Recolección de Basura en Playa</p>
                    </div>
                    <div className="option">
                        <img src="https://via.placeholder.com/150" alt="Adopción de animales" />
                        <p>Adopción de animales</p>
                    </div>
                    <div className="option">
                        <img src="https://via.placeholder.com/150" alt="Entrega de víveres" />
                        <p>Entrega de víveres</p>
                    </div>
                    <div className="option">
                        <img src="https://via.placeholder.com/150" alt="Visita a adultos mayores" />
                        <p>Visita a adultos mayores</p>
                    </div>
                </div>
            </section>  

            <section className="map-section">
                <h2>Encuentra Voluntariados Cerca de Ti</h2>
                <MapComponent />
            </section>

            <section className="testimonials">
                <h2>Testimonios</h2>
                <div className="testimonials-content">
                    <div className="testimonial">
                        <p>"Fue una experiencia increíble. Me encantó poder ayudar a la comunidad y conocer a nuevas personas."</p>
                        <h4>- Usuario 1</h4>
                    </div>
                    <div className="testimonial">
                        <p>"El voluntariado me permitió crecer como persona y entender mejor las necesidades de los demás."</p>
                        <h4>- Usuario 2</h4>
                    </div>
                    <div className="testimonial">
                        <p>"Recomiendo totalmente unirse a estas actividades. Es gratificante y muy enriquecedor."</p>
                        <h4>- Usuario 3</h4>
                    </div>
                </div>
            </section>

            <section className="impact-stats">
                
                <h2>Nuestro Impacto</h2>
                <div className="stats">
                    <div className="stat">
                        <h3>500+</h3>
                        <p>Voluntarios Activos</p>
                    </div>
                    <div className="stat">
                        <h3>1200+</h3>
                        <p>Proyectos Completados</p>
                    </div>
                    <div className="stat">
                        <h3>50+</h3>
                        <p>Organizaciones Asociadas</p>
                    </div>
                </div>
            </section>

            <section className="newsletter">
                <h2>Suscríbete a Nuestro Newsletter</h2>
                <form className="newsletter-form">
                    <input type="email" placeholder="Tu correo electrónico" />
                    <button type="submit" className="btn">Suscribirse</button>
                </form>
            </section>

            <section className="leave-testimonial">
                <h2>Deja tu Testimonio</h2>
                <form className="testimonial-form">
                    <textarea placeholder="Escribe tu testimonio aquí..." rows="5"></textarea>
                    <button type="submit" className="btn">Enviar</button>
                </form>
            </section>

            <Footer/>
        </div>
    );
};

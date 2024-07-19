import React, { useEffect, useState } from 'react';
import './HomePage.css';
import personaTexto from '../../assets/img/personaTexto.png';
import imgVoluDefault from '../../assets/img/imhHeroe.jpg';
import ScrollReveal from 'scrollreveal';
import Carrusel1 from '../../assets/img/carrusel1.jpg'
import Carrusel2 from '../../assets/img/carrusel2.jpg'
import Carrusel3 from '../../assets/img/carrusel3.jpg'
import Carrusel4 from '../../assets/img/carrusel4.jpg'
import Carrusel5 from '../../assets/img/carrusel5.jpg'
import Carrusel6 from '../../assets/img/carrusel6.jpg'
import Carrusel7 from '../../assets/img/carrusel7.jpg'
import { NavBar } from '../NavBar/NavBar';
import { Footer } from '../Footer/Footer';
import { MapComponent } from '../../assets/mapContent';
import { Spinner } from '../../assets/spinner/spinner';
import { useVolunteer } from '../../shared/hooks/useVolunteer.jsx';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { volunteers, isLoading } = useVolunteer();
    console.log('Voluntariados array:', volunteers);

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

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    const getUpcomingVolunteers = (volunteers) => {
        const sortedVolunteers = volunteers.sort((a, b) => new Date(a.date) - new Date(b.date));
        return sortedVolunteers.slice(0, 4);
    };

    const upcomingVolunteers = getUpcomingVolunteers(volunteers);

    const handleGoToVolunterings = () => {
        navigate('/VoluntersView')
    }

    const handleGoToOrganizatiosn = () =>{
        navigate('/organizations')
    }

    const handleSoliOrganization = () =>{
        navigate('/SoliOrganization')
    }

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div className='bodyHomePage'>
                    <NavBar />
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
                        <h2>Algunos Voluntariados Próximos!</h2>
                        <div className="volunteer-options">
                            {upcomingVolunteers.map((volunteer) => (
                                <div className="option" key={volunteer.id}>
                                    <img src={volunteer.imageVol || imgVoluDefault} alt={volunteer.title} />
                                    <p>{volunteer.title}</p>
                                </div>

                            ))}

                        </div>
                        <button onClick={handleGoToVolunterings} class="buttonVo"> Explora mas voluntariados
                        </button>
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

                    <div>

                        <section class="home">
                            <div class="description">
                                <h1 class="title">
                                    <span class="gradient-text">Conoce a las ORG</span> y descubre quien esta destras del voluntariado
                                </h1>
                                <p class="paragraph">
                                    Descubre las organizaciónes asociadas a nuestra página y descubre su increible historia.
                                </p>
                                <button onClick={handleGoToOrganizatiosn} class="buttonVo"> Explora las organizaciónes
                                </button>
                            </div>


                            <div class="users-color-container">
                                <span class="item" ></span>
                                <img
                                    class="item"
                                    src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/274f29ce-0d3f-4ac2-a2aa-f9b7bd188b2a"
                                    alt="" />
                                <span class="item" ></span>
                                <img
                                    class="item"
                                    src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/b8a14493-3d9f-4b9b-b93a-56d0bc7243e9"
                                    alt="" />

                                <img
                                    class="item"
                                    src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/03e51e1e-9750-45a5-b75e-a1e341d4562a"
                                    alt="" />
                                <span class="item" ></span>
                                <img class="item" src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/5eb50f89-3e5a-480e-860c-8d40d3ba9ffe" alt="" />
                                <span class="item" ></span>

                                <span class="item" ></span>
                                <img class="item" src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/86c71a79-2efe-4567-8665-b1e5a1fd9735" alt="" />
                                <span class="item" ></span>
                                <img class="item" src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/97ef9643-5202-41aa-80f0-ceeabccdd099" alt="" />
                            </div>
                        </section>

                    </div>
                    <br />

                    <section class="newsletter">
                        <h2>Quieres Registrar tu Organización</h2>
                        <form>
                            <button onClick={handleSoliOrganization}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg> Registra tu Organización
                                </span>
                            </button>
                        </form>

                    </section>

                    <div className="slider">
                        <div className="slide-track">
                            <div className="slide">
                                <img src={Carrusel1} alt="" />
                            </div>
                            <div className="slide">
                                <img src={Carrusel2} alt="" />
                            </div>
                            <div className="slide">
                                <img src={Carrusel3} alt="" />
                            </div>
                            <div className="slide">
                                <img src={Carrusel4} alt="" />
                            </div>
                            <div className="slide">
                                <img src={Carrusel5} alt="" />
                            </div>
                            <div className="slide">
                                <img src={Carrusel6} alt="" />
                            </div>
                            <div className="slide">
                                <img src={Carrusel7} alt="" />
                            </div>

                            <div className="slide">
                                <img src={Carrusel1} alt="" />
                            </div>
                            <div className="slide">
                                <img src={Carrusel2} alt="" />
                            </div>
                            <div className="slide">
                                <img src={Carrusel3} alt="" />
                            </div>
                            <div className="slide">
                                <img src={Carrusel4} alt="" />
                            </div>
                            <div className="slide">
                                <img src={Carrusel5} alt="" />
                            </div>
                            <div className="slide">
                                <img src={Carrusel6} alt="" />
                            </div>
                            <div className="slide">
                                <img src={Carrusel7} alt="" />
                            </div>
                        </div>
                    </div>

                    



                    <Footer />
                </div>
            )}
        </div>
    );
};

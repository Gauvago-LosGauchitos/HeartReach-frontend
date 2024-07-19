import React, { useEffect, useState } from 'react';
import './HomePage.css';
import personaTexto from '../../assets/img/personaTexto.png';
import imgVoluDefault from '../../assets/img/imhHeroe.jpg';
import ScrollReveal from 'scrollreveal';
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
                        <button onClick={handleGoToVolunterings} class="buttonVo">Explora más voluntariados</button>
                    </section>

                    <section className="map-section">
                        <h2>Encuentra Voluntariados Cerca de Ti</h2>
                        <MapComponent volunteers={volunteers} />
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
                                    <span class="gradient-text">Conoce a las ORG</span> y descubre quién está detrás del voluntariado
                                </h1>
                                <p class="paragraph">
                                    Descubre las organizaciones asociadas a nuestra plataforma, y aprende más sobre las causas que apoyan y cómo tú también puedes contribuir.
                                </p>
                                <button onClick={handleGoToOrganizatiosn} class="buttonVo">Ver Organizaciones</button>
                            </div>
                            <div class="image-container">
                                <img src="src/assets/img/heroImage.jpg" alt="Descripción de la imagen" class="home-image" />
                            </div>
                        </section>
                    </div>

                    <div>
                        <section class="home">
                            <div class="description">
                                <h1 class="title">
                                    <span class="gradient-text">Solicitar ser ORG</span> y publica tus voluntariados.
                                </h1>
                                <p class="paragraph">
                                    Tu organización también puede formar parte de nuestra plataforma, publica tus voluntariados y encuentra los colaboradores que necesitas.
                                </p>
                                <button onClick={handleSoliOrganization} class="buttonVo">Solicitar</button>
                            </div>
                            <div class="image-container">
                                <img src="src/assets/img/heroImage.jpg" alt="Descripción de la imagen" class="home-image" />
                            </div>
                        </section>
                    </div>

                    <Footer />
                </div>
            )}
        </div>
    );
};

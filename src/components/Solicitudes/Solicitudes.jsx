import React from 'react';
import './Solicitudes.css';
import { Spinner } from '../../assets/spinner/spinner';
import { NavBar } from '../NavBar/NavBar';
import { Footer } from '../Footer/Footer';
import { useSoli } from '../../shared/hooks/useSoli';
import defaultImage from '../../assets/img/default.png';

export const Solicitudes = () => {
    const { solicitudes, loading, error, aceptarSolicitud, denegarSolicitud } = useSoli();

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div className='body-soli'>
                    <NavBar />
                    <div className="solicitudes-container">
                        {solicitudes.length === 0 ? (
                            <div className="no-solicitudes">
                                <h2>No hay solicitudes pendientes</h2>
                                <p>¡Todo está al día! 😊</p>
                                <div className="no-solicitudes-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
                                        <path d="M20.285 6.293l-10.998 11-5.286-5.285-1.594 1.594 7.543 7.543 12.592-12.592z"></path>
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            solicitudes.map((solicitud) => {
                                // Verifica si la solicitud tiene imágenes y usa la primera si es así
                                const imageSrc = solicitud.images && solicitud.images.length > 0
                                    ? solicitud.images[0]
                                    : defaultImage;

                                return (
                                    <div className="card" key={solicitud.name}>
                                        <div className="image_container-soli">
                                            <img
                                                src={imageSrc}
                                                alt={solicitud.name}
                                                className="image-soli"
                                            />
                                        </div>
                                        <div className="title-Soli">
                                            <span>{solicitud.name}</span>
                                        </div>
                                        <div>
                                        <div className="size">
                                            <span>Owner: {solicitud.owner.name}</span>
                                        </div>
                                        <div className="size">
                                            <span>Description: {solicitud.description}</span>
                                        </div>
                                        <div className="size">
                                            <span>Phone: {solicitud.phone}</span>
                                        </div>
                                        <div className="size">
                                            <span>Address: {solicitud.address}</span>
                                        </div>
                                        </div>
                                        <div className="action">
                                            <button className="accept-button" onClick={() => {
                                                aceptarSolicitud(solicitud.name)
                                                    .then(response => {
                                                        if (response) {
                                                            console.log('Solicitud aceptada', response);
                                                        }
                                                    })
                                                    .catch(err => console.error('Error al aceptar la solicitud', err));
                                            }}>
                                                <span className="text-acept">Accept</span>
                                                <span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path d="M20.285 6.293l-10.998 11-5.286-5.285-1.594 1.594 7.543 7.543 12.592-12.592z"></path>
                                                    </svg>
                                                </span>
                                            </button>
                                            <button className="delete-button" onClick={() => denegarSolicitud(solicitud.name)}>
                                                <span className="text-denegar">Denegar</span>
                                                <span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    );
};
